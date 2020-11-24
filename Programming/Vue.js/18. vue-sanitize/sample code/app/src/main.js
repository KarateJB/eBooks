import Vue from 'vue'
import App from './App.vue'
// import VueSanitize from "vue-sanitize";
import sanitizeHTML from 'sanitize-html';

const defaultOptions = {
  allowedTags: ['div', 'img'],
  allowedAttributes: {
    'a': [ 'href' ],
    'img': ['src', 'style']
  }
};


// Vue.use(VueSanitize, defaultOptions);
Vue.prototype.$sanitize = sanitizeHTML

new Vue({
  el: '#app',
  render: h => h(App)
})
