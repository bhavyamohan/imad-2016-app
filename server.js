var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;


// you can optionally supply other values
var config = {
  host: 'http://db.imad.hasura-app.io/',
  user: 'bhavyamohan',
  port: '5432',
  password: process.env.DB_PASSWORD,
  database: 'bhavyamohan',
};



var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/article', function (req, res) {
  res.sendFile(path.join(__dirname, '9.html'));
});

app.get('/articletwo', function (req, res) {
  res.sendFile(path.join(__dirname, 'article-one.html'));
});

app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname, 'article-3.html'));
});



var pool = new Pool(config);
app.get('/UserData', function (req, res) {
  
  pool.query('SELECT * FROM USERDATA', function(err,result)
  {
    if (err){
        res.status(500).send(err.toString());
    }
    else {
        res.send(JSON.stringify(result.rows));
    }
  });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
