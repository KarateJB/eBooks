import Vue from 'vue'
import App from './App.vue'
import VueSanitize from "vue-sanitize";


const defaultOptions = {
  allowedTags: ['a','div'],
  allowedAttributes: {
    'a': [ 'href' ]
  }
};
Vue.use(VueSanitize, defaultOptions);


new Vue({
  el: '#app',
  render: h => h(App)
})
