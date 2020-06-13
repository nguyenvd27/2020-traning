<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>{{$t('assetDetail')}}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">{{$t('home')}}</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/assets">{{$t('assets')}}</router-link>
              </li>
              <li class="breadcrumb-item active">{{asset.id}}</li>
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
              <!-- form start -->
              <form class="form-horizontal" v-on:submit.prevent="onUpdate">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-5">
                      <div class="form-group row">
                        <label for="asset-id" class="col-sm-4 col-form-label">ID</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="asset-id" disabled v-model="asset.id">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="asset-code" class="col-sm-4 col-form-label">{{$t('code')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="asset-code" v-model="asset.asset_code">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="asset-type" class="col-sm-4 col-form-label">{{$t('type')}}</label>
                        <div class="col-sm-8">
                          <select class="custom-select" v-model="asset.asset_type">
                            <option v-for="(item, index) in assetTypes" v-bind:key="index">{{item.name}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="asset-info" class="col-sm-4 col-form-label">{{$t('info')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="asset-info" v-model="asset.asset_info">
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
                          <select class="custom-select" v-model="asset.purpose">
                            <option v-for="(item, index) in purposes" v-bind:key="index">{{item.name}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="serial-number" class="col-sm-4 col-form-label">{{$t('serialNumber')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="serial-number" v-model="asset.serial_number">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="started-date" class="col-sm-4 col-form-label">{{$t('startedDate')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="started-date" v-model="asset.started_date">
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-5">
                      <div class="form-group row">
                        <label for="status" class="col-sm-4 col-form-label">{{$t('status')}}</label>
                        <div class="col-sm-8">
                          <input type="radio" id="status-in-use" value="1" v-model="asset.status">
                          <label for="status-in-use">in use</label>
                          &nbsp; &nbsp;
                          <input type="radio" id="status-not-use" value="0" v-model="asset.status">
                          <label for="status-not-use">not use</label>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="manager" class="col-sm-4 col-form-label">{{$t('manager')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="manager" disabled v-model="asset.manager">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="owner" class="col-sm-4 col-form-label">{{$t('owner')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="owner" v-model="asset.owner">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="note" class="col-sm-4 col-form-label">{{$t('note')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="note" v-model="asset.note">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="confirm" class="col-sm-4 col-form-label">{{$t('confirm')}}</label>
                        <div class="col-sm-8" v-if="asset.confirm == 1">
                          <input type="text" class="form-control" id="confirm" disabled value="OK">
                        </div>
                        <div class="col-sm-8" v-else-if="asset.confirm == 0">
                          <input type="text" class="form-control" id="confirm" disabled value="NOT OK">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="created" class="col-sm-4 col-form-label">{{$t('created')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="created" disabled v-model="asset.created">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="updated" class="col-sm-4 col-form-label">{{$t('updated')}}</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="updated" disabled v-model="asset.updated">
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-4"></div>
                        <button class="col-sm-4 btn btn-sm btn-warning" type="submit">{{$t('update')}}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div class="card-footer text-center">
                <!-- <button class="btn btn-success" v-on:click="handover">{{$t('handover')}}</button> -->
                <button class="btn btn-sm btn-success" data-toggle="modal" data-target="#addModal" data-whatever="@mdo">
                  {{$t('handover')}}
                </button>
              </div>
            </div>
            <!-- /.card -->
          </div>
          <!-- /.row -->
        </div>
      </div>
    </section>

    <!-- handover modal -->
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addModalLabel">{{$t('handover')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="comment" class="col-form-label">{{$t('comment')}}</label>
                <textarea class="form-control" id="comment" v-model="comment" :placeholder="$t('comment')"></textarea>
              </div>
              <div class="form-group">
                <label for="creator-email-add" class="col-form-label">{{$t('employees')}}</label>
                <select class="custom-select" v-model="toEmail">
                  <option disabled value>Please select one</option>
                  <option v-for="(item, index) in employees" v-bind:key="index">{{item.email}}</option>
                </select>
              </div>
              <hr>
            </form>
            <div class="float-right">
              <button class="btn btn-secondary" data-dismiss="modal">{{$t('cancel')}}</button>
              <button class="btn btn-primary" v-on:click="handover" data-dismiss="modal">{{$t('handover')}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../callApi/Api";
import EventBus from "../EventBus";

export default {
  data() {
    return {
      id: this.$route.params.id,
      asset: {},
      purposes: [],
      employees: [],
      assetTypes: [],
      toEmail: '',
      comment: ''
    };
  },
  methods: {
    handover(){
      // console.log('comment: ', this.comment)
      // console.log('email: ', this.toEmail)
      axios.post('/send-email', {
        email: this.toEmail,
        comment: this.comment,
        asset: this.asset
      })
      .then( res => {
        if(res.data.error != null){
          alert('send mail error!')
        }
        else if(res.data.info != null){
          alert('send mail successfull!')
        }
      })
    },
    onUpdate() {
      axios.put("/assets/" + this.id, {
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
        confirm: this.asset.confirm,
      })
      .then(res => {
        const today = new Date()
        this.asset.updated = today
        alert("Update successful")
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
  mounted() {
    axios
      .get("/assets/" + this.id)
      .then(response => {
        this.asset = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });

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

<style>
.far:hover {
  cursor: pointer;
}
</style>
