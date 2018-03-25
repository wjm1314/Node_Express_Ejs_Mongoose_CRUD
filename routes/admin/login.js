
var express = require('express');

var router = express.Router();
var md5 = require('md5-node');//md5加密
/*post请求通常会发送一个表单，或者json，它作为request的body发送。
* 但是node.js提供的原始request对象，不具备解析request的body功能，
* 因此，需要引入一个中间件来解析request的body请求，
* 即：body-parser*/
var bodyParser = require('body-parser');
//设置body-parser中间件
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
/*var DB = require("../../modules/db.js");*/
//Require user model in our routes module
var User = require('../../model/user');

router.get('/',function (req,res) {
    res.render('login');
})

router.post('/doLogin',function (req,res) {
    //console.log(req.body);//获取post提交的数据
    var username = req.body.username;
    var password = md5(req.body.password);//要对用户输入的密码进行加密
    //1.获取数据
    //2.连接数据库查询数据
    /*MongoClient.connect(DbUrl,function (err,db) {
        if(err){
            console.log(err);
            return;
        }
        //查询数据
        var result = db.collection('user').find({
            username: username,
            password: password
        });
        //另一种遍历数据的方法
        result.toArray(function (err,data) {
            console.log(data);
            if(data.length > 0){
                console.log('登录成功')
                //保存用户信息
                req.session.userinfo = data[0];
                res.redirect('/product');//登陆成功跳转到商品列表
            }else{
                res.send("<script>alert('登录失败');location.href='/login'</script>");
            }
            db.close();
        })
    })*/
    /*DB.find('user',{
        username: username,
        password: password
    },function (err,data) {
        if(data.length>0){
            //console.log('登陆成功');
            //保存用户信息
            req.session.userinfo = data[0];
            res.redirect('../product/product');//登陆成功跳转到商品列表
        }else{
            res.send("<script>alert('登录失败');location.href='/'</script>")
        }
    })*/
    User.find({
        username: username,
        password: password
    },function (err,data) {
        if(data.length>0){
            //console.log('登陆成功');
            //保存用户信息
            req.session.userinfo = data[0];
            res.redirect('../product/product');//登陆成功跳转到商品列表
        }else{
            res.send("<script>alert('登录失败');location.href='/'</script>")
        }
    })
})

router.get('/loginOut',function(req,res){
    //销毁session
    req.session.destroy(function (err) {
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    })
})

module.exports = router;