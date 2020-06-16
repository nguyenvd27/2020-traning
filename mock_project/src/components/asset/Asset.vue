<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>{{$t('assets')}} &nbsp;
              <router-link class="btn btn-success btn-sm" to="/assets/new">
                <i class="fas fa-plus"></i> {{$t('addAsset')}}
              </router-link>
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
                  <export-excel
                    class   = "btn btn-sm  btn-warning"
                    :data   = "assets"
                    :fields = "json_fields"
                    worksheet = "My Worksheet"
                    name    = "assets.xls">
                      {{$t('exportExcel')}}
                  </export-excel>

                  <div class="card-tools">
                    <div class="input-group input-group-sm" style="width: 150px;">
                      <input
                        type="text"
                        name="table_search"
                        class="form-control float-right"
                        :placeholder="$t('search')"
                        v-model="searchValueTable"
                        v-on:keyup="keyupSearch"
                      >
                      <div class="input-group-append">
                        <button type="submit" class="btn btn-default">
                          <i class="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- card-body -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-bordered table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th >#</th>
                        <!-- <th >ID</th> -->
                        <th >{{$t('code')}} <span class="float-right sort"><i class="fas fa-sort" v-on:click="sortFunc"></i></span> </th>
                        <th >{{$t('type')}} <span class="float-right sort"><i class="fas fa-sort"></i></span></th>
                        <th >{{$t('purpose')}} <span class="float-right sort"><i class="fas fa-sort"></i></span></th>
                        <th >{{$t('status')}} <span class="float-right sort"><i class="fas fa-sort"></i></span></th>
                        <th >{{$t('manager')}} <span class="float-right sort"><i class="fas fa-sort"></i></span></th>
                        <th >{{$t('action')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in assetInPage" :key="index">
                        <th scope="row">{{(index+1)+((pageCurrent-1)*showItem)}}</th>
                        <!-- <td>{{item.id}}</td> -->
                        <td>{{item.asset_code}}</td>
                        <td>{{item.asset_type}}</td>
                        <td>{{item.purpose}}</td>
                        <td v-if="item.status==0">not use</td>
                        <td v-else-if="item.status==1">in use</td>
                        <td>{{item.manager}}</td>

                        <td class="py-0 align-middle">
                          <div class="btn-group btn-group-sm">
                            <router-link :to="'/assets/'+item.id" class="btn btn-primary"><i class="fas fa-eye"></i></router-link>
                            <router-link :to="'/assets/'+item.id" class="btn btn-info"><i class="fas fa-pencil-alt"></i></router-link>
                            <button class="btn btn-danger" data-toggle="modal" data-target="#myModal" v-on:click="deleteObj=item">
                              <i class="far fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- card-footer -->
                <div class="card-footer clearfix">
                  <paginate
                    :page-count="pageCount"
                    :click-handler="clickCallback"
                    :prev-text="'&laquo;'"
                    :prev-class="'page-item'"
                    :prev-link-class="'page-link'"
                    :next-text="'&raquo;'"
                    :next-class="'page-item'"
                    :next-link-class="'page-link'"
                    :container-class="'pagination pagination-sm m-0 float-right'"
                    :page-class="'page-item'"
                    :page-link-class="'page-link'">
                  </paginate>
                </div>
                <!-- /.modal--->
                <div class="modal fade" id="myModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title">{{$t('deleteMsg')}}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-footer justify-content-right">
                        <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('cancel')}}</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="onDelete()">{{$t('delete')}}</button>
                      </div>
                    </div>
                  </div>
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
import excel from 'vue-excel-export'
Vue.use(excel)

import Paginate from 'vuejs-paginate'

import jwtDecode from 'jwt-decode'
import VueCookie from 'vue-cookie'

export default {
  components: {
    Paginate: Paginate
  },
  data() {
    const token = VueCookie.get('usertoken')
    const decoded = jwtDecode(token)
    return {
      email: decoded.email,
      searchValueTable: '',
      sort: 0,
      showItem: 6, // so phan tu tren 1 trang
      pageCount: 0, // tong so trang
      pageCurrent: 1, // trang hien tai
      assetInPage: [], // asset cua 1 trang
      assets: [],
      deleteObj: {},
      json_fields: {
        'ID': 'id',
        'Code': 'asset_code',
        'Type': 'asset_type',
        'Information': 'asset_info',
        'Information (JP)': 'asset_info_jp',
        'Purpose': 'purpose',
        'Serial Number': 'serial_number',
        'Start Date': 'started_date',
        'Status': 'status',
        'Manager': 'manager',
        'Owner': 'owner',
        'Note': 'note',
        'Confirm': 'confirm',
        'Created At': 'created',
        'Updated At': 'updated'
        },
        json_meta: [
          [
            {
              'key': 'charset',
              'value': 'utf-8'
            }
          ]
        ],
    
    };
  },
  methods: {
    initValue(assets){
      this.pageCount = Math.ceil(assets.length/this.showItem)
      this.assetInPage = assets.slice(this.showItem*(this.pageCurrent-1), this.showItem*this.pageCurrent)
    },
    clickCallback(pageNum) {
      this.pageCurrent = pageNum
      this.initValue(this.assets)
    },
    onDelete() {
      axios.delete("/assets/" + this.deleteObj.id,
      {
        data: {
          email: this.email
        }
      }).then(res => {
        if(res.data.error){
          alert('You are not admin')
          console.log('you not admin')
        } else {
          for (let i = 0; i < this.assets.length; i++) {
            if (this.assets[i].id == this.deleteObj.id) {
              this.assets.splice(i, 1);
            }
          }
          this.deleteObj = {};
          this.initValue(this.assets)
        }
      });
    },
    sortFunc() {
      if(this.sort % 2 == 0){
        this.assets = this.assets.sort((a,b) => {
          const codeA = a.asset_code.toUpperCase()
          const codeB = b.asset_code.toUpperCase()
          if( codeA < codeB){
            return -1;
          }
          if( codeA > codeB){
            return 1;
          }
          return 0;
        })
        this.initValue(this.assets)
      }
      else if( this.sort % 2 == 1){
        this.assets = this.assets.sort((a,b) => {
          const codeA = a.asset_code.toUpperCase()
          const codeB = b.asset_code.toUpperCase()
          if( codeA < codeB){
            return 1;
          }
          if( codeA > codeB){
            return -1;
          }
          return 0;
        })
        this.initValue(this.assets)
      }

      this.sort++;
    },
    keyupSearch() {
      const arraySearch = []
      this.assets.forEach(item => {
        if(item.asset_code.toUpperCase().includes(this.searchValueTable.toUpperCase())){
          arraySearch.push(item)
        }
      });
      this.initValue(arraySearch)
    }
  },
  mounted() {
    axios
      .get("/assets")
      .then(response => {
        this.assets = response.data.data;
        this.initValue(this.assets)
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
.sort:hover {
  cursor: pointer;
}
</style>
