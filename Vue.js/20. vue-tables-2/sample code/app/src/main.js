import Vue from 'vue'
import App from './App.vue'
import {ServerTable, ClientTable, Event} from 'vue-tables-2';

//Vue.use(ClientTable, [options = {}], [useVuex = false], [theme = 'bootstrap3'], [template = 'default']);
Vue.use(ClientTable, {}, false, 'bootstrap3', 'default');


new Vue({
  el: '#app',
  render: h => h(App)
})
