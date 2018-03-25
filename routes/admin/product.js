
var express = require('express');

var router = express.Router();

var multiparty = require('multiparty');

var fs = require('fs');

//var DB = require('../../modules/db');
var Product = require('../../model/product');

router.get('/product',function (req,res) {
    //连接数据库查询数据
    /*DB.find('product',{},function (err,data) {
        //console.log(data);
        res.render('product',{
            list: data
        });
    })*/
    Product.find({},function (err,data) {
        //console.log(data);
        res.render('product',{
            list: data
        });
    })
})

router.get('/add',function (req,res) {
    res.render('productAdd');
})

router.post('/doAdd',function (req,res) {
    //获取表单数据，以及post过来的图片
    var form = new multiparty.Form();
    form.uploadDir = 'upload'; //上传图片保存的地址，目录必须存在
    form.parse(req,function (err,fields,files) {
        //获取提交的数据以及图片上传成功返回的图片信息
        //console.log(fields);//获取表单的数据
        //console.log(files);//图片上传成功返回的信息
        var title = fields.title[0];
        var price = fields.price[0];
        var fee = fields.fee[0];
        var description = fields.description[0];
        var pic = files.pic[0].path;
        var content = {
            title: title,
            price: price,
            fee: fee,
            description: description,
            pic: pic
        };
        var monInsert = new Product(content);
        monInsert.save(function (err) {
            if(!err){
                res.redirect('/product/product');
            }
        })
    })
})

router.get('/edit',function (req,res) {
    //获取get传值id
    var id = req.query.id;
    //去数据库查询这个id对应的数据，自增长的id要用{"_id":new DB.ObjectID(id)
    Product.find({'_id': id},function (err,data) {
        res.render('productEdit',{
            list: data[0]
        });
    })
})

router.post('/doEdit',function (req,res) {
    var form = new multiparty.Form();
    form.uploadDir = 'upload';
    form.parse(req,function (err,fields,files) {
        var id = fields._id[0];//修改的条件
        var title = fields.title[0];
        var price = fields.price[0];
        var fee = fields.fee[0];
        var description = fields.description[0];
        //var originalFilename = files.pic[0].originalFilename;
        var pic = files.pic[0].path;
        var setData = {
            title: title,
            price: price,
            fee: fee,
            description: description,
            pic: pic
        };
        /*if(originalFilename) {//修改了图片
            var setData = {
                title: title,
                price: price,
                fee: fee,
                description: description,
                pic: pic
            };
        }else{//没有修改图片
            var setData={
                title:title,
                price:price,
                fee:fee,
                description:description
            };
            //删除生成的临时文件
            fs.unlink(pic);
        }*/
        Product.update({"_id": id},setData,function (err,data) {
            if(!err){
                res.redirect('/product/product');
            }
        })
    })
})

router.get('/delete',function (req,res) {
    var id = req.query.id;
    Product.remove({"_id": id},function (err,data) {
        if(!err) {
            res.redirect('/product/product');
        }
    })
})

module.exports = router;