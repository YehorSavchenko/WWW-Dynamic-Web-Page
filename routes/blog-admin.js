var express = require('express');
var router = express.Router();

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'blog_articles'
});


/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('blog-admin', {
        intro: "../#top",
        about: "../#about",
        portfolio: "../#portfolio",
        experience: "../#experience",
    });
});

router.post('/', function (req, res, next) {
    console.log(req.body)
    const sql_articles = 'INSERT INTO articles (Title, ShortDescription, FullDescription, PreviewImage)  VALUES (?, ?, ?, ?);';
    db.query(sql_articles, [req.body['title'], req.body['short_description'], req.body['full_description'], req.body['image_path']], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
    res.render('blog-admin', {
        intro: "../#top",
        about: "../#about",
        portfolio: "../#portfolio",
    });
});


db.connect();
module.exports = router;
