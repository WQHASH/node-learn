/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-10-18 10:47:24
 * @LastEditTime: 2020-10-18 12:37:22
 */
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
// import socket from './socket';
// import WebSocket from 'ws';



// socketIo
// Vue.prototype.socket = socket;
// socket.on('connect', function () {
//   console.log('%c connect success.', 'color: #690');
// });

// socket.on('disconnect', () => {
//   console.log(socket.connected); // false
// })

// socket.on('data', (data) => {
//   console.log(data);
// });


// 原生
// let ws = new WebSocket('ws://localhost:3001');
// ws.onopen = function () {
//   // Web Socket 已连接上，使用 send() 方法发送数据
//   ws.send("发送数据");
//   console.log("数据发送中...");
// };

// ws.onmessage = function (evt) {
//   var received_msg = evt.data;
//   console.log("数据已接收...", `${received_msg}`);
// };
// ws.onclose = function () {
//   // 关闭 websocket
//   console.log("连接已关闭...");
// };






Vue.use(Element, {
  size: 'small',
  zIndex: 3000
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
