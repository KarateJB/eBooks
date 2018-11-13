# vue-fontawesome

> [Font Awesome 5](https://fontawesome.com/)的官方Vue.js Component


## Github

[FortAwesome/vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome)

## 安裝

1. 安裝`@fortawesome/fontawesome-svg-core`和`@fortawesome/vue-fontawesome`

```
$ npm install @fortawesome/fontawesome-svg-core  --save
$ npm install @fortawesome/vue-fontawesome --save
```

2. 再依Free, Pro, Brands, Solid, Regular等Style(樣式種類，請參考[Font Awesome Icons](https://fontawesome.com/icons))安裝對應的ICONS套件； 例如：


```
$ npm install @fortawesome/free-solid-svg-icons --save
$ npm install @fortawesome/free-regular-svg-icons --save
$ npm install @fortawesome/free-brands-svg-icons --save

//Pro
$ npm install @fortawesome/pro-regular-svg-icons --save
```



## 配置

```javascript
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faGooglePlus } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee, faGooglePlus);
Vue.component('font-awesome-icon', FontAwesomeIcon)
```

其中我們加入了Free icons的[fa-coffee](https://fontawesome.com/icons/coffee?style=solid)及Brands icons的[fa-google-plus](https://fontawesome.com/icons/google-plus?style=brands)到`fontawesome-svg-core`的倉庫(library)裡； 藉由此概念可降低打包後檔案的大小。

您也可以直接加入整個Style(樣式種類)下的所有Icons(但不建議)：

```javascript
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fab)
```

## 使用方式

### 顯示圖示

當完成配置後，我們可以直接在HTML裡面以以下方式加入圖示，

```html
<font-awesome-icon icon="coffee" />
```

或指定Style Prefix(樣式前綴詞)：

| Prefix | Style |
|:------:|:-----:|
| `fas` | Solid |
| `far` | Regular |
| `fal` | Light |
| `fab` | Brands |

```html
<font-awesome-icon :icon="['fa', 'coffee']" />
<font-awesome-icon :icon="['fab', 'google-plus']" />
```

以下說明幾個常用的用法，更多進階方式可參考[vue-fontawesome Github](https://github.com/FortAwesome/vue-fontawesome)的[一般用法](https://github.com/FortAwesome/vue-fontawesome#basic)及[進階用法](https://github.com/FortAwesome/vue-fontawesome#advanced)。

### 指定大小

```html
<font-awesome-icon icon="coffee" size="lg" />
```

> Size清單可參考[官網說明](https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons)


### 動畫

```html
<font-awesome-icon icon="spinner" spin />
<font-awesome-icon icon="spinner" pulse />
```

## 使用 i tags

如果習慣了原本的`<i class="fas fa-coffee"></i>`寫法，我們可以透過`@fortawesome/fontawesome-svg-core`來設定開啟將以上語法轉換為`<svg class="...">...</svg>`

```javascript
import { dom } from '@fortawesome/fontawesome-svg-core'

dom.watch();
```


## Reference

- [Font Awesome - How to use with Vue.js](https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs)



