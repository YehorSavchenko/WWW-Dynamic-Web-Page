var express = require('express');
var router = express.Router();

const mysql = require('mysql2');
const ejs = require('ejs');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'blog_articles'
});


/* GET home page. */
router.get('/', function (req, res, next) {
    let articles_html = "";
    const sql_articles = 'SELECT ID, Title, ShortDescription, PreviewImage FROM articles;';
    db.query(sql_articles,(error, result) => {
        if (error) {
            console.log(error);
        }
        result.forEach(element => {
            ejs.renderFile("views/inc/article.ejs",
                {
                    article_id: element['ID'],
                    title: element['Title'],
                    short_description: element['ShortDescription'],
                    preview_image: element['PreviewImage']
                }, function (err, html) {
                    if (error) {
                        console.log(error);
                    }
                    articles_html += html;
                })
        });

        res.render('blog', {
            intro: "../#top",
            about: "../#about",
            portfolio: "../#portfolio",
            articles: articles_html
        });
    });

});


db.connect();
module.exports = router;
