<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="gradient">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-if="!showBackButton"
          icon="menu"
        />
        <q-btn
          flat
          dense
          round
          @click="onBackButtonClick"
          v-if="showBackButton"
          icon="arrow_back"
        />

        <q-toolbar-title>
          Mini-Memo
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item clickable to="/notes">
          <q-item-section avatar>
            <q-icon name="notes" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Notes</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/trash">
          <q-item-section avatar>
            <q-icon name="delete" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Trash</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/settings">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Settings</q-item-label>
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
      showBackButton: false
    }
  },
  methods: {
    openURL,
    onBackButtonClick () {
      this.$router.go(-1)
    }
  },
  watch: {
    $route: function () {
      if (this.$route.path.match(/notes\/detail\//)) {
        this.showBackButton = true
      } else {
        this.showBackButton = false
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~quasar-variables'
.gradient
  headerGradient()
</style>
