import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
// import axios from 'axios'
// Vue.use(axios)

import axios from 'axios'
Vue.prototype.$http = axios

Vue.use(VueRouter)

const router = new VueRouter({
  routes
});
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
