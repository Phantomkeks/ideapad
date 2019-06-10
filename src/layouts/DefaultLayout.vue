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
          {{ $t('appTitle') }}
        </q-toolbar-title>
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
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style lang="stylus" scoped>
  // $

  .gradient {
    headerGradient();
  }
</style>
