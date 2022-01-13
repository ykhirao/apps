import Vue from 'vue'
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import dotenv from 'dotenv'

import App from './App.vue'
import router from './router'
import store from './store'

dotenv.config()

Vue.use(Buefy)

if (!firebase.apps.length && process) {
  const firebaseConfig = {
    apiKey: process.env.VUE_APP_APIKEY,
    authDomain: process.env.VUE_APP_AUTHDOMAIN,
    databaseURL: process.env.VUE_APP_DATABASEURL,
    projectId: process.env.VUE_APP_PROJECTID,
    storageBucket: process.env.VUE_APP_STORAGEBUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
    appId: process.env.VUE_APP_APPID,
    measurementId: process.env.VUE_APP_MEASUREMENTID
  }

  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
}

export default firebase
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
