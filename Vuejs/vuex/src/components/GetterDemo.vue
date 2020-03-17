<template>
  <div>
    <p>This is result (Getter): {{ tenResult }} </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['tenResult'])
  }
}
</script>

<style>

</style>
