Vue.use(VueI18n);

const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency', currency: 'USD'
    }
  },
  'zh-TW': {
    currency: {
      style: 'currency', currency: 'NTD', currencyDisplay: 'name'
    }
  }
}

// const messages = {
//   'en-US': {
//     "column": {
//       "name": "Book title",
//       "price": "Price",
//     }
//   },
//   'zh-TW': {
//     "column": {
//       "name": "書名",
//       "price": "價格",
//     }
//   }
// }

const messages = {
  'en-US': {
    "name": "Book title",
    "price": "Price",
    "bookInfo": "{title} : {link}",
    "priceInfo": "{title} = {howmuch}"
  },
  'zh-TW': {
    "name": "書名",
    "price": "價格",
    "bookInfo": "{title} : {link}",
    "priceInfo": "{title} = {howmuch}"
  }
}

const i18n = new VueI18n({
  locale: '', // set locale
  fallbackLocale: 'en-US',
  messages,
  numberFormats
});


var app = new Vue({
  el: '#app',
  i18n,
  computed: {
    starwars() {
      let val = {
        book: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
        price: 619.02,
        url: "https://goo.gl/nJMbMe"
      }

      if (this.$i18n.locale === 'zh-TW')
        val.price = val.price * 30;

      return val;
    }
  },
  methods: {
    toNTD(val) {
      return val
    }
  },
  created: function () {
    var vm = this;
    vm.$i18n.locale = 'zh-TW';
  }
})