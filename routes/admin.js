
var express = require('express');

//可使用express.Router类创建模块化、可挂载的路由句柄
var router = express.Router();

//后台的路由 所有的后台处理都要经过这里
var login = require('./admin/login');
var product = require('./admin/product');


//权限判断:自定义中间件，判断登录状态
router.use(function (req,res,next) {
    if(req.url == '/login' || req.url == '/login/doLogin'){
        next();
    }else{
        if(req.session.userinfo && req.session.userinfo.username != ''){
            //console.log(req.session.userinfo);
            //判断有没有登录
            req.app.locals['userinfo'] = req.session.userinfo;//配置全局变量，可以在任何模板里面使用
            next();
        }else{
            res.redirect('/login');
        }
    }
})

//配置路由
router.use('/login',login);
router.use('/product',product);

//暴露这个router模块
module.exports = router;