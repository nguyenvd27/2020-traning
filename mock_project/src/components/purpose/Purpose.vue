<template>
  <div class="">
    <h2 class="text-center">Purpose Manager</h2>
    <div>
      <button
        type="button"
        class="btn btn-success"
        data-toggle="modal"
        data-target="#addModal"
        data-whatever="@mdo"
      > <i class="fas fa-plus"></i> Add Purpose</button>

      <div
        class="modal fade"
        id="addModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addModalLabel">New Purpose</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="name" class="col-form-label">Name: {{addObj.name}}</label>
                  <input type="text" class="form-control" id="name" v-model="addObj.name">
                </div>
                <div class="form-group">
                  <label for="creator-email" class="col-form-label">Creator Email: {{addObj.email}}</label>
                  <input type="text" class="form-control" id="creator-email" v-model="addObj.email">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >Cancel</button>
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                v-on:click="onAdd()"
              >Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Creator Email</th>
          <th scope="col">Created At</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in purposes" :key="index">
          <th scope="row">{{index}}</th>
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.email}}</td>
          <td>{{item.created}}</td>
          <td>
            <!-- Button to Open the Modal -->
            <i class="far fa-edit" data-toggle="modal"
              data-target="#updateModal"
              data-whatever="@mdo"
              style="color:blue"
              v-on:click="updateObj=item"></i>
              &nbsp; &nbsp;
            <div
              class="modal fade"
              id="updateModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="updateModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="updateModalLabel">Edit Asset Type</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <label for="id-update" class="col-form-label">ID:</label>
                        <input
                          type="text"
                          class="form-control"
                          id="id-update"
                          disabled
                          v-model="updateObj.id"
                        >
                      </div>
                      <div class="form-group">
                        <label for="name" class="col-form-label">Name:</label>
                        <input type="text" class="form-control" id="name" v-model="updateObj.name">
                      </div>
                      <div class="form-group">
                        <label for="creator-email" class="col-form-label">Creator Email:</label>
                        <input
                          type="text"
                          class="form-control"
                          id="creator-email"
                          v-model="updateObj.email"
                        >
                      </div>
                      <div class="form-group">
                        <label for="created-at" class="col-form-label">Created At:</label>
                        <input
                          type="text"
                          class="form-control"
                          id="created-at"
                          disabled
                          v-model="updateObj.created"
                        >
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >Cancel</button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-dismiss="modal"
                      v-on:click="onUpdate()"
                    >Update</button>
                  </div>
                </div>
              </div>
            </div>

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
import axios from '../../callApi/Api';
export default {
  data (){
    return {
      purposes: [],
      addObj: {},
      updateObj: {},
      deleteObj: {}
    }
  },
  methods: {
    onAdd() {
      axios
        .post("/purposes", {
          name: this.addObj.name,
          email: this.addObj.email
        })
        .then(res => {
          this.purposes.push(res.data.data);
          this.addObj = {};
        });
    },
    onUpdate() {
      axios
        .put("/purposes/" + this.updateObj.id, {
          name: this.updateObj.name,
          email: this.updateObj.email
        })
        .then(res => {
          for (let i = 0; i < this.purposes.length; i++) {
            if (this.purposes[i].id == this.updateObj.id) {
              this.purposes[i] = this.updateObj;
            }
          }
          this.updateObj = {};
        });
    },
    onDelete() {

    }
  },
  mounted() {
    axios
      .get("/purposes")
      .then(response => {
        console.log(response.data.data);
        this.purposes = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>

 <style>
.far:hover {
  cursor: pointer;
}
 </style>
