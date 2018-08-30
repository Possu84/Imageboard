/////////MODULES////DATABASE///QUERIES/////////////////////

const spicedPG = require('spiced-pg');

const db = spicedPG('postgres:postgres:postgres@localhost:5432/imageboard');

////////////////MODULES////////////////////////////
//////remember EXPORTS!!!!!//////
module.exports.getImages = () => {
    return db.query('SELECT * FROM images ORDER BY id DESC');
};

module.exports.saveFile = (url, title, description, username) => {
    console.log('in saveFile', description);
    ////// this query should return also and not only insert
    return db
        .query(
            'INSERT INTO images (url, title, description, username) VALUES ($1,$2,$3,$4) RETURNING url, title, description, username',
            [url, title, description, username]
        )
        .then(result => {
            return result.rows[0];
        });
};

module.exports.modalPic = id => {
    return db.query(`SELECT * FROM images WHERE id = $1`, [id]);
};

module.exports.getComments = id => {
    return db.query(` SELECT * FROM comments WHERE id = $1`, [id]);
};
