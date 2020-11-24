Vue.use(VueI18n);

//HTML formatting
// const messages = {
//   'en-US': {
//     "column": {
//       "name": "<p style='color:red'>Book title<p>",
//       "price": "<p style='color:blue'>Price<p>",
//     }
//   },
//   'zh-TW': {
//     "column": {
//       "name": "<p style='color:red'>書名</p>",
//       "price": "<p style='color:blue'>價格</p>",
//     }
//   }
// }

//Named formatting
// const messages = {
//   'en-US': {
//     "column": {
//       "name": "Book title : {book}",
//       "price": "Price : {price}",
//     }
//   },
//   'zh-TW': {
//     "column": {
//       "name": "書名 : {book}",
//       "price": "價格 : {price}",
//     }
//   }
// }

//List formatting
const messages = {
  'en-US': {
    "column": {
      "name": "Book title : {0} ({1})",
      "price": "Price : {0}",
    }
  },
  'zh-TW': {
    "column": {
      "name": "書名 : {0} ({1})",
      "price": "價格 : {0}",
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
  i18n, //In IE, you have to write like this... i18n: i18n
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