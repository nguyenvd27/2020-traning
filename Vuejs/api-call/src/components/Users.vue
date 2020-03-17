<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="user in datas" v-bind:key="user.id">ID: {{user.id}}, Name: {{user.name}}</li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data () {
    return {
      title: 'Users',
      datas: [],
      errors: []
    }
  },
  created() {
    // const url1 = 'https://599f807effe73c0011b9fcc5.mockapi.io/api/user'
    // const url2 = 'https://nguyenvd27-ltct-demo.herokuapp.com/api/products'
    this.$http.get('https://nguyenvd27-ltct-demo.herokuapp.com/api/products/')
    .then(response => {
      this.datas = response.data.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style>

</style>
