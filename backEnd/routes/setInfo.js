/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 17:32:43
 * @LastEditTime: 2020-09-18 17:45:29
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
// 处理文件提交
const formidable = require('formidable');

const curd = require('./curd');
const { resolve } = require('path');

router.get('/getInfo', (req, res, next) => {
    curd.find((err, data) => {
        if (err) {
            res.statusCode = 500;
            res.send('Server bad..w.');
        }
        data = JSON.parse(data.toString());
        let result = {
            code: 200,
            message: "ok",
            data
        }
        res.json(result);
    });
});

router.get('/findById', (req, res, next) => {
    let findIndex = req.query.id;
    let args = { id: findIndex };
    curd.findById(args, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.send('Server bad..w.');
        }
        let result = {
            code: 200,
            message: "ok",
            data
        }
        res.json(result);
    })
});

router.post('/editInfo', (req, res, next) => {
    let reqBody = req.body;
    curd.updateById(reqBody, (err) => {
        if (err) {
            res.statusCode = 500;
            res.send('Server bad..w.');
        }
        let result = {
            code: 200,
            message: "ok",
            data: "编辑成功",
        }
        res.json(result);
    });

});

router.post('/addInfo', (req, res, next) => {
    let reqBody = req.body;
    curd.save(reqBody, (err) => {
        if (err) {
            res.statusCode = 500;
            res.send('Server bad..w.');
        }
        let result = {
            code: 200,
            message: "ok",
            data: "保存成功",
        }
        res.json(result);
    });
});

router.post('/delInfo', (req, res, next) => {
    let reqBody = req.body;
    let id = reqBody.id;

    curd.deleteById(id, (err) => {
        if (err) {
            res.statusCode = 500;
            res.send('Server bad..w.');
        }
        let result = {
            code: 200,
            message: "ok",
            data: "删除成功",
        }
        res.json(result);
    });
});

router.post('/uploadImage', async (req, res, next) => {
    const form = new formidable.IncomingForm()
    // 设置存储文件的目录
    // const imgPath = path.join(__dirname, '/img');
    const imgPath = path.resolve('./public/images', './upload');

    // 如果目录不存在则创建
    if (!fs.existsSync(imgPath)) fs.mkdirSync(imgPath)
    form.uploadDir = imgPath
    // 上传文件大小限制
    form.maxFieldsSize = 20 * 1024 * 1024;

    let uploadFilePath = await new Promise(resolve => {
        form.parse(req, function (err, fields, files) {
            if (err) {
                resolve({ err });
            } else {
                // 手动给文件加后缀, formidable默认保存的文件是无后缀的
                let newPath = files.res.path + '_' + files.res.name;
                fs.renameSync(files.res.path, newPath);
                resolve({ path: newPath });
            }
        })
    });

    // const basename = path.resolve(`./public/images/upload`, `${path.basename(result.path)}`);
    const basename = path.join(`/public/images/upload`, `${path.basename(uploadFilePath.path)}`);
    console.log(basename, "basename");
    let result = {
        code: 200,
        message: "ok",
        data: {
            url: basename,
        },
    };
    res.json(result);
});


router.get('/getImage', (req, res, next) => {
    const basename = path.resolve(`./public/images/upload`);
    console.log(basename, "basename");
    let arr = [];
    curd.getImages(basename, (imgs) => {
        // console.log(fileName, filePath);
        console.log(imgs,"arr");
        let result = {
            code: 200,
            message: "ok",
            data: {
                imgs: imgs,
            },
        };
        res.json(result);
    });

    

});

module.exports = router;

