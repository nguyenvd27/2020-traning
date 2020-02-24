<template>
  <div>
    <h1>User Detail</h1>
    <p>ID: {{ id }}</p>
    <!-- <router-link
      tag="button"
      class="btn btn-info"
      v-bind:to="'/user/' + $route.params.id + '/edit'">
        Edit User
      </router-link> -->
      <router-link
        tag="button"
        class="btn btn-info"
        v-bind:to="{ name: 'useredit', params: { id: id} }">
          Edit User
        </router-link>
  </div>
</template>

<script>
export default {
  name: 'user-detail',
  data () {
    return {
      id: this.$route.params.id
    }
  }
}
</script>

<style>

</style>
