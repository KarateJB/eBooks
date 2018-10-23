# vue-markdown

> 將Mardown語法轉成HTML的套件。

## Github

[miaolz123/vue-markdown](https://github.com/miaolz123/vue-markdown)


## 範例


使用上相當簡單，只需加入`Vue.use(VueMarkdown)`，在HTML裡將Markdown的文字以`<vue-markdown></vue-markdown>`包起來即可。

### JS

```
Vue.use(VueMarkdown);

var app = new Vue({
    el: "#app"
})
```

### HTML 

```
<vue-markdown>## Demo</vue-markdown>
<vue-markdown>[A link to Google](https://googl.com)</vue-markdown>
```
或
```
<vue-markdown>
## Demo
[A link to Google](https://googl.com)
</vue-markdown>
```

結果如下圖：

![](001.png)


也支援各種[Props](https://github.com/miaolz123/vue-markdown#props)，例如較常用的`source`和`anchor-attributes`：


```
<vue-markdown :source="now"></vue-markdown>
<vue-markdown :anchor-attributes="linkAttrs">[A link to Google](https://google.com)</vue-markdown>
```

```
Vue.use(VueMarkdown);

var app = new Vue({
    el: "#app",
    data:{
        now: new Date().toLocaleTimeString(),
        linkAttrs: {
            target: '_blank',
            id: 'mylink'
          } 
    },
    created() {
        var vm =this;
    },
})
```

產生的HTML如下：

```
<div><p>下午11:39:21</p></div>
<div><p><a href="https://google.com" target="_blank" id="mylink">A link to Google</a></p></div>
```


