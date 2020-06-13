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
        <router-link class="nav-link" to="/">{{$t('home')}}</router-link>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <router-link to="/contact" class="nav-link">{{$t('contact')}}</router-link>
      </li>
    </ul>

    <!-- SEARCH FORM -->
    <form class="form-inline ml-3" v-on:submit.prevent="onSubmit">
      <div class="input-group input-group-sm">
        <span style="width:180px"  class="form-control form-control-navbar">
          <ejs-autocomplete v-model="searchItem" :dataSource='dataItem' :fields='dataFields'
          :placeholder="$t('searchNav')" :groupTemplate="autocompleteGroupTemplate"
          popupWidth="250px" popupHeight="400px" :highlight="true">
          </ejs-autocomplete>
        </span>
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>
    
    <!-- Right navbar links -->
    <!-- <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <button class="multi-language" v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
          <flag :iso="entry.flag" v-bind:squared=false />
          {{entry.title}}
        </button>
      </li>
      <li class="nav-item">
        <span id="logout" class="nav-link" v-on:click="logout">{{$t('logout')}}</span>
      </li>
    </ul> -->


    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fas fa-ellipsis-v"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <div class="nav-item text-center">
            <span>{{$t('language')}}: </span>
            <button class="multi-language" v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
              <flag :iso="entry.flag" v-bind:squared=false />
              {{entry.title}}
            </button>
          </div>
          <div class="dropdown-divider"></div>
          <div class="text-center">
            <i class="far fa-user"></i>&nbsp;&nbsp;
            <router-link to="/profile">{{$t('profile')}}</router-link>
          </div>

          <div class="dropdown-divider"></div>
          <div class="text-center">
            <span id="logout" class="nav-link" v-on:click="logout">{{$t('logout')}}</span>
          </div>
        </div>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>

<script>
import EventBus from "../EventBus";
import VueCookie from 'vue-cookie'
import axios from "../../callApi/Api";

import i18n from '../../config/i18n';

export default {
  data() {
    return {
      autocompleteGroupTemplate: "<b><i>${type}</b></i>",
      assets: [],
      employees: [],
      dataItem: [],
      dataFields: { value: 'name', groupBy: 'type' },
      searchItem: "",
      languages: [
        { flag: 'gb', language: 'en'},
        { flag: 'jp', language: 'jp'},
        { flag: 'vn', language: 'vi'}
      ]
    };
  },
  methods: {
    changeLocale(locale) {
      i18n.locale = locale;
    },
    onSubmit() {
      this.dataItem.forEach(item => {
        if(item.name == this.searchItem && item.type == "asset code"){
          const path = '/assets/'+item.id
          this.$router.push(path)
        }
        else if(item.name == this.searchItem && item.type == "employee"){
          const path = '/employees/'+item.id
          this.$router.push(path)
        }
      })
    },
    logout() {
      VueCookie.delete('usertoken')
      this.emitMethod()
      this.$router.push({ name: 'login', path: '/login'})
    },
    emitMethod() {
      // console.log('logout event')
      EventBus.$emit("logged-out");
    }
  },
  mounted() {
    axios
      .get("/assets")
      .then(response => {
        this.assets = response.data.data;
        this.assets.forEach(asset => {
          asset.name = asset.asset_code
          asset.type = "asset code"
          this.dataItem.push(asset)
        });
        // console.log('dataItem: ', this.dataItem)
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("/employees")
      .then(response => {
        this.employees = response.data.data;

        this.employees.forEach(employee => {
          employee.type = "employee"
          this.dataItem.push(employee)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  
};
</script>

<style>

@import url(https://cdn.syncfusion.com/ej2/material.css);

#logout:hover {
  cursor: pointer;
}

.multi-language {
  border: 1px solid black;
}
</style>
