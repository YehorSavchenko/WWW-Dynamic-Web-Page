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


router.get('/', function (req, res, next) {
    const sql_one_article = 'SELECT Title, FullDescription FROM articles WHERE ID=?;';
    db.query(sql_one_article, [req.query.id], (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log(result[0])
        res.render('article-page', {
            intro: "../#top",
            about: "../#about",
            portfolio: "../#portfolio",
            title: result[0]['Title'],
            full_description: result[0]['FullDescription']
        });
    })
});

module.exports = router;
