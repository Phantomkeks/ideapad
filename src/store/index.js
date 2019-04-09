import Vue from 'vue'
import Vuex from 'vuex'
import noteStore from './noteStore'
import settingsStore from './settingsStore'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      noteStore,
      settingsStore
    }
  })

  Store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state))
  })

  return Store
}
