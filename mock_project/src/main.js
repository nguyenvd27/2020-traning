import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'

import FBSignInButton from 'vue-facebook-signin-button'
Vue.use(FBSignInButton)

import { isAuth } from './authenticate'

Vue.use(VueRouter)

import { AutoCompletePlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(AutoCompletePlugin)

const router = new VueRouter({
  // mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  isAuth()
  .then(isAuth => {
    if(to.matched.some((record) => record.meta.requiresAuth) && isAuth=='true'){
      next()
    }
    else {
      next({path: '/login'})
    }
  })
  .catch(isAuth => {
    if(to.matched.some((record) => record.meta.requiresAuth) && isAuth =='false'){
      next({path: '/login'})
    }
    else {
      next()
    }
  })
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
