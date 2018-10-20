# vue-i18n (1)

> 多國語系套件

## Github

[kazupon/vue-i18n](https://github.com/kazupon/vue-i18n)


假設我們要串接多個vue-i18n的語系字典，例如：

![](assets/001.png)
![](assets/002.png)

最直覺的寫法如下：
```
<strong>{{ $t('column.name') }} : <a :href="starwars.url"">{{ starwars.book }}({{ starwars.year
        }})</a></strong>
{{ $t('column.price') }} = {{ $n(starwars.price, 'currency') }}
```

看起來有些笨重(cumbersome)；
這一篇將說明如何使用[Component interpolation](http://kazupon.github.io/vue-i18n/guide/interpolation.html)來組成多個語系字典的串接。
其好處是簡化寫法或避免使用`v-html`可能造成的XSS風險。



## 範例

### JS



