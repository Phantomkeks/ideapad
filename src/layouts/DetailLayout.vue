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
          {{ $t('appTitle') }}
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="more_vert"
          v-if="bShowMoreButtons"
        >
          <q-menu persistent auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable @click="onDeleteNoteCLick">
                <q-item-section avatar>
                  <q-icon name="delete"/>
                </q-item-section>
                <q-item-section>
                  {{ $t('menuItem.delete') }}
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
  data () {
    return {
      bShowMoreButtons: false
    }
  },
  watch: {
    '$route.params.id': {
      handler: function (sId) {
        const bNoteAvailable = this.$store.getters.getSingleNote(sId)

        if (bNoteAvailable) {
          this.bShowMoreButtons = true
        } else {
          this.bShowMoreButtons = false
        }

        console.log(this.bShowMoreButtons)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onBackButtonClick () {
      this.$router.go(-1)
    },
    onDeleteNoteCLick () {
      this.$store.commit({
        type: 'removeNote',
        sNoteId: this.$route.params.id
      })

      this.$router.push('/notes')
    }
  }
}
</script>

<style lang="stylus">
@import '~quasar-variables'
.gradient
  headerGradient()
</style>
