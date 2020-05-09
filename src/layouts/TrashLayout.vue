<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="gradient">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
        />
        <q-toolbar-title>
          {{ $t('navigation.trash') }}
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="more_vert"
          v-if="selectedNoteIds.length === 0 && deletedNotes.length > 0"
        >
          <q-menu auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable @click="openEmptyTrashConfirmDialog">
                <q-item-section avatar>
                  <q-icon name="delete"/>
                </q-item-section>
                <q-item-section>
                  {{ $t('menuItem.emptyTrash') }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn
          flat
          dense
          round
          icon="more_vert"
          v-if="selectedNoteIds.length > 0"
        >
          <q-badge color="red" floating transparent>
            {{ selectedNoteIds.length }}
          </q-badge>

          <q-menu auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable @click="onRestoreSelectedClick">
                <q-item-section avatar>
                  <q-icon name="restore"/>
                </q-item-section>
                <q-item-section>
                  {{ $t('menuItem.restore') }}
                </q-item-section>
              </q-item>
              <q-item clickable @click="openDeleteSelectedConfirmDialog">
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

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>
          {{ $t('navigation.title') }}
        </q-item-label>
        <q-item clickable to="/notes">
          <q-item-section avatar>
            <q-icon name="note" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('navigation.notes') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/trash">
          <q-item-section avatar>
            <q-icon name="delete" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('navigation.trash') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/settings">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('navigation.settings') }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'Layout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      deletedNotes: this.$store.getters.getAllDeletedNotes
    }
  },
  methods: {
    openURL,
    onEmptyTrashClick () {
      this.$store.commit({ type: 'emptyTrash' })
    },
    onRestoreSelectedClick () {
      this.$store.commit({
        type: 'restoreNotes',
        noteIds: this.selectedNoteIds
      })
    },
    onDeleteSelectedClick () {
      this.$store.commit({
        type: 'deleteNotes',
        noteIds: this.selectedNoteIds
      })
    },
    openDeleteSelectedConfirmDialog () {
      this.$q.dialog({
        title: this.$t('confirmDialog.permanentDeleteSelectedTitle'),
        message: this.$t('confirmDialog.permanentDeleteSelectedMessage'),
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.onDeleteSelectedClick()
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    openEmptyTrashConfirmDialog () {
      this.$q.dialog({
        title: this.$t('confirmDialog.emptyTrashTitle'),
        message: this.$t('confirmDialog.emptyTrashMessage'),
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.onEmptyTrashClick()
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    }
  },
  computed: {
    selectedNoteIds: function () {
      let selectedNoteIds = []

      this.deletedNotes.forEach(note => {
        if (note.highlighted) {
          selectedNoteIds.push(note.id)
        }
      })

      return selectedNoteIds
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
