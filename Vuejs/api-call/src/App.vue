<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <p>
      <router-link tag="a" to="/"> Home </router-link> OR
      <router-link tag="a" to="/users"> Users </router-link>
    </p>
    <router-view />
    <router-view name="page-header"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'API Call Demo'
    }
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
