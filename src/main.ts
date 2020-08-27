import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { firebaseConfig } from '@/firebase-config.ts'

import firebase from 'firebase/app';
import 'firebase/database';

import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.config.productionTip = false
Vue.use(Buefy)

// Файл с настройками firebase добавлен в .gitignore файл.
firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
