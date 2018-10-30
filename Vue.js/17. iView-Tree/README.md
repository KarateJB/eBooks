# iView - Tree

> 一套基於 Vue.js 的高質量UI 組件庫，此篇介紹Tree(樹狀顯示器)


## Github

[iview/iview](https://github.com/iview/iview)


## 範例

### HTML

```html
<tree :data="starwars" @on-select-change="selected"></tree>
```

### JS

以階層的方式定義資料：
* `title`: 顯示的值
* `children`: 下一階層的資料
* `expand`: Boolean，預設是否顯示下一層，預設為`false`
* `disabled: true`: 禁用該筆資料 (Optional)

```

const FOO_DATA = [
    {
        title: 'Bright side',expand: true,
        children: [
            {
                title: 'Male', expand: true,
                children: [
                    { title: 'Luke Skywalker', img: 'https://goo.gl/KEUxHN' }
                ]
            },
            {
                title: 'Female', expand: true,
                children: [
                    { title: 'Leia Skywalker', img: 'https://goo.gl/rNJhLU' }
                ]
            }
        ]
    },
    {
        title: 'Dark side', expand:false,
        children: [
            {
                title: 'Male',
                children: [
                    { title: 'Darth Vader', img: 'https://goo.gl/xcMHqj' }
                ]
            },
            {
                title:'Female', disabled: true,
                children: [
                    { title: 'Asajj Ventress', img: 'https://goo.gl/pr19sJ' }
                ]
            }
        ]
    }

];


var app = new Vue({
    el: "#app",
    data: {
        starwars: [],
        selectedNode: null,
    },
    methods: {
        selected(selectedItem){
            this.selectedNode = selectedItem[0];
        }
    },
    created() {
        this.starwars = FOO_DATA;
    }
})
```

![](assets/001.png)