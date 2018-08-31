//////////DEPENDENCIES////////////

const express = require('express');

const app = express();

const database = require('./database');

const s3 = require('./s3.js');

const config = require('./config.json');

const bp = require("body-parser");

/////////////////////////////////////////


app.use(express.static('./public'));

app.use(
    require('body-parser').urlencoded({
        extended: false
    })
);

app.use(bp.json());

///////////IMAGE UPLOAD BOILERPLATE//////////

//////////NO TOUCHY//////////////////////////

var multer = require('multer'); // takes the actual file
var uidSafe = require('uid-safe'); //  gives the file unique name
var path = require('path'); //

////////DISCK STORAGE////////////////////////

var diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        // destination:defines what directory will the files go to

        callback(null, __dirname + '/uploads');
    },
    filename: (req, file, callback) => {
        // will give the file a unique name so we dont have files with same name which would give problems along the line
        uidSafe(24).then((uid) => {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

//////////MIDLEWARE////////////////

//////////GET´S///////////////////7

app.get('/user', (req, res) => {
    database.getImages().then(function(results) {
        res.json(results.rows);
    });


});

app.get('/pic/:id', (req, res) => {
    console.log('/pic/:id', 'in app get');
    Promise.all([
        database.modalPic(req.params.id),
        database.getComments(req.params.id)
    ]).then(function([result1, result2]) {   ////squre bracjkets pulls out artray of two "things"
        console.log(' in the result of modal pic and getCommetns', result1, result2);
        res.json({
            images: result1,
            comments: result2
        });
    });
});



//////////APP POST/////////////////


app.post('/newComment', (req, res) => {
    console.log("at post route",req.body);
    database.insertComments(req.body.username, req.body.comment, req.body.imageId);


});

app.post('/upload', uploader.single('file'), s3.upload, (req, res) => {
    console.log(__dirname, 'upload app.post ');
    // If nothing went wrong the file is already in the uploads directory
    if (req.file) {
        database
            .saveFile(
                config.s3Url + req.file.filename,
                req.body.title,
                req.body.description,
                req.body.username
            )
            .then(data => {
                console.log('here is res.json', data);
                res.json(data);
            })
            .catch(() => {
                res.status(500).json({
                    success: false
                });
            });
    }
});

// this.images.unshift(responce);
/////////8080 LISTENER///////////////

app.listen(8080, () => console.log('listening'));
