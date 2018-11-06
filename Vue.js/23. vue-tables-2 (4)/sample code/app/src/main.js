import Vue from 'vue'
import App from './App.vue'
import {ClientTable} from 'vue-tables-2';


//vue-tables-2
window.axios = require('axios');
Vue.use(ClientTable, {}, false, 'bootstrap3', 'default');



new Vue({
  el: '#app',
  render: h => h(App)
})
