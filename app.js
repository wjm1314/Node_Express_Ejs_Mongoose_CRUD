
var express = require('express');

var app = new express(); //实例化

//保存用户信息
var session = require("express-session");
//配置中间件（固定格式）
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*30
    },
    rolling: true
}))

var cors = require('cors');
var mongoose = require('mongoose');
var config = require('./config/DB');
//引入模块
var admin = require('./routes/admin');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(() => {
    console.log('Database is connected')
 },(err) => {
    console.log('Can not connect to the database'+ err)
 });

//使用ejs模板引擎，默认找views这个目录
app.set('view engine','ejs');

//配置public目录为我们的静态资源目录
//app.use(express.static(path.join(__dirname,'public')));
app.use(express.static('public'));

app.use(cors());

app.use('/upload',express.static('upload'));

app.use('/',admin);

app.listen(3004);