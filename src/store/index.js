import Vue from 'vue'
import Vuex from 'vuex'
import noteStore from './noteStore'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      noteStore
    }
  })

  Store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state))
  })

  return Store
}
