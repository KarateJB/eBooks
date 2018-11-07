import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import CustomFilterDemo from './components/custom-filter-demo'
import ColListfilterDemo from './components/col-listfilter-demo'
import ColDatefilterDemo from './components/col-datefilter-demo'
import ColFilterDemo from './components/col-filter-demo'
import {ClientTable, Event} from 'vue-tables-2';


//vue-router
Vue.use(VueRouter);
//axios
window.axios = require('axios');
//jquery
window.$ = window.jQuery = require('jquery');
//moment.js
window.moment = require('moment');
//daterangepicker
// window.daterangepicker = require('daterangepicker');
//vue-tables-2
window.Event = Event;
Vue.use(ClientTable, {}, false, 'bootstrap3', 'default');
Vue.use(Event);


//Routing
const routes = [
  { path: '/custom-filter-demo', component: CustomFilterDemo },
  { path: '/col-listfilter-demo', component: ColListfilterDemo },
  { path: '/col-datefilter-demo', component: ColDatefilterDemo },
  { path: '/col-filter-demo', component: ColFilterDemo },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

