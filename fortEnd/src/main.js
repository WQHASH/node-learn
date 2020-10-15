import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import socket from './socket';

// const socket = io('ws://localhost:3000/');

socket.on('connect', function () {
  console.log('%c connect success.', 'color: #690');
});

socket.on('disconnect', () => {
  console.log(socket.connected); // false
})

socket.on('data', (data) => {
  console.log(data);
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
