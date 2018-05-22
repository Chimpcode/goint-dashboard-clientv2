import Vue from 'vue'
import Vuex from 'vuex'
import placesForm from './places_form'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    snackbarMessage: '',
    snackbar: false,
    bombopaymentsdialog: false
  },
  getters: {
    snackbarMsg: (state) => {
      return state.snackbarMessage
    },
    isSnackbarOn: (state) => {
      return state.snackbar
    }
  },
  mutations: {
    setSnackbarMessage (state, message) {
      state.snackbarMessage = message
      state.snackbar = true
    },
    snackbarOff (state) {
      state.snackbar = false
    }
  },
  modules: {
    placesForm
  }
})

export default () => {
  return store
}
