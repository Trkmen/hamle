const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser'); 
const mysql=require("mysql");
const app = express(); 

var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());


const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"staj"
})

connection.connect(function (error) {
    if(error) console.log(error);
    else console.log("Database connected!");
});

//set views file
app.set('views',path.join(__dirname,'views'));
 
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('Public'));

 app.get('/',(req, res) => {
    res.render('index');
});

app.post('/index',(req, res) => {
    let data={ad: req.body.ad, soyad: req.body.soyad, telefon:req.body.telefon, mail:req.body.mail, sehir:req.body.sehir, universite:req.body.universite, bolum:req.body.bolum, sinif:req.body.sinif, staj_süresi:req.body.staj_süresi};
    let sql="INSERT INTO Form SET ?";
    let query=connection.query(sql,data,(err,results) =>{
        if(err) throw err;
        res.render('anasayfa');
    });
});


// Server Listening
app.listen(8000, () => {
    console.log('Server is running at port 3000');
});
 