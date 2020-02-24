<template>
  <div class="mt-3">
    <h1 class="text-center">User Management</h1>
    <p class="text-center">This is area manage user of website</p>
    <button class="btn btn-success btn-block" v-on:click="backHome">Back Home</button>
    <!-- <button class="btn btn-warning btn-block" v-on:click="goToUserDetail" >Go to User Detail</button> -->
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'user',
  methods: {
    backHome () {
      // this.$router.push('/')
      this.$router.push({ name: 'homepage'})
    },
    goToUserDetail () {
      this.$router.push('/user/1')
    }
  }
}
</script>

<style>

</style>
