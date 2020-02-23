<template>
  <header>
    <h1>{{titleHeader}}
      <br>
      <button v-on:click="changeTitleHeader">Thay đổi title bằng Component Header</button>
    </h1>
  </header>
</template>

<script>
export default {
  name: 'component-header',
  props: {
    titleHeader: String
  },
  data: function() {
    return {
      text: 'Header Text'
    }
  },
  methods: {
    changeTitleHeader(e) {
      var data = {
        title: 'Vu Duc Nguyen -> data truyen qua bien event'
      }
      this.$emit('changeTitleEvent', data)
    }
  }
}
</script>

<style>

</style>
