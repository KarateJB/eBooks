# iView - AutoComplete

> 一套基於 Vue.js 的高質量UI 組件庫，此篇介紹AutoComplete(自動完成)

## Github

[iview/iview](https://github.com/iview/iview)

## 基本範例

### HTML

```
<auto-complete v-model="keyword" 
              :data="matches" 
              @on-search="search" 
              placeholder="Select your favorite role">
</auto-complete>
```

### JS

```

const FOO_DATA = [
    'Luke Skywalker',
    'Leia Skywalker',
    ...
];

var app = new Vue({
    el: "#app",
    data: {
        starwars: [],
        keyword: "",
        matches: []
    },
    methods: {
        search(value){
            this.matches = this.starwars.filter(x=>x.startsWith(value));
        }
    },
    created() {
        this.starwars = FOO_DATA;
    }
})
```

## 使用Slot自定義顯示資料


