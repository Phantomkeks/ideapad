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
          :icon="noteType === noteTypes.Default ? 'format_list_bulleted' : 'notes'"
          @click="changeNoteType(noteType === noteTypes.Default ? noteTypes.Checkbox : noteTypes.Default)"
          v-if="bOverviewMoreButtons"
        />

        <q-btn
          flat
          dense
          round
          icon="more_vert"
          v-if="bOverviewMoreButtons || bTrashMoreButtons"
        >
          <q-menu persistent auto-close>
            <q-list style="min-width: 100px" v-if="bOverviewMoreButtons">
              <q-item clickable @click="onCopyNoteCLick">
                <q-item-section avatar>
                  <q-icon name="file_copy"/>
                </q-item-section>
                <q-item-section>
                  {{ $t('menuItem.copy') }}
                </q-item-section>
              </q-item>
              <q-item clickable @click="onDeleteNoteCLick">
                <q-item-section avatar>
                  <q-icon name="delete"/>
                </q-item-section>
                <q-item-section>
                  {{ $t('menuItem.delete') }}
                </q-item-section>
              </q-item>
            </q-list>

            <q-list style="min-width: 100px" v-if="bTrashMoreButtons">
              <q-item clickable @click="onRestoreClick">
                <q-item-section avatar>
                  <q-icon name="restore"/>
                </q-item-section>
                <q-item-section>
                  {{ $t('menuItem.restore') }}
                </q-item-section>
              </q-item>
              <q-item clickable @click="openConfirmDialog">
                <q-item-section avatar>
                  <q-icon name="delete"/>
                </q-item-section>
                <q-item-section>
                  {{ $t('menuItem.permDelete') }}
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
      bOverviewMoreButtons: false,
      bTrashMoreButtons: false,
      noteTypes: this.$noteTypes
    }
  },
  watch: {
    '$route': {
      handler: function (oRoute) {
        const sId = oRoute.params.id

        if (oRoute.fullPath.indexOf('/notes/') !== -1) {
          this.$store.getters.getSingleNote(sId) ? this.bOverviewMoreButtons = true : this.bOverviewMoreButtons = false
        } else if (oRoute.fullPath.indexOf('/deletedNotes/') !== -1) {
          this.$store.getters.getSingleDeletedNote(sId) ? this.bTrashMoreButtons = true : this.bTrashMoreButtons = false
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onBackButtonClick () {
      this.$router.go(-1)
    },
    onCopyNoteCLick () {
      this.$store.commit({
        type: 'copyNote',
        sNoteId: this.$route.params.id
      })

      this.$router.push('/notes')
    },
    onDeleteNoteCLick () {
      this.$store.commit({
        type: 'removeNote',
        sNoteId: this.$route.params.id
      })

      this.$router.push('/notes')
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
    },
    openConfirmDialog () {
      this.$q.dialog({
        title: this.$t('alertDialog.permanentDeleteTitle'),
        message: this.$t('alertDialog.permanentDeleteMessage'),
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.onPermanentlyDelete()
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    changeNoteType (sNoteType) {
      this.$store.commit({
        type: 'changeNoteType',
        sNoteId: this.$route.params.id,
        sNoteType: sNoteType
      })
    }
  },
  computed: {
    noteType: function () {
      return this.bOverviewMoreButtons ? this.$store.getters.getSingleNote(this.$route.params.id).type : undefined
    }
  }
}
</script>

<style lang="stylus" scoped>
  // $

  .gradient {
    headerGradient();
  }
</style>
