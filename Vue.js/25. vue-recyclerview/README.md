# vue-recyclerview

> 無限卷軸顯示資料清單套件

## Github

[hilongjw/vue-recyclerview](https://github.com/hilongjw/vue-recyclerview)


## 安裝

```
$ npm install vue-recyclerview
```

## 範例

> 若在JS檔直接使用，可參考作者的[範例程式碼](https://github.com/hilongjw/vue-recyclerview/tree/master/examples/simple)


#### Import and Use `vue-recyclerview`

```
import VueRecyclerviewNew from 'vue-recyclerview'

Vue.use(VueRecyclerviewNew)
```

#### 建立清單子元件及fetch模組

以下參考作者[範例程式碼](https://github.com/hilongjw/vue-recyclerview/tree/master/examples/component)中的[清單子元件](https://github.com/hilongjw/vue-recyclerview/blob/master/examples/component/Item.vue),[fetch模組](https://github.com/hilongjw/vue-recyclerview/blob/master/examples/component/mi-fetch.js)及CSS建立：

1. 清單子元件(list-row.vue)

```html
<template>
  <li class="mi-item">
        <a class="version-item">
            <div class="version-item-img">
                <img :src="data.img">
            </div>
            <div class="version-item-intro">
                <h3>{{data.name}}({{ data.gender }})</h3>
            </div>
        </a> 
  </li>
</template>

<script>

export default {
  name: "ListRow",
  props: {
      data: {
            type: Object,
            required: true
        }
  }
};
</script>
<style>
.mi-item {
  padding: 0 0 3px;
  position: absolute;
  background: #fff;
  width: 100%;
  list-style: none;
}
.mi-item::after {
  content: "";
  position: absolute;
  bottom: 1.5px;
  left: 150px;
  right: 0;
  /* border-bottom: 1px solid #e4e4e4; */
}
.version-item {
  display: flex;
  display: -webkit-box;
  box-align: center;
  -webkit-box-align: center;
  width: 100%;
}
.version-item-img {
    width: 180px;
    height: 180px;
    position: relative;
}
.version-item-img img {
    width: 100%;
}
.version-item .version-item-intro {
  -webkit-box-flex: 1;
  box-flex: 1;
  display: block;
  padding: 0 15px 5px;
}

</style>
```


2. fetch模組(sw-fetch.js) 

背後的Fetch data程式碼是採用Random的方式以達成可無限顯示資料。

```javascript
const MAX_LIMIT=10;

const baseData = [
    {id: 1, name:'Luke Skywalker',gender:'male', img:'https://goo.gl/KEUxHN'},
    //...
]

let id = 0

function pickeOne () {
    return baseData[Math.floor(Math.random() * baseData.length)]
}

function getItem () {
  return new Promise(resolve => {
    var item = pickeOne()
    item.id = ++id
    var image = new Image()
    image.src = item.img_url
    image.addEventListener('load', () => {
      resolve(item)
    })
    image.addEventListener('error', () => {
      item.img_url = ''
      resolve(item)
    })
  })
}

function query (limit, skip) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var items = []
      for (var i = 0; i < limit; i++) {
        items[i] = getItem()
      }
      resolve(Promise.all(items))
    }, 200)
  })
}

export default function fetch (limit, skip) {
  limit = Math.max(MAX_LIMIT, limit)
  return query(limit, skip)
  .then(list => {
    return {
      list: list,
      count: 1000
    }
  })
}
```

#### 開始使用vue-recyclerview

```html
 <recycler-view style="height: calc(100vh - 50px)" ref="myRecycler"
                :prerender="5"
                :fetch="Fetch" 
                :item="ListRow" ></recycler-view>
```


```javascript
import ListRow from "./components/list-row"
import Fetch from './components/sw-fetch.js'

new Vue({
    el: "#app",
    data: {
      ListRow,
      Fetch,
    };
  }
});
```

另外可利用Method:`scrollToIndex`，直接跳至指定的第N筆資料:

```
this.$refs.RecyclerView.scrollToIndex(100)
```

[Sample code]()

#### Demo

![](assets/demo1.gif)


可再參考相關的API：[Props](https://github.com/hilongjw/vue-recyclerview#props-options)。


