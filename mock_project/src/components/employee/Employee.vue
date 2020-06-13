<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>{{$t('employees')}} &nbsp;
              <router-link class="btn btn-success btn-sm" to="/employees/new">
                <i class="fas fa-plus"></i> {{$t('add')}}
              </router-link>
            </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">{{$t('home')}}</router-link>
              </li>
              <li class="breadcrumb-item active">{{$t('employees')}}</li>
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
              <div class="card">
                <!-- card-header -->
                <div class="card-header">
                  <div class="card-tools">
                    <div class="input-group input-group-sm" style="width: 150px;">
                      <input 
                        type="text" 
                        name="table_search" 
                        class="form-control float-right" 
                        v-model="searchValueTable"
                        v-on:keyup="keyupSearch" 
                        :placeholder="$t('search')"
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
                        <th>#</th>
                        <th>{{$t('name')}} <span class="float-right sort"><i class="fas fa-sort"  v-on:click="sortFunc"></i></span></th>
                        <th>{{$t('email')}} <span class="float-right sort"><i class="fas fa-sort"></i></span></th>
                        <th>{{$t('phoneNumber')}} <span class="float-right sort"><i class="fas fa-sort"></i></span></th>
                        <th>{{$t('address')}} <span class="float-right sort"><i class="fas fa-sort"></i></span></th>
                        <th>{{$t('sex')}} <span class="float-right sort"><i class="fas fa-sort"></i></span></th>
                        <th>{{$t('action')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in employeeInPage" :key="index">
                        <th scope="row">{{(index+1)+((pageCurrent-1)*showItem)}}</th>
                        <td>{{item.name}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.phone_number}}</td>
                        <td>{{item.address}}</td>
                        <td v-if="item.sex==1">{{$t('male')}}</td>
                        <td v-else-if="item.sex==2">{{$t('female')}}</td>
                        <td class="py-0 align-middle">
                          <div class="btn-group btn-group-sm">
                            <router-link :to="'/employees/'+item.id" class="btn btn-primary"><i class="fas fa-eye"></i></router-link>
                            <router-link :to="'/employees/'+item.id" class="btn btn-info"><i class="fas fa-pencil-alt"></i></router-link>
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

import Paginate from 'vuejs-paginate'

export default {
  components: {
    Paginate: Paginate
  },
  data() {
    return {
      searchValueTable: '',
      sort: 0,
      showItem: 6, // so phan tu tren 1 trang
      pageCount: 0, // tong so trang
      pageCurrent: 1, // trang hien tai
      employeeInPage: [], // asset cua 1 trang
      employees: [],
      deleteObj: {}
    };
  },
  methods: {
    initValue(employees){
      this.pageCount = Math.ceil(employees.length/this.showItem)
      this.employeeInPage = employees.slice(this.showItem*(this.pageCurrent-1), this.showItem*this.pageCurrent)
    },
    clickCallback(pageNum) {
      this.pageCurrent = pageNum
      this.initValue(this.employees)
    },
    onDelete() {
      axios.delete("/employees/" + this.deleteObj.id).then(response => {
        for(let i = 0; i < this.employees.length; i++){
          if(this.employees[i].id == this.deleteObj.id){
            this.employees.splice(i, 1)
          }
        }
        this.deleteObj = {}
        this.initValue(this.employees)
      });
    },
    sortFunc() {
      if(this.sort % 2 == 0){
        this.employees = this.employees.sort((a,b) => {
          const codeA = a.name.toUpperCase()
          const codeB = b.name.toUpperCase()
          if( codeA < codeB){
            return -1;
          }
          if( codeA > codeB){
            return 1;
          }
          return 0;
        })
        this.initValue(this.employees)
      }
      else if( this.sort % 2 == 1){
        this.employees = this.employees.sort((a,b) => {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()
          if( nameA < nameB){
            return 1;
          }
          if( nameA > nameB){
            return -1;
          }
          return 0;
        })
        this.initValue(this.employees)
      }

      this.sort++;
    },
    keyupSearch() {
      const arraySearch = []
      this.employees.forEach(item => {
        if(item.name.toUpperCase().includes(this.searchValueTable.toUpperCase())){
          arraySearch.push(item)
        }
      });
      this.initValue(arraySearch)
    }
  },
  mounted() {
    axios
      .get("/employees")
      .then(response => {
        this.employees = response.data.data;
        this.initValue(this.employees)
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
