<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Import File
            </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">{{$t('home')}}</router-link>
              </li>
              <li class="breadcrumb-item active">{{$t('assets')}}</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row container-fluid">
            <div class="col-12">
              <span>{{$t('total')}}: {{assets.length}}</span>
              <div class="card">
                <!-- card-header -->
                <div class="card-header">
                  <input type="file" v-on:change="importXLSX">
                </div>
                <!-- card-body -->
                <div v-if="assets.length!=0" class="card-body table-responsive p-0">
                  <table class="table table-bordered table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th >#</th>
                        <th >ID</th>
                        <th >{{$t('code')}} </th>
                        <th >{{$t('type')}} </th>
                        <th >Information</th>
                        <th >Information JP</th>
                        <th >{{$t('purpose')}} </th>
                        <th >Serial Number</th>
                        <th >Started Date</th>
                        <th >{{$t('status')}} </th>
                        <th >{{$t('manager')}} </th>
                        <th >Owner</th>
                        <th >Note</th>
                        <th >Confirm</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in assets" :key="index">
                        <th scope="row">{{index+1}}</th>
                        <td>{{item.id}}</td>
                        <td>{{item.asset_code}}</td>
                        <td>{{item.asset_type}}</td>
                        <td>{{item.asset_info}}</td>
                        <td>{{item.asset_info_jp}}</td>
                        <td>{{item.purpose}}</td>
                        <td>{{item.serial_number}}</td>
                        <td>{{item.started_date}}</td>
                        <td v-if="item.status==0">not use</td>
                        <td v-else-if="item.status==1">in use</td>
                        <td>{{item.manager}}</td>
                        <td>{{item.owner}}</td>
                        <td>{{item.note}}</td>
                        <td>{{item.confirm}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- card-footer -->
                <div v-if="assets.length!=0" class="card-footer clearfix">
                  <button class="btn btn-sm btn-danger" v-on:click="deleteF">Delete</button>
                  <button class="btn btn-sm btn-success" v-on:click="save">Save</button>
                </div>
              </div>
            </div>
          <!-- /.row -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "../../callApi/Api";
import EventBus from "../EventBus";

import Vue from 'vue'
import 'babel-polyfill' // fix error: regeneratorRuntime is not defined

import jwtDecode from 'jwt-decode'
import VueCookie from 'vue-cookie'

import XLSX from 'xlsx'

export default {
  data() {
    const token = VueCookie.get('usertoken')
    const decoded = jwtDecode(token)
    return {
      email: decoded.email,
      assets: []
    };
  },
  methods: {
    deleteF() {
      this.assets = []
    },
    importXLSX(e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = e => {
        const data = new Uint8Array(reader.result)
        const wb = XLSX.read(data, {type: 'array'})
        // const sheet1 = wb.Sheets.Sheet1
        // console.log(wb)
        let assetsInFile = []
        wb.SheetNames.forEach(function(sheetName) {
        const XL_row_object = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
        assetsInFile = assetsInFile.concat(XL_row_object)
      })
      console.log('array: ', assetsInFile);
      let asset = {}
      this.assets = this.assets.concat(assetsInFile)
      }
    },
    save() {
      axios.post('/assets/import-file', {
        email: this.email,
        assets: this.assets
      }).then( res => {
        console.log('ok')
        this.$router.push({ name: "asset", path: "/assets" });
      })
    }
  },
  mounted() {
  }
};
</script>

<style>
.sort:hover {
  cursor: pointer;
}
</style>
