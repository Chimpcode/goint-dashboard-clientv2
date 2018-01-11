import Vue from 'vue'
import Vuetify from 'vuetify'

if (process.browser) {
  Vue.use(Vuetify, {
    theme: {
      primary: '#C12B35',
      lazy: '#cbcbcb'
    }
  })
}
