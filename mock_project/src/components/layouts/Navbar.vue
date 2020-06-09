<template>
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button">
          <i class="fas fa-bars"></i>
        </a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <router-link to="/contact" class="nav-link">Contact</router-link>
      </li>
    </ul>

    <!-- SEARCH FORM -->
    <form class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <input
          class="form-control form-control-navbar"
          type="search"
          placeholder="Search"
          aria-label="Search"
        >
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <span id="logout" class="nav-link" v-on:click="logout">Logout</span>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>

<script>
import EventBus from "../EventBus";
import VueCookie from 'vue-cookie'

// import { isAuth } from '../../authenticate'

export default {
  data() {
    return {
      
    };
  },
  methods: {
    logout() {
      VueCookie.delete('usertoken')
      this.emitMethod()
      this.$router.push({ name: 'login', path: '/login'})
    },
    emitMethod() {
      console.log('logout event')
      EventBus.$emit("logged-out");
    }
  }
};
</script>

<style>
#logout:hover {
  cursor: pointer;
}
</style>
