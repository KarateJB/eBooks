import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import clientTableDemo from './components/client-table-demo'
import serverTableDemo from './components/server-table-demo'
import {ServerTable, ClientTable, Event} from 'vue-tables-2';

//vue-router
Vue.use(VueRouter)

//vue-tables-2
window.axios = require('axios');
Vue.use(ServerTable, {}, false, 'bootstrap3', 'default');
Vue.use(ClientTable, {}, false, 'bootstrap3', 'default');


//Routing
const routes = [
  { path: '/client-table-demo', component: clientTableDemo },
  { path: '/server-table-demo', component: serverTableDemo }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
