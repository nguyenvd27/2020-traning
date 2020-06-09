<template>
  <div id="app" >
    <!-- <div v-if="checkLogin==true" class="wrapper">
      <navbar/>
      <sidebar/>
      <div class="content-wrapper">
        <router-view/>
      </div>
      <footer-page/>
    </div>
    <div v-else >
      <div  class="login-page">
        <router-view/>
      </div>
    </div>   -->

    <div :class="wrapper">
      <div v-if="checkLogin==true">
        <navbar/>
        <sidebar/>
      </div>
      <div :class="contentWrapper">
        <router-view/>
      </div>

      <div v-if="checkLogin==true">
        <footer-page/>
      </div>
    </div>
    
  </div>
</template>

<script>
import EventBus from './components/EventBus'

import Navbar from "./components/layouts/Navbar.vue";
import Sidebar from "./components/layouts/Sidebar.vue";
import FooterPage from "./components/layouts/Footer.vue";

import {isAuth} from './authenticate'

export default {
  name: "app",
  data() {
    return {
      checkLogin: false,
      wrapper: 'wrapper',
      contentWrapper: 'content-wrapper'
    };
  },
  mounted() {
    isAuth()
    .then(isAuth => {
      this.checkLogin = true
      this.wrapper ="wrapper"
      this.contentWrapper = "content-wrapper"
    })
    .catch(isAuth => {
      this.wrapper =""
      this.contentWrapper = "login-page"
      this.checkLogin = false
    })

    EventBus.$on('logged-in', () => {
      this.wrapper ="wrapper"
      this.contentWrapper = "content-wrapper"
      this.checkLogin = true
      console.log(this.checkLogin)
    })
    EventBus.$on('logged-out', () => {
      console.log('on event bus')
      this.wrapper =""
      this.contentWrapper = "login-page"
      this.checkLogin = false
      console.log(this.checkLogin)
    })
  }
  ,
  components: {
    Navbar,
    Sidebar,
    FooterPage
  }
};
</script>

<style>
</style>
