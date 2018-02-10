import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import './firebase-init'

Vue.config.productionTip = false

let app
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      render: h => h(App)
    })
  }
})
