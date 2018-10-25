# v-fuse

> 使用[Fuse.js](http://fusejs.io/)做模糊查詢的元件

## Github

[shayneo/vue-fuse](https://github.com/shayneo/vue-fuse)

## 範例

### HTML

```
<vue-fuse placeholder="Search role from Star Wars" :list="starwars" :keys="['name','gender']" event-name="fuseSearch"></vue-fuse>

<table class="table">
    <tbody>
        <tr v-for="ppl in results">
            <td>{{ ppl.name }}</td>
            <td>{{ ppl.gender }}</td>
            <td><img :src="ppl.img" style="width:50px;height:50px;" /></td>
        </tr>
    </tbody>
</table>
```

### JS

```
const FOO_DATA = [{
        name: 'Luke Skywalker',
        gender: 'male',
        img: 'https://goo.gl/KEUxHN'
    },
    ...
];

var app = new Vue({
    el: "#app",
    data: {
        starwars: [],
        results: [],
    },
    created() {
        var vm = this;
        vm.starwars = FOO_DATA;

        this.$on('fuseSearch', results => {
            this.results = results
        })
    }
})
```

結果如下：

![](assets/demo.gif)


### Props

以下列出幾個較常用的屬性。

| Prop | 描述 | 型態 | 是否必要 | 預設值  |
|------------|--------------------------------------------------------|---------|------|----------|
| list | 欲搜尋的來源陣列 | Array | Yes | |
| keys | 要搜尋的Property | Array  | | |
| placeholder | placeholder | String | | |
| eventName | 當搜尋結果被更新時要emit的事件 | String  | | fuseResultsUpdated |
| defaultAll | 是否當未搜尋時顯示所有資料 | Boolean  | | true |
| caseSensitive | 大小寫是否視為不同 | Boolean  | | false |
| includeScore | 回傳結果包含得分，回傳的物件會變成：`{item:{...}, score: 0.13 }` | Boolean  | | false |
| shouldSort | 依據得分做排序 | Boolean  | | true |

可藉由`location`,`threshold`,`distance`,``,``改變模糊搜尋的係數。
完整的Props可參考作者的[Github](https://github.com/shayneo/vue-fuse#compoment-props)。


另外也可以直接觸發[Fuse.js](http://fusejs.io/)的搜尋方法：

```
Vue.prototype.$search = function (term, list, options) {
    return new Promise(function (resolve, reject) {
        var run = new Fuse(list, options)
        var results = run.search(term)
        resolve(results)
    })
}
```

- term : 要搜尋的關鍵字
- list : 資料來源陣列
- options : 提供給Fuse.js的設定，亦即上述的各種屬性值

用法(例如僅搜尋來源資料的`name`屬性)：

```
runSearch(keyword) {
    this.$search(keyword, this.starwars, {
        keys: ['name']
    }).then(result => {
        this.results = result
    })
}
```