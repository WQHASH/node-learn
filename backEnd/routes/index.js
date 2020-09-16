/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 10:03:55
 * @LastEditTime: 2020-09-16 14:11:49
 */
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());//数据JSON类型
router.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据

router.get('/', (req, res) => {
    let str = `<h3>我是谁，我在哪里</h3>`;
    res.send(str);
});

var setInfoRouter = require('./setInfo');
router.use(setInfoRouter);

module.exports = router;
