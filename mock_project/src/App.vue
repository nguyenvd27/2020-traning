<template>
  <div id="app">
    <navbar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/layouts/Navbar.vue";

export default {
  name: "app",
  data() {
    return {
    };
  },
  components: {
    Navbar
  }
};
</script>

<style>
</style>
