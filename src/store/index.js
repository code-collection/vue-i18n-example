import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locale_key: '',
    locale: {}
  },
  mutations: {
    setLocaleKey(state, payload) {
      state.locale_key = payload
    },
    setLocale(state, payload) {
      state.locale = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
