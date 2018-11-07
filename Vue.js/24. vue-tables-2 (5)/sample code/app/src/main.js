import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import CustomFilterDemo from './components/custom-filter-demo'
import ColFilterDemo from './components/col-filter-demo'
import ColListfilterDemo from './components/col-listfilter-demo'
import {ClientTable, Event} from 'vue-tables-2';

//vue-router
Vue.use(VueRouter);
//axios
window.axios = require('axios');
//vue-tables-2
window.Event = Event;
Vue.use(ClientTable, {}, false, 'bootstrap3', 'default');
Vue.use(Event);


//Routing
const routes = [
  { path: '/custom-filter-demo', component: CustomFilterDemo },
  { path: '/col-filter-demo', component: ColFilterDemo },
  { path: '/col-listfilter-demo', component: ColListfilterDemo }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

