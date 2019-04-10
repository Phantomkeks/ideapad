<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate () {
    this.$store.commit('initialiseStore')
  }
}
</script>

<style lang="stylus">
  @import '~quasar-variables'
  body
    background-color: $grey-2
</style>
