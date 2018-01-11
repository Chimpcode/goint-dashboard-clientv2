import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main'

if (process.browser) {
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAzJcJRIwCI1WXUTXNX9BpHuyKPWXoKmU8',
      libraries: 'places' // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)
    }
  })
}
