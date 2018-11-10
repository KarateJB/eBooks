import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
/* Components */
import Login from './components/login'
import ProdList from './components/prod-list'


/* firebase */
import firebaseConfig from './modules/firebase.config.prod'
// import * as firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

//firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
window.firebase = firebase;
window.firebaseDb = firebaseApp.database();
window.firebaseAuth = firebaseApp.auth();



//Routing
const routes = [
  { path: '/login', component: Login },
  { path: '/prod-list', component: ProdList },
   //{ path: '/orders', component: Orders },
   {path: '*', redirect: '/login'}
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.use(VueRouter);



//VueFire
Vue.use(VueFire)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
