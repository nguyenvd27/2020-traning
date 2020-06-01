<template>
  <div>
    <h2 class="text-center">Asset Manager</h2>
    <router-link :to="'/assets/new'">
      <button class="btn btn-success"> <i class="fas fa-plus"></i> Add Asset</button></router-link>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <!-- <th scope="col">ID</th> -->
          <th scope="col">Asset Code</th>
          <th scope="col">Asset Type</th>
          <th scope="col">Purpose</th>
          <th scope="col">Status</th>
          <th scope="col">Manager</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in assets" :key="index">
          <th scope="row">{{index}}</th>
          <!-- <td>{{item.id}}</td> -->
          <td>{{item.asset_code}}</td>
          <td>{{item.asset_type}}</td>
          <td>{{item.purpose}}</td>
          <td v-if="item.status==0">not use</td>
          <td v-else-if="item.status==1">in use</td>
          <td>{{item.manager}}</td>

          <td>
          <router-link :to="'/assets/'+item.id"><i class="fas fa-info"></i></router-link>
          &nbsp; &nbsp;
          <!-- Button to Open the Modal -->
            <i class="far fa-trash-alt" data-toggle="modal"
              data-target="#myModal" style="color:red"
              v-on:click="deleteObj=item"></i>
            <!-- The Modal -->
            <div class="modal" id="myModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <!-- Modal Header -->
                  <div class="modal-header">
                    <h5 class="modal-title">Are you sure you want to delete ?</h5>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>

                  <!-- Modal footer -->
                  <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="onDelete()" >Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "../../callApi/Api";
import EventBus from "../EventBus";

export default {
  data() {
    return {
      assets: [],
      deleteObj: {}
    };
  },
  methods: {
    onDelete() {
      axios.delete("/assets/" + this.deleteObj.id).then(response => {
        for(let i = 0; i < this.assets.length; i++){
          if(this.assets[i].id == this.deleteObj.id){
            this.assets.splice(i, 1)
          }
        }
        this.deleteObj = {}
      });
    }
  },
  mounted() {
    axios
      .get("/assets")
      .then(response => {
        console.log(response.data.data);
        this.assets = response.data.data;
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
