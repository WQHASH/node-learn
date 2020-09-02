/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 17:32:43
 * @LastEditTime: 2020-09-02 18:17:54
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

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

router.get('/wqTest', (req, res) => {
    let str = `<h3>我是谁，我在哪里</h3>`;
    res.send(str);
});


router.post('/editInfo', (req, res, next) => {
    let reqBody = req.body;

    console.log(reqBody, "tableData");
    fs.readFile(path.resolve('./db.json', (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.send('Server bad..w.');
        }

        let fileData = JSON.parse(data.JSON.toString());
        // 编辑数据库中数据
        fileData[reqBody['id']] = reqBody;
        
        // 发送给前台
        let result = {
            code: 200,
            message: "增加信息成功",
        };
        res.json();
    }));

    let result = {
        code: 200,
        message: "编辑信息成功"
    };
    res.json(result);

});


router.post('/addInfo', (req, res, next) => {
    let reqBody = req.body;
    fs.readFile(path.resolve('./db.json'), (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.send('Server bad..w.');
        }

        let fileData = JSON.parse(data.toString());
        fileData.push(reqBody);

        fs.writeFile(path.resolve('./db.json'), JSON.stringify(fileData), (err, data) => {
            if (err) throw err;
            console.log('数据已被追加到文件');

            // 发送给前台
            let result = {
                code: 200,
                message: "增加信息成功",
                data: fileData,
            };
            res.json(result);
        });

    });



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

