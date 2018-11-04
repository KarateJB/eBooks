# vue-tables-2 (2)

> 表格套件，本篇主要介紹如何設定顯示表格(欄位/資料)及範本(Template)

## Github

[matfish2/vue-tables-2](https://github.com/matfish2/vue-tables-2)


## 範例

### 更改顯示的欄位名稱

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
            let tmp =
            h('a', {
            attrs: {
                href: "https://www.starwars.com",
                target: "_blank"
            },
            on: {
                click: (e) => {
                console.log("Will open starwars.com")
                }
            },
            ref: 'starwarslink',
            }, "Photo");
            console.log(tmp);
            return tmp;
        }
    }
}
```

![](assets/002.png)


若要客製顯示欄位，例如增加一個**Checkbox欄位**以作為全選/反全選的功能，以及在**Photo**加上超連結。



