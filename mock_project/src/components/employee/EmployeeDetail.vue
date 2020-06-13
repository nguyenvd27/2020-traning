<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>{{$t('employeeDetail')}}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">{{$t('home')}}</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/employees">{{$t('employees')}}</router-link>
              </li>
              <li class="breadcrumb-item active">{{employee.id}}</li>
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
            <div class="card card-warning">
              <form class="form-horizontal" v-on:submit.prevent="onUpdate">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-5">
                      <div class="form-group row">
                        <label for="employee-id" class="col-sm-4 col-form-label">ID</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="employee-id" disabled v-model="employee.id">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="name" class="col-sm-4 col-form-label">{{$t('name')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="name" v-model="employee.name">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="email" class="col-sm-4 col-form-label">{{$t('email')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="email" disabled v-model="employee.email">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="phone_number" class="col-sm-4 col-form-label">{{$t('phoneNumber')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="phone_number" v-model="employee.phone_number">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="address" class="col-sm-4 col-form-label">{{$t('address')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="address" v-model="employee.address">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="sex" class="col-sm-4 col-form-label">{{$t('sex')}}</label>
                        <div class="col-sm-8">
                          <input type="radio" id="sex-male" value="1" v-model="employee.sex">
                          <label for="sex-male">{{$t('male')}}</label>
                          &nbsp; &nbsp;
                          <input type="radio" id="sex-female" value="4" v-model="employee.sex">
                          <label for="sex-female">{{$t('female')}}</label>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="marital_status" class="col-sm-4 col-form-label">{{$t('maritalStatus')}}</label>
                        <div class="col-sm-8">
                          <input type="radio" id="single" value="1" v-model="employee.marital_status">
                          <label for="single">{{$t('single')}}</label>
                          &nbsp; &nbsp;
                          <input type="radio" id="married" value="4" v-model="employee.marital_status">
                          <label for="married">{{$t('married')}}</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-5">
                      <div class="form-group row">
                        <label for="home_town" class="col-sm-4 col-form-label">{{$t('homeTown')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="home_town" v-model="employee.home_town">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="id_card" class="col-sm-4 col-form-label">{{$t('idCard')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="id_card" v-model="employee.id_card">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="permanent_residence" class="col-sm-4 col-form-label">{{$t('permanentResidence')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="permanent_residence" v-model="employee.permanent_residence">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="role" class="col-sm-4 col-form-label">{{$t('role')}}</label>
                        <div class="col-sm-8">
                          <select class="custom-select" v-model="employee.role">
                            <option v-for="(item, index) in roles" v-bind:key="index">{{item.name}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="creator_email" class="col-sm-4 col-form-label">{{$t('creatorEmail')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="creator_email" disabled v-model="employee.creator_email">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="created" class="col-sm-4 col-form-label">{{$t('created')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="created" disabled v-model="employee.created">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="updated" class="col-sm-4 col-form-label">{{$t('updated')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="updated" disabled v-model="employee.updated">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer text-center">
                  <button class="btn btn-warning" type="submit">{{$t('update')}}</button>
                </div>
                <!-- /.card-footer -->
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

export default {
  data() {
    return {
      id: this.$route.params.id,
      employee: {},
      roles: []
    };
  },
  methods: {
    onUpdate() {
      axios
        .put("/employees/" + this.id, {
          name: this.employee.name,
          phone_number: this.employee.phone_number,
          address: this.employee.address,
          sex: this.employee.sex,
          marital_status: this.employee.marital_status,
          home_town: this.employee.home_town,
          id_card: this.employee.id_card,
          permanent_residence: this.employee.permanent_residence,
          role: this.employee.role
        })
        .then(res => {
          const today = new Date();
          this.employee.updated = today;
          alert("Update successful");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    axios
      .get("/employees/" + this.id)
      .then(response => {
        this.employee = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("/employee-roles")
      .then(res => {
        this.roles = res.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
.far:hover {
  cursor: pointer;
}
</style>
