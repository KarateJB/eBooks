Vue.use(VueI18n);

const messages = {
  'en-US': {
    "column": {
      "key": "Book title",
      "description": "Price",
      "createBy": "Create by",
      "createOn": "Create On",
      "updateBy": "Update by",
      "updateOn": "Update On"
    },
    "text": {
      "search": "Search"
    }
  },
  'zh-TW': {
    "column": {
      "key": "書名",
      "description": "價格",
      "createBy": "建立者",
      "createOn": "建立日期",
      "updateBy": "更新者",
      "updateOn": "更新日期"
    },
    "text": {
      "search": "搜尋"
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
  created: function () {
    var vm = this;

    //You can also set messages here
    //vm.$i18n.setLocaleMessage('zh-TW', messages.zhTW); 
    //vm.$i18n.setLocaleMessage('en-US', messages.enUS);

    vm.$i18n.locale = 'zh-TW';
  }
})