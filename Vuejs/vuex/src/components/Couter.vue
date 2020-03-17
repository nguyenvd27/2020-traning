<template>
  <div>
    <button class="btn btn-danger" v-on:click="increment">Tăng</button>
    <button class="btn btn-danger" v-on:click="decrement">Giản</button>
  </div>
</template>

<script>
export default {
  methods: {
    increment () {
      // this.$store.state.result++;
      // this.$store.commit('increment', 50) // mutation
      this.$store.dispatch('increment')
    },
    decrement () {
      this.$store.state.result--;
    }
  }
}
</script>

<style>

</style>
