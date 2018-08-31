/////////MODULES////DATABASE///QUERIES/////////////////////

const spicedPG = require("spiced-pg");

const db = spicedPG("postgres:postgres:postgres@localhost:5432/imageboard");

////////////////MODULES////////////////////////////
//////remember EXPORTS!!!!!////////////////////////
//////////////GET DBQ//////////////////////////////
module.exports.getImages = () => {
    return db.query("SELECT * FROM images ORDER BY id DESC LIMIT 3");
};

module.exports.modalPic = id => {
    return db.query(`SELECT * FROM images WHERE id = $1`, [id]).then(result => {
        return result.rows[0]; //// we are returning one row from selected row that is selected in this case where id = $1
    });
};

module.exports.getComments = id => {
    return db
        .query(`SELECT * FROM comments WHERE image_id = $1`, [id])
        .then(result => {
            return result.rows; //// we are returning one row from selected row that is selected in this case where id = $1
        });
};

module.exports.morePics = id => {
    return db
        .query(`SELECT * FROM images WHERE id < $1 ORDER BY id DESC LIMIT 3`, [
            id
        ])
        .then(result => {
            return result.rows; /// you need to res.json only result cause this is returning
        });
};

// module.exports.morePics = id => {
//     return db.query(
//         `SELECT * FROM images ORDER BY id DESC LIMIT where id < $1`,
//         [id]).then(result => {
//             return result.rows;
//         })
//     )
// };

//////remember EXPORTS!!!!!////////////////////////

///////////INSERT DBQ//////////////////////////

module.exports.saveFile = (url, title, description, username) => {
    ////// this query should return also and not only insert
    return db
        .query(
            "INSERT INTO images (url, title, description, username) VALUES ($1,$2,$3,$4) RETURNING url, title, description, username, id",
            [url, title, description, username]
        )
        .then(result => {
            return result.rows[0];
        });
};

module.exports.insertComments = (username, comment, imageId) => {
    return db.query(
        "INSERT INTO comments (username, comment, image_id) VALUES ($1,$2,$3) RETURNING username, comment,image_id",
        [username, comment, imageId]
    );
};
