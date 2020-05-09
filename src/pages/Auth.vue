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
      const accessArray = to.params.access.split('&')

      if (accessArray.length <= 1) {
        next(vm => {
          vm.$router.push('error')
        })
        return
      }

      let accessObject = {
        accessToken: accessArray[0].split('access_token=')[1],
        token_type: accessArray[1].split('token_type=')[1],
        uid: accessArray[2].split('uid=')[1],
        account_id: accessArray[3].split('account_id=')[1]
      }

      next(vm => {
        vm.$store.commit({
          type: 'updateDropboxToken',
          dropboxToken: accessObject.accessToken
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
