/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 17:32:43
 * @LastEditTime: 2020-09-04 00:13:20
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
// 处理文件提交
const formidable = require('formidable');

router.get('/getInfo', (req, res, next) => {
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

router.post('/editInfo', (req, res, next) => {
    // let obj = {};
    // let form = new formidable.IncomingForm();
    // form.parse(req, (err, fields, files)=>{
    //     console.log(fields);
    //     console.log(files)
    //     res.send('ok')
    // });
    // res.send('ok');

    let reqBody = req.body;

    console.log(reqBody, "tableData");
    fs.readFile(path.resolve('./db.json'), (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.send('Server bad..w.');
        }

        let fileData = JSON.parse(data.toString());
        // 编辑数据库中数据
        fileData[reqBody['id']] = reqBody;

        fs.writeFile(path.resolve('./db.json'), JSON.stringify(fileData), (err) => {
            if (err) { throw err }
            console.log("编辑文件成功");

            // 发送给前台
            let result = {
                code: 200,
                message: "编辑文件成功",
                data: fileData,
            };
            res.json(result);
        });

    });

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

        fs.writeFile(path.resolve('./db.json'), JSON.stringify(fileData), (err) => {
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
    let id = reqBody.id;
    fs.readFile(path.resolve('./db.json'), (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.send('Server bad..w.');
        }

        let fileData = JSON.parse(data.toString());
        fileData.splice(id, 1);

        fs.writeFile(path.resolve('./db.json'), JSON.stringify(fileData), (err) => {
            if (err) throw err;
            // 返回数据给前台
            let result = {
                code: 200,
                message: '删除信息成功',
                data: fileData
            };

            res.json(result);
        });


    });

    let result = {
        code: 200,
        message: "编辑信息成功"
    };
    res.json(result);

});



module.exports = router;

