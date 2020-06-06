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
        <a href="#" class="nav-link">Contact</a>
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
      <!-- Notifications Dropdown Menu -->
      <!-- <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-user"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <div class="row">
            <div class="col-lg-6">
              <a href="#" class="btn btn-sm">Profile</a>
            </div>
            <div class="col-lg-6">
              <a href="#" class="btn btn-sm">Logout</a>
            </div>
          </div>
        </div>
      </li> -->

      <li v-if="auth=='' && (token==null || token==undefined)" class="nav-item">
        <router-link class="nav-link" to="/login">Login</router-link>
      </li>
      <li v-if="auth=='' && (token==null || token==undefined)" class="nav-item">
        <router-link class="nav-link" to="/register">Register</router-link>
      </li>
      <li v-if="auth=='loggedin' || token!=null || token!=undefined" class="nav-item">
        <router-link class="nav-link" to="/profile">Profile</router-link>
      </li>
      <li v-if="auth=='loggedin' || token!=null || token!=undefined" class="nav-item">
        <a class="nav-link" href v-on:click="logout">Logout</a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>

<script>
import EventBus from "../EventBus";

export default {
  data() {
    return {
      auth: "",
      token: localStorage.usertoken
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("usertoken");
    }
  },
  mounted() {
    EventBus.$on("logged-in", status => {
      this.auth = status;
    });
  }
};
</script>
