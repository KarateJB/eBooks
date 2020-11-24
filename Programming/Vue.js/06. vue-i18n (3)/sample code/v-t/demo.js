Vue.use(VueI18n);

const messages = {
  'en-US': {
    "column": {
      "name": "Book title : {book}",
      "price": "Price : ${price}",
    }
  },
  'zh-TW': {
    "column": {
      "name": "書名 : {book}",
      "price": "價格 : {price}元",
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: '', // set locale
  fallbackLocale: 'en-US',
  messages, // set locale dictionary
});


var app = new Vue({
  el: '#app',
  i18n, 
  data:{
    starwars: { 
      book: 'Star Wars: Episode VI - Return of the Jedi',
      year: 1983,
      price: 619.02
    }
  },
  created: function () {
    var vm = this;
    vm.$i18n.locale = 'en-US';
  }
})