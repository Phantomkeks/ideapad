<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="gradient">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="onBackButtonClick"
          icon="arrow_back"
        />

        <q-toolbar-title>
          Mini-Memo
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="more_vert"
        >
          <q-menu persistent auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable @click="onRestoreClick">
                <q-item-section avatar>
                  <q-icon name="restore"/>
                </q-item-section>
                <q-item-section>
                  Restore
                </q-item-section>
              </q-item>
              <q-item clickable @click="onPermanentlyDelete">
                <q-item-section avatar>
                  <q-icon name="delete"/>
                </q-item-section>
                <q-item-section>
                  Permanently Delete
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'DetailLayout',
  methods: {
    onBackButtonClick () {
      this.$router.go(-1)
    },
    onRestoreClick () {
      this.$store.commit({
        type: 'restoreNote',
        sNoteId: this.$route.params.id
      })

      this.$router.push('/trash')
    },
    onPermanentlyDelete () {
      this.$store.commit({
        type: 'deleteNote',
        sNoteId: this.$route.params.id
      })

      this.$router.push('/trash')
    }
  }
}
</script>

<style lang="stylus">
@import '~quasar-variables'
.gradient
  headerGradient()
</style>
