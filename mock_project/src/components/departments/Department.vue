<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>{{$t('departments')}} &nbsp;
              <button class="btn btn-success btn-sm" data-toggle="modal" data-target="#addModal" data-whatever="@mdo">
                <i class="fas fa-plus"></i> {{$t('add')}}
              </button>
            </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">{{$t('home')}}</router-link>
              </li>
              <li class="breadcrumb-item active">{{$t('departments')}}</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <!-- Add modal -->
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addModalLabel">{{$t('new')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="name-add" class="col-form-label">{{$t('name')}}: {{addObj.name}}</label>
                <input type="text" class="form-control" id="name-add" required v-model="addObj.name">
              </div>
              <div class="form-group">
                <label for="creator-email-add" class="col-form-label">{{$t('creatorEmail')}}: {{addObj.email}}</label>
                <input type="text" class="form-control" id="creator-email-add" disabled v-model="addObj.email">
              </div>
              <hr>
              <div class="float-right">
                <button class="btn btn-secondary" data-dismiss="modal">{{$t('cancel')}}</button>
                <button v-if="addObj.name==''" class="btn btn-primary">{{$t('add')}}</button>
                <button v-else class="btn btn-primary" data-dismiss="modal" v-on:click="onAdd">{{$t('add')}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>


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
                      <input type="text" name="table_search" class="form-control float-right" :placeholder="$t('search')">
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
                        <th >ID</th>
                        <th >{{$t('name')}}</th>
                        <th >{{$t('creatorEmail')}}</th>
                        <th >{{$t('created')}}</th>
                        <th >{{$t('action')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in departments" :key="index">
                        <th scope="row">{{index}}</th>
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.created}}</td>
                        <td class="py-0 align-middle">
                          <div class="btn-group btn-group-sm">
                            <button class="btn btn-primary" data-toggle="modal" data-target="#updateModal" data-whatever="@mdo"
                              v-on:click="updateObj=item" >
                              <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" data-whatever="@mdo"
                              v-on:click="deleteObj=item">
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
                  <ul class="pagination pagination-sm m-0 float-right">
                    <li class="page-item"><a class="page-link" href="#">&laquo;</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>
                  </ul>
                </div>
                <!-- Update Modal -->
                <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="updateModalLabel">{{$t('edit')}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="form-group">
                            <label for="id-update" class="col-form-label">ID:</label>
                            <input type="text" class="form-control" id="id-update" disabled v-model="updateObj.id">
                          </div>
                          <div class="form-group">
                            <label for="name" class="col-form-label">{{$t('name')}}:</label>
                            <input type="text" class="form-control" id="name" v-model="updateObj.name">
                          </div>
                          <div class="form-group">
                            <label for="creator-email" class="col-form-label">{{$t('creatorEmail')}}:</label>
                            <input type="text" class="form-control" id="creator-email" disabled v-model="updateObj.email">
                          </div>
                          <div class="form-group">
                            <label for="created-at" class="col-form-label">{{$t('created')}}:</label>
                            <input type="text" class="form-control" id="created-at" disabled v-model="updateObj.created">
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('cancel')}}</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="onUpdate()">{{$t('update')}}</button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Delete Modal -->
                <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="deleteModalLabel">{{$t('deleteMsg')}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-dismiss="modal">{{$t('cancel')}}</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="onDelete()" >{{$t('delete')}}</button>
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

import jwtDecode from 'jwt-decode'
import VueCookie from 'vue-cookie'

export default {
  data() {
    const token = VueCookie.get('usertoken')
    const decoded = jwtDecode(token)
    return {
      departments: [],
      addObj: {
        name: '',
        email: decoded.email
      },
      updateObj: {},
      deleteObj: {},
      errors: 0
    };
  },
  methods: {
    onAdd() {
      axios
      .post("/departments", {
        name: this.addObj.name,
        email: this.addObj.email
      })
      .then(res => {
        this.departments.push(res.data.data);
        this.addObj.name = '';
      });
    },
    onUpdate() {
      axios
        .put("/departments/" + this.updateObj.id, {
          name: this.updateObj.name,
          email: this.updateObj.email
        })
        .then(res => {
          for (let i = 0; i < this.departments.length; i++) {
            if (this.departments[i].id == this.updateObj.id) {
              this.departments[i] = this.updateObj;
            }
          }
          this.updateObj = {};
        });
    },

    onDelete() {
      axios.delete("/departments/" + this.deleteObj.id).then(response => {
        for(let i = 0; i < this.departments.length; i++){
          if(this.departments[i].id == this.deleteObj.id){
            this.departments.splice(i, 1)
          }
        }
        this.deleteObj = {}
      });
    }
  },
  mounted() {
    axios
      .get("/departments")
      .then(response => {
        this.departments = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
