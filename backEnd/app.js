/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 10:03:55
 * @LastEditTime: 2020-10-16 19:22:07
 */
var createError = require('http-errors');
var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = require('./routes/index');

var app = express();
// var users = require('./mongo/config');

// var list = new users({
//   name: "小刘",
//   address: "南京"
// });
// list.save((err, data)=>{
//   if(err){ return console.log("数据库保存失败!")};
//   console.log(data, "数据库保存成功");
// });

// users.find({name:'汪琪'}, (err, data)=>{
//   if(err){ return console.log("查询失败！")};
//   console.log(data,"查询成功");
// })



// 导入WebSocket模块:
const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
  port: 3001
});

wss.on('connection', function (ws) {
  console.log(`[SERVER] connection()`);
  ws.on('message', function (message) {
      console.log(`[SERVER] Received: ${message}`);
      
      ws.send(`ECHO: ${message}`, (err) => {
          if (err) {
              console.log(`[SERVER] error: ${err}`);
          }
      });
  })
});




// jade
// view engine setup
// 设置模板的文件路径入口, views 可以修改成其他模板文件夹
app.set('views', path.join(__dirname, 'views'));
// 设置模板文件的后缀类型
app.set('view engine', 'jade');

// pug
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// art-template
// art模板比较特殊，他能设置成为html来使用
// app.engine('html', require('express-art-template'));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));


// //解决跨域
// app.all("*", function (req, res, next) {
//   //设置允许跨域的域名，*代表允许任意域名跨域
//   res.header("Access-Control-Allow-Origin", "*");
//   //允许的header类型
//   res.header("Access-Control-Allow-Headers", "content-type");
//   //跨域允许的请求方式 
//   res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
//   if (req.method.toLowerCase() == 'options') {
//     res.send(200); //让options尝试请求快速结束
//   }
//   else { next() }
// });


// 解决跨域问题
// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

app.use(router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// console.log(process.env.NODE_ENV, "env");

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
