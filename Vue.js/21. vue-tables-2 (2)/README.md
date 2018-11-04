# vue-tables-2 (2)

> 表格套件，本篇主要介紹如何設定顯示表格(欄位/資料)及範本(Template)

## Github

[matfish2/vue-tables-2](https://github.com/matfish2/vue-tables-2)


## 範例

延續上一篇的範例程式碼，來實作客製**欄位名稱**及**表格資料顯示**。


### 客製欄位名稱

```html
<v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
```

使用[options](https://github.com/matfish2/vue-tables-2#options): `headings`。


```javascript
data: {
      columns: ["id", "name", "gender","img"],
      options: {
        headings: {
                id: "ID",
                name: "Name",
                gender: "Gender",
                img: "Photo"
            }
 
      }
}
```

![](assets/001.png)



若要客製顯示欄位，例如在**Photo**欄位上加上超連結，可透過在`headings`回傳[virtual DOM](https://github.com/snabbdom/snabbdom)，方式如下

```javascript
return h('<current html's tag>', {<current html's props/style/event>}, [<inner html's h(...)> or value])
```

實作如下程式碼：

```javascript
options: {
    headings: {
            img: function (h) {
                return h('a', {
                            attrs: {
                                href: "https://www.starwars.com",
                                target: "_blank"
                            },
                            ref: 'starwarslink',
                            }, "Photo");
            }
    }
}
```

![](assets/002.png)



### 客製表格資料顯示

我們將調整以下欄位值的顯示方式：
1. Name(名稱) : 超連結文字，點選後切換至編輯頁面
2. Img(圖片) : 直接顯示圖片，而非圖片的網址

以[Scoped Slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots)來取得表格資料並以新的顯示格式指定給對應欄位名稱的Slot：

```html
<v-client-table ref="myTable" :data="tableData" :columns="columns" :options="options">
    <template slot="name" slot-scope="props">
        <a @click="edit(props.row.id)">{{ props.row.name }}</a>
    </template>
    <template slot="img" slot-scope="props">
        <img style="width:50px;height:50px;" :src="props.row.img" :alt="props.row.name" />
    </template>
</v-client-table>
```

Vue.js 2.5.0+ 之後的版本, `slot-scope`可不需寫在`<template>`內，因此以上程式碼可簡化為︰

```html
<v-client-table ref="myTable" :data="tableData" :columns="columns" :options="options">
    <a slot="name" slot-scope="props" @click="edit(props.row.id)">
    {{ props.row.name }}
    </a>
    <img slot="img" slot-scope="props" style="width:50px;height:50px;" :src="props.row.img" :alt="props.row.name" />
</v-client-table>
```

結果：

![assets/003.png]


若要客製顯示欄位，例如增加一個**Checkbox欄位**以作為全選/反全選的功能，以及在**Photo**加上超連結。