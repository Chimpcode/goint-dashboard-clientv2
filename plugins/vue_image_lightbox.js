import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'

if (process.browser) {
  Vue.use(VueLazyLoad)
}
