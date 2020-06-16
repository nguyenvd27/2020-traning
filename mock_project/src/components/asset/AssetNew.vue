<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>{{$t('newAsset')}}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">{{$t('home')}}</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/assets">{{$t('assets')}}</router-link>
              </li>
              <li class="breadcrumb-item active">{{$t('newAsset')}}</li>
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
            <!-- Horizontal Form -->
            <div class="card card-success">
              <form class="form-horizontal" v-on:submit.prevent="onCreate">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-5">
                      <div class="form-group row">
                        <label for="asset-code" class="col-sm-4 col-form-label">{{$t('code')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="asset-code" required v-model="asset.asset_code">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="asset-type" class="col-sm-4 col-form-label">{{$t('type')}}</label>
                        <div class="col-sm-8">
                          <select class="custom-select" required v-model="asset.asset_type">
                            <option disabled value>Please select one</option>
                            <option v-for="(item, index) in assetTypes" v-bind:key="index">{{item.name}}</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="asset-info" class="col-sm-4 col-form-label">{{$t('info')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="asset-info" required v-model="asset.asset_info">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="asset-info-jp" class="col-sm-4 col-form-label">{{$t('info')}} (JP)</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="asset-info-jp" v-model="asset.asset_info_jp">
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="purpose" class="col-sm-4 col-form-label">{{$t('purpose')}}</label>
                        <div class="col-sm-8">
                          <select class="custom-select" required v-model="asset.purpose">
                            <option disabled value>Please select one</option>
                            <option v-for="(item, index) in purposes" v-bind:key="index">{{item.name}}</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="serial-number" class="col-sm-4 col-form-label">{{$t('serialNumber')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="serial-number" required v-model="asset.serial_number">
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-5">
                      <div class="form-group row">
                        <label for="started-date" class="col-sm-4 col-form-label">{{$t('startedDate')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="started-date" v-model="asset.started_date">
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="status" class="col-sm-4 col-form-label">{{$t('status')}}</label>
                        <div class="col-sm-8">
                          <input type="radio" id="status-in-use" value="1" v-model="asset.status">
                          <label for="status-in-use">in use</label>
                          &nbsp; &nbsp;
                          <input type="radio" id="status-not-use" value="0" checked v-model="asset.status">
                          <label for="status-not-use">not use</label>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="manager" class="col-sm-4 col-form-label">{{$t('manager')}}</label>
                        <div class="col-sm-8">
                          <select class="custom-select" disabled required v-model="asset.manager">
                            <option disabled value>Please select one</option>
                            <option v-for="(item, index) in employees" v-bind:key="index">{{item.name}}</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="owner" class="col-sm-4 col-form-label">{{$t('owner')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="owner" required v-model="asset.owner">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="note" class="col-sm-4 col-form-label">{{$t('note')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="note" v-model="asset.note">
                        </div>
                      </div>
                      <div class="form-group row">
                        <button class="btn btn-success col-sm-4" type="submit">{{$t('create')}}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <!-- /.card -->
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

import jwtDecode from 'jwt-decode'
import VueCookie from 'vue-cookie'

export default {
  data() {
    const token = VueCookie.get('usertoken')
    const decoded = jwtDecode(token)
    return {
      email: decoded.email,
      asset: {
        asset_code: "",
        asset_type: "",
        asset_info: "",
        asset_info_jp: "",
        purpose: "",
        serial_number: "",
        started_date: "",
        status: 0,
        manager: "",
        owner: "",
        note: "",
        confirm: 0
      },
      purposes: [],
      employees: [],
      assetTypes: []
    };
  },
  methods: {
    onCreate() {
      axios
        .post("/assets", {
          email: this.email,
          asset_code: this.asset.asset_code,
          asset_type: this.asset.asset_type,
          asset_info: this.asset.asset_info,
          asset_info_jp: this.asset.asset_info_jp,
          purpose: this.asset.purpose,
          serial_number: this.asset.serial_number,
          started_date: this.asset.started_date,
          status: this.asset.status,
          manager: this.asset.manager,
          owner: this.asset.owner,
          note: this.asset.note,
          confirm: this.asset.confirm
        })
        .then(res => {
          // console.log('res: ', res)
          if(res.data.error){
            alert('You are not admin')
          } else {
            this.$router.push({ name: "asset", path: "/assets" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    axios
      .get("/purposes")
      .then(res => {
        this.purposes = res.data.data;
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("/employees")
      .then(res => {
        this.employees = res.data.data;
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("/asset-type")
      .then(res => {
        this.assetTypes = res.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
