/*
 * @Description: 数据连接
 * @Author: wangqi
 * @Date: 2020-09-19 18:18:24
 * @LastEditTime: 2020-09-21 17:44:12
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/wqhash', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        throw err;
    } else {
        console.log("服务器链接成功！！！")
    }
});

const { Schema } = mongoose;

// 设计数据结构
const userSchema = new Schema({
    date: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },

});

const imgUrlSchema = new Schema({
    url: {
        type: "String",
        require: true
    },
});


// 将结构发布为模型
// 第一个参数为数据库名称  (现在是首字母大写单数User, 生成执行后会变成 全小写复数  users)
// const User = mongoose.model('User', userSchema);

// let admin = new User({
//     name: 'wangqi',
//     password: 123,
//     email: 'wqhash@163.com'
// });

// admin.save((err, data)=>{
//     if(err){
//         console.log('保存失败');
//     }else{
//         console.log('保存成功');
//         console.log(data,"data");
//     }
// });

// module.exports = mongoose.model('User', userSchema);

module.exports = {
    users: mongoose.model('User', userSchema),
    imgUrls: mongoose.model('ImgUrl', imgUrlSchema)
}




