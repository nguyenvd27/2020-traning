<template>
  <div class="user">
    <p>ID: {{ user.id }}, Email: {{ user.email }}
      <button v-on:click="handleDelete">Delete</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'user',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleDelete(e){
      var data = {
        id: this.user.id
      }
      this.$emit('deleteUser', data)
    }
  }
}
</script>

<style>

</style>
