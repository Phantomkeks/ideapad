<template>
  <q-page>
  </q-page>
</template>

<style lang="stylus" scoped>
</style>

<script>
export default {
  name: 'Auth',
  beforeRouteEnter (to, from, next) {
    if (to.params.access && !/error/.test(to.params.access)) {
      let aAccessArray = to.params.access.split('&')
      let oAccessObject = {
        accessToken: aAccessArray[0].split('access_token=')[1],
        token_type: aAccessArray[1].split('token_type=')[1],
        uid: aAccessArray[2].split('uid=')[1],
        account_id: aAccessArray[3].split('account_id=')[1]
      }

      next(vm => {
        vm.$store.commit({
          type: 'updateDropboxToken',
          dropboxToken: oAccessObject.accessToken
        })

        vm.$router.push('settings/cloud')
      })
    } else {
      next(vm => {
        vm.$router.push('settings')
      })
    }
  }
}
</script>
