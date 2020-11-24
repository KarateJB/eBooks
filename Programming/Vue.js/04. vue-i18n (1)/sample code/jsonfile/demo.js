Vue.use(VueI18n);


// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: '', // set locale
  fallbackLocale: 'en-US'
});


var app = new Vue({
  el: '#app',
  i18n, //In IE, you have to write like this... i18n: i18n
  methods: {
    i18nGetEnUS() {
      return axios.get('http://localhost:3000/en-US');
    },
    i18nGetZhTW() {
      return axios.get('http://localhost:3000/zh-TW');
    }
  },
  created: function () {
    var vm = this;

    axios.all([vm.i18nGetEnUS(), vm.i18nGetZhTW()])
    .then(axios.spread(function (response1, response2) {
      vm.$i18n.setLocaleMessage('en-US', response1.data);
      vm.$i18n.setLocaleMessage('zh-TW', response2.data);
      vm.$i18n.locale = 'zh-TW';
    }));

  }
})