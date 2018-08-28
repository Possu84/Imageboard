//////////DEPENDENCIES////////////

const express = require('express');

const app = express();

const database = require('./database');

const s3 = require('./s3.js');

const config = require('./config.json');

app.use(express.static('./public'));

app.use(
    require('body-parser').urlencoded({
        extended: false
    })
);

///////////IMAGE UPLOAD BOILERPLATE//////////

//////////NO TOUCHY//////////////////////////

var multer = require('multer'); // takes the actual file
var uidSafe = require('uid-safe'); //  gives the file unique name
var path = require('path'); //

////////DISCK STORAGE////////////////////////

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        // destination:defines what directory will the files go to

        callback(null, __dirname + '/uploads');
    },
    filename: function(req, file, callback) {
        // will give the file a unique name so we dont have files with same name which would give problems along the line
        uidSafe(24).then(function(uid) {
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

app.get('/user', (req, res) => {
    database.getImages().then(function(results) {
        res.json(results.rows);
    });

    console.log('inside user route');
});

//////////APP POST/////////////////

app.post('/upload', uploader.single('file'), s3.upload, function(req, res) {
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
