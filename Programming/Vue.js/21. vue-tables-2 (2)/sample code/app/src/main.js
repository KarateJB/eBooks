import Vue from 'vue'
import App from './App.vue'
import {ServerTable, ClientTable, Event} from 'vue-tables-2';


//vue-tables-2
window.axios = require('axios');
Vue.use(ServerTable, {}, false, 'bootstrap3', 'default');
Vue.use(ClientTable, {}, false, 'bootstrap3', 'default');



new Vue({
  el: '#app',
  render: h => h(App)
})
