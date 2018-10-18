Vue.use(VueI18n);

const messages = {
  enUS: {
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
  zhTW: {
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
  fallbackLocale: 'enUS',
  messages, // set locale dictionary
});


var app = new Vue({
  el: '#app',
  i18n, //In IE, you have to write like this... i18n: i18n
  created: function () {
    var vm = this;

    //You can also set messages here
    //vm.$i18n.setLocaleMessage('zhTW', messages.zhTW); 
    //vm.$i18n.setLocaleMessage('enUS', messages.enUS);

    vm.$i18n.locale = 'zhTW';
  }
})