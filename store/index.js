import Vue from 'vue'
import Vuex from 'vuex'
import placesForm from './places_form'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      snackbarMessage: '',
      snackbar: false,
      bombopaymentsdialog: false,
      isLoading: false,
      isShortLoading: false
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
      },
      isLoading (state, value) {
        state.isLoading = value
      },
      isShortLoading (state, value) {
        state.isShortLoading = value
      }
    },
    modules: {
      placesForm
    }
  })
}

export default createStore
