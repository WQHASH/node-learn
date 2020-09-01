/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 17:32:43
 * @LastEditTime: 2020-09-01 23:57:29
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

let tableData = [{
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄",
},
{
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄",
},
{
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
},
{
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
},
];


router.get('/getInfo', (req, res, next) => {
    console.log(path.resolve(), "resolve");
    fs.readFile(path.resolve('./db.json'), (err, data) => {
        if (err) {
            // res.status(500).send('Server bad...')
            res.statusCode = 500;
            res.send('Server bad..w.');
        };
        data = JSON.parse(data.toString());
        let result = {
            code: 200,
            message: "ok",
            tableData: data,
        };
        res.json(result);
    });

});

router.get('/wqTest', (req, res)=>{
    let str = `<h3>我是谁，我在哪里</h3>`;
    res.send(str);
});


router.post('/editInfo', (req, res, next) => {
    let reqBody = req.body;

    console.log(reqBody, "tableData");
    let result = {
        code: 200,
        message: "编辑信息成功"
    };
    res.json(result);

});


router.post('/addInfo', (req, res, next) => {
    let reqBody = req.body;
  
    tableData.push(reqBody);
    let result = {
        code: 200,
        message: "增加信息成功"
    };
    res.json(result);

});


router.post('/delInfo', (req, res, next) => {
    let reqBody = req.body;
    let result = {
        code: 200,
        message: "编辑信息成功"
    };
    res.json(result);

});



module.exports = router;

