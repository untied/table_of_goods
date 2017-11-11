// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'font-awesome/css/font-awesome.min.css'

const EventBus = new Vue() // шина событий

Object.defineProperties(Vue.prototype, {
  $bus: {
    get () {
      return EventBus
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
})
