<template>
  <div>
    <div class="header">
      <page-header></page-header>
    </div>
    <div id="app" class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import PageHeader from './components/layouts/PageHeader.vue'

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    }
  },
  components: {
    PageHeader
  }
};
</script>

<style>
</style>
