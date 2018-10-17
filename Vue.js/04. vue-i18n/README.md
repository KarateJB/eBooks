# vue-i18n

> 多國語系套件

## Github

[kazupon/vue-i18n](https://github.com/kazupon/vue-i18n)


## 範例


### JS

```
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
```

Notice that you have to name the constant variable as “messages” or the data won’t be loaded to [vue-i18n](https://github.com/kazupon/vue-i18n).


### 





[vue-i18n](https://github.com/kazupon/vue-i18n)是 is a internationalization plugin for Vue.js
I will show three ways for setting localization dictionary in this sample:

1.  Constant variable
2.  JSON file
3.  ASP.NET Resource file (.resx)





