# vue-i18n (1)

> 多國語系套件

## Github

[kazupon/vue-i18n](https://github.com/kazupon/vue-i18n)


## 範例(使用常數值之語系字典)


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


var app = new Vue({
  el: '#app',
  i18n, //In IE, you have to write like this... i18n: i18n
  created: function () {
    var vm = this;
    vm.$i18n.locale = 'zhTW'; //Set the locale here
  }
})
```

> 1. 注意語系字典必須指定給名稱為`messages`的常數變數
> 2. `fallbackLocale: 'enUS'`表示當未設定對應的語系字典時，以`enUS`為預設顯示

也可以不在建立`VueI18n`時設定語系字典(messages)，而改由`$i18n.setLocaleMessage('zhTW', messages.zhTW)`的方式來設定。

```
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: '', // set locale
  fallbackLocale: 'enUS'
});

var app = new Vue({
  // Skip...
  created: function () {
    var vm = this;
    vm.$i18n.setLocaleMessage('zhTW', messages.zhTW); 
    vm.$i18n.setLocaleMessage('enUS', messages.enUS);
    
    vm.$i18n.locale = 'zhTW';
  }
})
```

#### 取值

若要在JS中取用i18n的字典，其語法：
```
this.$t('text.search')
```

而在HTML中取用i18n的字典方式：
```
{{ $t("column.key") }}
```
或使用directive，如[v-html](https://vuejs.org/v2/api/#v-html), [v-text](https://vuejs.org/v2/api/#v-text)
```
<div v-text="$t('column.key')"></div>
```


### HTML

```
<table class="table">
    <thead class="thead-dark">
        <tr>
            <th>#</th>
            <th>{{ $t("column.key") }}</th>
            <th class="col-xs-2">{{ $t("column.description") }}</th>
            <th>{{ $t("column.createBy") }}</th>
            <th>{{ $t("column.createOn") }}</th>
            <th>{{ $t("column.updateBy") }}</th>
            <th>{{ $t("column.updateOn") }}</th>
        </tr>
    </thead>
</table>
```

### Demo

[Source code](const)

繁中

![](assets/001.png)

英文

![](assets/002.png)



## 範例(Ajax)

當然我們的多國語系字典通常是後端來提供，以下是透過[axios](https://github.com/axios/axios)取得字典的範例。

```
Vue.use(VueI18n);


// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: '', // set locale
  fallbackLocale: 'enUS'
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
      vm.$i18n.setLocaleMessage('enUS', response1.data);
      vm.$i18n.setLocaleMessage('zhTW', response2.data);
      vm.$i18n.locale = 'zhTW';
    }));

  }
})
```

[Source code](jsonfile)
