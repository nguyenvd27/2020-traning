<template>
  <div>
    <h2 class="text-center">New Asset</h2>

    <br>
    <form>
      <div class="row">
        <div class="col-sm-2">
          <router-link to="/assets">
            <button type="button" class="btn btn-outline-primary">
              <i class="fas fa-long-arrow-alt-left"></i>
            </button>
          </router-link>
        </div>
        <div class="col-sm-2">
          <button class="btn btn-success" v-on:click="onCreate()">Create</button>
        </div>
      </div>
      <br>
      <div class="form-group row">
        <label for="asset-code" class="col-sm-2 col-form-label">Code</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="asset-code"
            required
            v-model="asset.asset_code"
          >
        </div>
      </div>
      
      <div class="form-group row">
        <label for="asset-type" class="col-sm-2 col-form-label">Type</label>
        <div class="col-sm-10">
          <select class="custom-select" required v-model="asset.asset_type">
            <option disabled value>Please select one</option>
            <option v-for="(item, index) in assetTypes" v-bind:key="index">{{item.name}}</option>
          </select>
        </div>
      </div>

      <div class="form-group row">
        <label for="asset-info" class="col-sm-2 col-form-label">Information</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="asset-info"
            required
            v-model="asset.asset_info"
          >
        </div>
      </div>
      <div class="form-group row">
        <label for="asset-info-jp" class="col-sm-2 col-form-label">Information (JP)</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="asset-info-jp" v-model="asset.asset_info_jp">
        </div>
      </div>

      <div class="form-group row">
        <label for="purpose" class="col-sm-2 col-form-label">Purpose</label>
        <div class="col-sm-10">
          <select class="custom-select" required v-model="asset.purpose">
            <option disabled value>Please select one</option>
            <option v-for="(item, index) in purposes" v-bind:key="index">{{item.name}}</option>
          </select>
        </div>
      </div>

      <div class="form-group row">
        <label for="serial-number" class="col-sm-2 col-form-label">Serial number</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="serial-number"
            required
            v-model="asset.serial_number"
          >
        </div>
      </div>
      <div class="form-group row">
        <label for="started-date" class="col-sm-2 col-form-label">Started date</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="started-date" v-model="asset.started_date">
        </div>
      </div>

      <div class="form-group row">
        <label for="status" class="col-sm-2 col-form-label">Status</label>
        <div class="col-sm-10">
          <input type="radio" id="status-in-use" value="1" v-model="asset.status">
          <label for="status-in-use">in use</label>
          &nbsp; &nbsp;
          <input
            type="radio"
            id="status-not-use"
            value="0"
            checked
            v-model="asset.status"
          >
          <label for="status-not-use">not use</label>
        </div>
      </div>

      <div class="form-group row">
        <label for="manager" class="col-sm-2 col-form-label">Manager</label>
        <div class="col-sm-10">
          <select class="custom-select" required v-model="asset.manager">
            <option disabled value>Please select one</option>
            <option v-for="(item, index) in employees" v-bind:key="index">{{item.name}}</option>
          </select>
        </div>
      </div>

      <div class="form-group row">
        <label for="owner" class="col-sm-2 col-form-label">Owner</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="owner" required v-model="asset.owner">
        </div>
      </div>
      <div class="form-group row">
        <label for="note" class="col-sm-2 col-form-label">Note</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="note" v-model="asset.note">
        </div>
      </div>
      <!-- <div id="create-button">
        <button class="btn btn-success" v-on:click="onCreate()">Create</button>
      </div>-->
    </form>
  </div>
</template>

<script>
import axios from "../../callApi/Api";
import EventBus from "../EventBus";

export default {
  data() {
    return {
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
      errors: 0,
      purposes: [],
      employees: [],
      assetTypes: []
    };
  },
  methods: {
    onCreate() {
      this.errors = 0;
      if (this.asset.asset_code == "" || this.asset.asset_code == null) {
        this.errors++;
      }
      if (this.asset.asset_type == "" || this.asset.asset_type == null) {
        this.errors++;
      }
      if (this.asset.asset_info == "" || this.asset.asset_info == null) {
        this.errors++;
      }
      if (this.asset.purpose == "" || this.asset.purpose == null) {
        this.errors++;
      }
      if (this.asset.serial_number == "" || this.asset.serial_number == null) {
        this.errors++;
      }
      if (this.asset.manager == "" || this.asset.manager == null) {
        this.errors++;
      }
      if (this.asset.owner == "" || this.asset.owner == null) {
        this.errors++;
      }
      console.log(this.errors);
      if (this.errors == 0) {
        axios
          .post("/assets", {
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
            this.$router.push({ name: "asset", path: "/assets" });
          })
          .catch(error => {
            console.log(error);
          });
      }
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

<style>
.far:hover {
  cursor: pointer;
}
#create-button {
  display: flex;
  justify-content: center;
}
</style>
