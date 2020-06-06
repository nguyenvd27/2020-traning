<template>
  <div id="app" class="wrapper">
    <navbar/>
    <sidebar/>
    
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <router-view/>
    </div>
    <!-- /.content-wrapper -->
    <footer-page/>
  </div>
</template>

<script>
import Navbar from "./components/layouts/Navbar.vue";
import Sidebar from "./components/layouts/Sidebar.vue";
import FooterPage from "./components/layouts/Footer.vue";

export default {
  name: "app",
  data() {
    return {
    };
  },
  components: {
    Navbar,
    Sidebar,
    FooterPage
  }
};
</script>

<style>
</style>
