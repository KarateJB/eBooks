import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ScopedSlotDemo from './components/scoped-slot-demo'
import ComponentDemo from './components/component-demo'
import VDomDemo from './components/vdom-demo'
import {ClientTable} from 'vue-tables-2';

//vue-router
Vue.use(VueRouter);


//vue-tables-2
window.axios = require('axios');
Vue.use(ClientTable, {}, false, 'bootstrap3', 'default');



//Routing
const routes = [
  { path: '/scoped-slot-demo', component: ScopedSlotDemo },
  { path: '/vdom-demo', component: VDomDemo },
  { path: '/component-demo', component: ComponentDemo }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

