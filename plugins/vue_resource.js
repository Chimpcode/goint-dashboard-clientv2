import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'http://13.90.253.208:9300/api/v1'
