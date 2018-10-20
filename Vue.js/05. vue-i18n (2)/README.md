# vue-i18n (2)

> 多國語系套件


## Github

[kazupon/vue-i18n](https://github.com/kazupon/vue-i18n)


延續上一篇，我們來看進階的[vue-i18n](https://github.com/kazupon/vue-i18n)使用方式。




## 日期時間 DateTime localization

**日期時間**的設定遵循[ECMA-402 Intl.DateTimeFormat](http://www.ecma-international.org/ecma-402/2.0/#sec-intl-datetimeformat-constructor)的定義。

| 屬性 | 值 |
|:----:|:---|
| weekday | "narrow", "short", "long" |
| era | "narrow", "short", "long" | 
| year | "2-digit", "numeric" |
| month | "2-digit", "numeric", "narrow", "short", "long" |
| day | "2-digit", "numeric" |
| hour | "2-digit", "numeric" |
| minute | "2-digit", "numeric" |
| second | "2-digit", "numeric" |
| timeZoneName | "short", "long" |
	
### JS

```
Vue.use(VueI18n);

const dateTimeFormats = {
  'en-US': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  },
  'zh-CN': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
          year: 'numeric', month: 'long', day: '2-digit',
          weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true
    }
  },
  'ja-JP': {
    short: {
      year: '2-digit', month: 'narrow', day: '2-digit'
    },
    long: {
          year: '2-digit', month: 'narrow', day: '2-digit',
          weekday: 'narrow', hour: '2-digit', minute: '2-digit', hour12: false
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  fallbackLocale: 'en-US',
  dateTimeFormats
});


var app = new Vue({
  el: '#app',
  i18n, //In IE, you have to write like this... i18n: i18n
  created: function () {
    var vm = this;
    vm.$i18n.locale = 'zh-CN';
  }
})
```

使用的方式為：`$d(new Date(), 'short')`

或指定使用哪個語系的格式：`$d(new Date(), 'short', 'en-US')`



### HTML

```
<p>Datetime(zh-CN, short): {{ $d(new Date(), 'short') }}</p>
<p>Datetime(zh-CN, long): {{ $d(new Date(), 'long') }}</p>
<p>Datetime(ja-JP, short): {{ $d(new Date(), 'short', 'ja-JP') }}</p>
<p>Datetime(ja-JP, long): {{ $d(new Date(), 'long', 'ja-JP') }}</p>
<p>Datetime(en-US, short): {{ $d(new Date(), 'short', 'en-US') }}</p>
<p>Datetime(en-US, long): {{ $d(new Date(), 'long', 'en-US') }}</p>
```


執行結果：
```
Datetime(zh-CN, short): 2018年10月19日
Datetime(zh-CN, long): 2018年10月19日 星期五 下午12:02
Datetime(ja-JP, short): 18年10月19日
Datetime(ja-JP, long): 18年10月19日(金) 12:02
Datetime(en-US, short): Oct 19, 2018
Datetime(en-US, long): Fri, Oct 19, 2018, 12:02 PM
```

## 數字 Number localization

**數字**的設定遵循[ECMA-402 Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)的定義。

以下示範三種style:
1. currency
2. percent
3. decimal


### Currency 貨幣

使用`currency`指定使用哪一種國際貨幣，使用`currencyDisplay`決定貨幣別顯示`name`(貨幣名稱)或`symbol`(貨幣符號)。
而`useGrouping`若為`true`(預設值)則表示使用分隔符號。

```
const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency', currency: 'USD'
    }
  },
  'zh-CN': {
    currency: {
      style: 'currency', currency: 'CNY', currencyDisplay: 'name'
    }
  },
  'ja-JP': {
    currency: {
      style: 'currency', currency: 'JPY', currencyDisplay: 'symbol', useGrouping: false
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  fallbackLocale: 'en-US',
  numberFormats
});
```

使用的方式為：`$n(10000.12345, 'currency')`

或指定使用哪個語系的格式：`$n(10000.12345, 'currency', 'en-US')`

例如以下的HTML，

```
<p>Currency(en-US): {{ $n(10000.12345, 'currency', 'en-US') }}</p>
<p>Currency(zh-CN): {{ $n(10000.12345, 'currency') }}</p>
<p>Currency(ja-JP): {{ $n(10000.12345, 'currency', 'ja-JP') }}</p>
```

將顯示：

```
Currency(en-US): $10,000.12
Currency(zh-CN): 10,000.12 人民币
Currency(ja-JP): ￥10000
```


### Percentage 百分比

其實三種Style的用法大同小異，在這邊我們額外使用`minimumFractionDigits`和`maximumFractionDigits`來指定顯示的小數位數。

```
const numberFormats = {
  'en-US': {
    percent: {
      style: 'percent'
    }
  },
  'zh-CN': {
    percent: {
      style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 2
    }
  },
  'ja-JP': {
    percent: {
      style: 'percent', useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 4, useGrouping: false
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  fallbackLocale: 'en-US',
  numberFormats
});
```

使用的方式為：`$n(0.1, 'percent')`

或指定使用哪個語系的格式：`$n(0.1, 'percent', 'en-US')`

例如以下的HTML，

```
<p>Percentage(en-US): {{ $n(0.881, 'percent', 'en-US') }}</p>
<p>Percentage(en-US): {{ $n(0.8812345, 'percent', 'en-US') }}</p>
<p>Percentage(en-US): {{ $n(0.881, 'percent') }}</p>
<p>Percentage(zh-CN): {{ $n(0.8812345, 'percent') }}</p>
<p>Percentage(ja-JP): {{ $n(0.881, 'percent', 'ja-JP') }}</p>
<p>Percentage(ja-JP): {{ $n(0.8812345, 'percent', 'ja-JP') }}</p>
```

將顯示：

```
Percentage(en-US): 88%
Percentage(en-US): 88%
Percentage(en-US): 88.1%
Percentage(zh-CN): 88.12%
Percentage(ja-JP): 88.10%
Percentage(ja-JP): 88.1235%
```


### Decimal

```
const numberFormats = {
  'en-US': {
    decimal: {
      style: 'decimal'
    }
  },
  'zh-CN': {
    decimal: {
      style: 'decimal', minimumFractionDigits: 1, maximumFractionDigits: 2
    }
  },
  'ja-JP': {
    decimal: {
      style: 'decimal', useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 4, useGrouping: false
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  fallbackLocale: 'en-US',
  numberFormats
});
```

使用的方式為：`$n(10000.12345, 'decimal')`

或指定使用哪個語系的格式：`$n(10000.12345, 'decimal', 'en-US')`

例如以下的HTML，

```
<p>Decimal(en-US): {{ $n(10000.12345, 'decimal', 'en-US') }}</p>
<p>Decimal(zh-CN): {{ $n(10000.12345, 'decimal') }}</p>
<p>Decimal(ja-JP): {{ $n(10000.12345, 'decimal', 'ja-JP') }}</p>
```

將顯示：

```
Decimal(en-US): 10,000.123
Decimal(zh-CN): 10,000.12
Decimal(ja-JP): 10000.1235
```
