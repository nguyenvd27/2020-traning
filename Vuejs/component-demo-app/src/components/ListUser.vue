<template>
  <div class="list-user">
    <p>List User Component</p>
    <user
      v-for="user in listUser"
      v-bind:key="user.id"
      v-bind:user="user"
      v-on:deleteUser="deleteUser"
    ></user>
  </div>
</template>

<script>
import User from './User.vue'
export default {
  name: 'list-user',
  props: {
    listUser: {
      type: Array,
      default: []
    }
  },
  data() {
    return {

    }
  },
  components: {
    User
  },
  methods: {
    deleteUser(data) {
      this.$emit('deleteUserEvent', data)
    }
  }
}
</script>

<style>

</style>
