/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 17:32:43
 * @LastEditTime: 2020-10-15 15:36:32
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
// 处理文件提交
const formidable = require('formidable');

// const curd = require('./curd');
const { users, imgUrls } = require('../mongo/config');

// let imgUrl = new imgUrls({
//     url: "/public/images/upload/aaa.png",
// })
// imgUrl.save((err, data) => {
//     if (err) {
//         console.log('保存失败');
//     } else {
//         console.log('保存成功');
//         console.log(data, "data");
//     }
// });

router.get('/getInfo', (req, res, next) => {
    users.find((err, data) => {
        console.log(data,"data")
        if (err) {
            res.statusCode = 500;
            res.send('Server bad..w.');
        }
        // data = JSON.parse(data.toString());
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
    users.findById(findIndex, (err, data) => {
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
    let id = req.body.id;
    users.findByIdAndUpdate(id, req.body, (err, data) => {
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
    users.create(reqBody, (err) => {
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

    users.findByIdAndRemove(id, (err) => {
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
                console.log(newPath, "newPath")
                // let newPath = files.res.name;
                fs.renameSync(files.res.path, newPath);
                resolve({ path: newPath });
            }
        })
    });
    console.log(uploadFilePath, "uploadFilePath")

    // const basename = path.resolve(`./public/images/upload`, `${path.basename(result.path)}`);
    let basename = path.join(`/public/images/upload`, `${path.basename(uploadFilePath.path)}`);
    let newBasename = basename.split(path.sep).join('/');
    // windows下
    // basename.replace(/\\/g, '\/');
    console.log(newBasename, "newBasename");

    let result = {};
    imgUrls.create({ url: newBasename }, (err, data) => {
        if (err) {
            console.log("图片上传失败");
            result = {
                code: 200,
                message: "fail",
                data: {
                    url: [],
                },
            };
            res.json(result);
        } else {
            console.log("图片上传成功");
            result = {
                code: 200,
                message: "ok",
                data: {
                    url: newBasename,
                },
            };
            res.json(result);
        }
    });
});


router.get('/getImage', (req, res, next) => {
    const basename = path.resolve(`./public/images/upload`);
    let arr = [];
    imgUrls.find((err, imgs) => {
        if (err) {
            res.statusCode = 500;
            res.send('Server bad..w.');
        }
        let result = {
            code: 200,
            message: "ok",
            data: {
                imgs: imgs,
            },
        };
        res.json(result);
    });

    // curd.getImages(basename, (imgs) => {
    //     console.log(imgs,"arr");
    //     let result = {
    //         code: 200,
    //         message: "ok",
    //         data: {
    //             imgs: imgs,
    //         },
    //     };
    //     res.json(result);
    // });



});

module.exports = router;

