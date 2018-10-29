# iView - Input

> 一套基於 Vue.js 的高質量UI 組件庫，此篇介紹Carousel(跑馬燈)


## Github

[iview/iview](https://github.com/iview/iview)


## 範例

設定`autoplay`後可自動從指定的該筆(`value`值)開始以`autoplay-speed`指定的毫秒輪播。
`loop`表示開啟循環。

### HTML

```html
<carousel autoplay loop autoplay-speed="2000" v-model="current">
    <carousel-item v-for="item in starwars">
        <div class="card" >
            <div class="card-body"><h3>{{ item.name }}</h3></div>
            <img class="card-img-bottom" :src="item.img" style="width:100%;height:100%">
        </div>
    </carousel-item>
</carousel>
```

### JS

```javascript

const FOO_DATA = [
    {name:'Luke Skywalker',gender:'male', img:'https://goo.gl/KEUxHN'},
    //...
];


var app = new Vue({
    el: "#app",
    data: {
        current: 0,
        starwars:[]
    },
    methods: {
    },
    created() {
        this.starwars = FOO_DATA;
    }
})
```

### Demo

![](assets/demo1.gif)



### 其他設置

| Prop | 描述 | 型態 | 是否必要 | 預設值  |
|------------|---------------------------------------------------------|---------|------|----------|
|  dots     | 指示器的位置，`inside`：内部，`outside`：外部，`none`：隱藏 | String  |      | "inside"  |
|  trigger	| 指示器的觸發方式，可為`click`或`hover`	                 | String  |      | "click"  |
|  arrow    | 顯示切換箭頭的方式，可為`hover`，`always`，`never`          | String  |      | "hover"  |


例如以下HTML：

```html
<carousel loop dots="outside" trigger="hover" arrow="always" easing="ease" v-model="current" >
    <carousel-item v-for="item in starwars">
        <div class="card" >
            <div class="card-body"><h3>{{ item.name }}</h3></div>
            <img class="card-img-bottom" :src="item.img" style="width:100%;height:100%">
        </div>
    </carousel-item>
</carousel>
```

結果如下：

![](assets/demo2.gif)


其他API可參考：[Props](https://www.iviewui.com/components/carousel#Carousel_props)及[Events](https://www.iviewui.com/components/carousel#Carousel_events)