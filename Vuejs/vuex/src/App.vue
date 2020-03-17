<template>
  <div id="app" class="container">
    <h1>Vuex Tutorial</h1>
    <hr/>
    <app-result />
    <app-getter-demo />
    <app-couter />
  </div>
</template>

<script>
import AppCouter from './components/Couter'
import AppResult from './components/Result'
import AppGetterDemo from './components/GetterDemo'

export default {
  name: 'app',
  components: {
    AppCouter,
    AppResult,
    AppGetterDemo
  }
}
</script>

<style>

</style>
