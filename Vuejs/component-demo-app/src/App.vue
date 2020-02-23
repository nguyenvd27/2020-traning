<template>
  <div id="app">
    <component-header
      v-bind:titleHeader="titleHeader"
      v-on:changeTitleEvent="handleTitle"
    ></component-header>
    <list-user
      v-bind:listUser="listUser"
      v-on:deleteUserEvent="handleDelete"
    ></list-user>
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <component-footer></component-footer>
  </div>
</template>

<script>
import ComponentHeader from './components/ComponentHeader.vue'
import ComponentFooter from './components/ComponentFooter.vue'
import ListUser from './components/ListUser.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      titleHeader: 'Hello Vuejs - Header',
      listUser: [
        { id: 0, email: 'test1@gmail.com', active: true},
        { id: 1, email: 'test2@gmail.com', active: true},
        { id: 2, email: 'test3@gmail.com', active: false},
        { id: 3, email: 'test4@gmail.com', active: true}
      ]
    }
  },
  methods: {
    handleTitle(data) {
      this.titleHeader = data.title
    },
    handleDelete(data) {
      var indexDelete = -1
      this.listUser.forEach((u, idx) => {
        if(u.id === data.id ){
          indexDelete = idx
        }
      })
      if(indexDelete != -1){
        this.listUser.splice(indexDelete, 1)
      }
    }
  },
  components: {
    ComponentHeader,
    ComponentFooter,
    ListUser
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
