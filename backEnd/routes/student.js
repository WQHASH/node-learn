const { json } = require('body-parser');
/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-09-15 21:51:43
 * @LastEditTime: 2020-09-15 22:47:09
 */
const fs = require('fs');
const path = require('path');

exports.find = function (callBack) {
    fs.readFile(path.resolve('./db.json'), 'utf8', function (err, data) {
        if (err) {
            return callBack(err)
        }
        callBack(null, JSON.parse(data));
    });
};
// find((err, data)=>{});


exports.findById = function (id, callBack) {
    fs.readFile(path.resolve('./db.json'), (err, data) => {
        if (err) {
            return callBack(err)
        }
        let results = JSON.parse(data);
        let obj = results.find(val => val.id == id);
        callBack(obj);
    });
};

exports.save = function (item, callBack) {
    fs.readFile(path.resolve('./db.json', function (err, data) {
        if (err) {
            return callBack(err)
        }

        let results = JSON.parse(data);
        results.push(item);
        results = JSON.stringify(results);
        fs.writeFile(path.resolve('./db.json'), function (err) {
            if (err) {
                callBack(err);
            }
            callBack(null);
        });
    }));
};

// save({}, ()=>{})

exports.updata = function (item, callBack) {
    fs.readFile(path.resolve('./db.json'), (err, data) => {
        if (err) {
            return callBack(err);
        }
        let results = JSON.parse(data);
        // 或者说要遍历对象的每个属性，然后进行赋值操作
        results[item['id']] = item;
        // 重写 json文件
        results = JSON.stringify(results);
        fs.writeFile(path.resolve('./db.json'), function (err) {
            if (err) {
                callBack(err);
            }
            callBack(null);
        });


    });
};

// updata({id:"", data}, ()=>{});