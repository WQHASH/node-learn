/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 17:32:43
 * @LastEditTime: 2020-09-15 17:51:13
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

router.post('/uploadImage',  async ctx => {
    const form = new formidable.IncomingForm()
    // 设置存储文件的目录
    const imgPath = path.join(__dirname, '/img')
    // 如果目录不存在则创建
    if (!fs.existsSync(imgPath)) fs.mkdirSync(imgPath)
    form.uploadDir = imgPath
    // 上传文件大小限制
    form.maxFieldsSize = 20 * 1024 * 1024

    let result = await new Promise(r => {
        form.parse(ctx, function (err, fields, files) {
            if (err) {
                r({ err })
            } else {
                // 手动给文件加后缀, formidable默认保存的文件是无后缀的
                let newPath = files.res.path + '_' + files.res.name
                fs.renameSync(files.res.path, newPath)
                r({ path: newPath })
            }
        })
    })
    const basename = '/' + path.basename(result.path)
    if (result.err) ctx.throw(400, '异常错误')
    else ctx.body = `<p>url: ${basename}</p><img src=${basename} style="max-width: 100%;">`

})

// router.post('/uploadImage', async (req, res, next) => {
//     let obj = {};
//     let form = new formidable.IncomingForm();
//     form.encoding = 'utf-8';
//     form.parse(req, (err, fields, files) => {
//         console.log(files,"files")
//         fs.readFile(files.res.path, (err, data)=>{
//             if(err){
//                 res.statusCode = 500;
//                 res.send('Server bad..w.');
//             };
//             // data.toString
//         });
//         // ================
//         var filename = files.res.name
//         var nameArray = filename.split('.');
//         var type = nameArray[nameArray.length - 1];
//         var name = '';
//         for (var i = 0; i < nameArray.length - 1; i++) {
//             name = name + nameArray[i];
//         }
//         var date = new Date();
//         var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
//         var avatarName = name + time + '.' + type;
//         var newPath = form.uploadDir + "/" + avatarName;
//         fs.renameSync(files.res.path, newPath);  //重命名
//         res.send({data:"/upload/"+avatarName})
//     });
// });

module.exports = router;

