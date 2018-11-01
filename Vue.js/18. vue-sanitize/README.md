# vue-sanitize

> 基於[sanitize-html](https://github.com/punkave/sanitize-html)的Vue.js HTML sanitizer 


## Github

[daichirata/vue-sanitize](https://github.com/daichirata/vue-sanitize)


## 範例

```
Vue.use(VueSanitize);

clened = this.$sanitize(dirty);
```

若要自行設定白名單，方式如下：

```javascript
const defaultOptions = {
  allowedTags: ['div', 'img'],
  allowedAttributes: {
    'img': ['src', 'style']
  }
};

Vue.use(VueSanitize, defaultOptions);

clenedHtml = this.$sanitize(dirtyHtml);
```



以上設定將原始HTML：

```html
<div class="form-control">This is DIV<div>
<label class="form-control">This is LABEL</label>
<div><a href="https://vuejs.org"><img src="https://vuejs.org/images/logo.png" style="width:50px;height:50px" /></a></div>
```

整理為：

```html
<div>This is DIV<div>
This is LABEL
<div><img src="https://vuejs.org/images/logo.png" style="width:50px;height:50px;"></div>
```


也可以在sanitize時，直接加入參數：

```
cleanedHtml = this.$sanitize(dirtyHtml,
      {
         allowedTags: ['div', 'a']
      });
```


## sanitize-html

[vue-sanitize]()僅封裝了[sanitize-html](https://github.com/punkave/sanitize-html)的函式，
若要使用更進階的功能，可直接使用[sanitize-html](https://github.com/punkave/sanitize-html)：


```
import sanitizeHTML from 'sanitize-html';
Vue.prototype.$sanitize = sanitizeHTML
```

### 預設白名單

預設白名單可參考[Default options](https://github.com/punkave/sanitize-html#what-are-the-default-options)。
以下為官方文件**2018-11-1**的資訊：

```
allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
  'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
  'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe' ],
allowedAttributes: {
  a: [ 'href', 'name', 'target' ],
  img: [ 'src' ]
},
selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
allowedSchemes: [ 'http', 'https', 'ftp', 'mailto' ],
allowedSchemesByTag: {},
allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
allowProtocolRelative: true
```

| Prop | Type | Description |
|:-----|:----:|:------------|
| allowedTags | Array | Allowed HTML tags |
| allowedAttributes | Object | Allowed HTML attributes |
| selfClosing | Array | Allowed self-closing tags |
| allowedSchemes | Array | Allowed URL schemes, like 'http', 'https' |
| allowedSchemesByTag | Object | Allowed URL schemes by certain tag |
| allowedSchemesAppliedToAttributes | Array | |
| allowProtocolRelative | Boolean | true: Allowed the Url starting with `//...` |



### 使用預設白名單並新增

若要新增白名單，可透過以下方式：


1. Sanitize時額外設定

```
cleanedHtml = vm.$sanitize(dirtyHtml, {
        allowedTags: this.$sanitize.defaults.allowedTags.concat(['script','img' ])
      });
```

2. 或於vue instance建立後設定：

```
this.$sanitize.defaults.allowedTags = 
          this.$sanitize.defaults.allowedTags.concat(['script','img' ]);
this.$sanitize.defaults.allowedAttributes.img = 
        this.$sanitize.defaults.allowedAttributes.img.concat(['src','style']);
```


### 允許Data Uri

可透過**allowedSchemes**參數設定允許Data Uri：

```javascript
this.$sanitizeHtml(
  '<img src="data:image/png;base64,XXXXXX" />',
  {
    allowedSchemes: [ 'data' ]
  }
);
```

若僅允許`img`的`src`可為Base64的資料，可利用**allowedSchemesByTag**：

```javascript
this.$sanitizeHtml(
  '<img src="data:image/png;base64,XXXXXX" />',
  {
    allowedSchemesByTag: {
        img: [ 'data' ]
    }
  }
);

```

若要再針對可允許的`URL schemas`套用到哪些Html attribute，可同時設定**allowedSchemes**及**allowedSchemesAppliedToAttributes**

```
 cleanedHtml = vm.$sanitize(vm.dirtyHtml, {
        allowedSchemes: [ 'https' ],
        allowedSchemesAppliedToAttributes: ["src"]
      });
```

以上設定將使`<img src="http://vuejs.org/images/logo.png" />`的`src`被清除；
但`<img src="https://vuejs.org/images/logo.png" />`則可正常顯示圖片。




