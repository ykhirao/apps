import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false

const config = {
  apiKey: ' AIzaSyDfwEXKlMoCN_6mzK7MHtRLJuIyaq11NgQ ',
  authDomain: 'YOUR_DOMAIN.firebaseapp.com',
  databaseURL: 'YOUR_DOMAIN.firebaseio.com',
  projectId: 'YOUR_ID',
  storageBucket: 'YOUR_BUCKET_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
}
firebase.initializeApp(config)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
