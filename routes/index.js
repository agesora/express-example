var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var co = Promise.coroutine;
var fetch = require('node-fetch');
//res.render渲染模板
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

//res.send 发送文字或者json
router.get('/send', function(req, res, next) {
    res.send('hell world');
});

//Promise
router.get('/promise', function(req, res, next) {
    new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, 1000);
    }).then(function() {
        res.send('promise 延迟1s返回信息');
    });
});

//Promise+yield
router.get('/promiseYield', function(req, res, next) {
    co(function * () {
        let title = yield new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve('Express');
            }, 1000);
        });
        res.send('promise+yield 延迟1s返回信息');
    })();
});

//post页面
router.get('/postPage', function(req, res, next) {
    res.render('postPage', {title: 'Express'});
});

//post处理
router.post('/post', function(req, res, next) {
    res.send(req.body);
});

//fetchget
router.get('/fetchGet', function(req, res, next) {
    co(function * () {
        let data = yield fetch('http://localhost:3000/users').then(function(response) {
            return response.json();
        });
        console.log(data);
        res.send('从/users中获取的json信息：' + JSON.stringify(data));
    })();
});

module.exports = router;
