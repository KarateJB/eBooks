import Vue from 'vue'
import App from './App.vue'
import Eagle from 'eagle.js'
// import eagle.js default styles
import 'eagle.js/dist/eagle.css'
// import animate.css for slide transition 
// import 'animate.css'

Vue.use(Eagle);

new Vue({
  el: '#app',
  render: h => h(App)
})
