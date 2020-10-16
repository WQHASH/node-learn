import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import WebSocket from 'ws';
// import socket from './socket';

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



let ws = new WebSocket('ws://localhost:3000/test');

// 打开WebSocket连接后立刻发送一条消息:
ws.on('open', function () {
    console.log(`[CLIENT] open()`);
    ws.send('Hello!');
});

// 响应收到的消息:
ws.on('message', function (message) {
    console.log(`[CLIENT] Received: ${message}`);
});


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
