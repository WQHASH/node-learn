/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-09-17 09:33:58
 * @LastEditTime: 2020-09-17 10:30:56
 */
let fs = require('fs');
let path = require('path');

console.log(path.resolve(), "resolve")
console.log(__dirname, "__dirname");
let filePaht = path.join(__dirname);
console.log(filePaht,"filePaht");

console.log('===============');

// path.resolve('./public/images/upload/upload_671f49cfac9f78c169dd9b2a4f09177b_1.png', './public/images/upload/aaa.png');
let oldPath = path.resolve('./public/images/upload/upload_671f49cfac9f78c169dd9b2a4f09177b_1.png');
let newPath = path.resolve('./public/images/upload/aaa.png');
// fs.renameSync(oldPath, newPath);

let isHas = fs.existsSync(newPath);
console.log(isHas,"isHas");
// fs.writeFile(path.resolve('./a/b.txt'), "xsx", ()=>{
//     console.log("ok")
// })