/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-09-15 21:51:43
 * @LastEditTime: 2020-09-16 16:59:35
 */
const fs = require('fs');
const path = require('path');
const dbpath = path.resolve('./db.json');

// 查找
exports.find = function (callBack) {
    fs.readFile(dbpath, (err, data) => {
        if (err) {
            return callBack(err);
        }
        callBack(null, data);
    });
};

// 精确查找
exports.findById = function (args, callBack) {
    fs.readFile(dbpath, (err, fileData) => {
        if (err) {
            callBack(err);
        }
        let data = JSON.parse(fileData);
        data.id = Number(data.id);
        let obj = data.find(val => val.id == args.id);
        callBack(null, obj);
    });
};

// 增加
exports.save = function (obj, callBack) {
    fs.readFile(dbpath, (err, fileData) => {
        if (err) {
            callBack(err);
        }
        let data = JSON.parse(fileData);
        obj.id = data[data.length - 1].id + 1;
        data.push(obj);
        let newFileData = JSON.stringify(data);
        fs.writeFile(dbpath, newFileData, (err) => {
            if (err) {
                return callBack(err);
            }
            callBack(null);
        });
    });
};

// 删除
exports.deleteById = function (id, callBack) {
    fs.readFile(dbpath, (err, fileData) => {
        if (err) {
            callBack(err);
        }
        let data = JSON.parse(fileData);
        let deleId = data.findIndex(item => item.id == Number(id));
        data.splice(deleId, 1);
        let newFileData = JSON.stringify(data);
        fs.writeFile(dbpath, newFileData, (err) => {
            if (err) {
                return callBack(err);
            }
            callBack(null);
        });

    });
};

// 编辑
exports.updateById = function (obj, callBack) {
    fs.readFile(dbpath, (err, fileData) => {
        if (err) {
            callBack(err);
        }
        let data = JSON.parse(fileData);
        data.id = Number(data.id);
        let setId = data.findIndex(item => item.id == Number(obj['id']));
        data.splice(setId, 1, obj);
        let newFileData = JSON.stringify(data);
        fs.writeFile(dbpath, newFileData, (err) => {
            if (err) {
                return callBack(err);
            }
            callBack(null);
        });

    });

};
