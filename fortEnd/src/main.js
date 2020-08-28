import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';

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
