# vue-tables-2

> 表格套件

## Github

[matfish2/vue-tables-2](https://github.com/matfish2/vue-tables-2)


## 範例

### 註冊元件


註冊的方式：

```javascript
import {ServerTable, ClientTable, Event} from 'vue-tables-2';
Vue.use(ClientTable, {}, false, 'bootstrap3', 'default');
```

或直接引用JS檔，

```html
<script src="https://cdn.jsdelivr.net/npm/vue-tables-2@1.4.70/dist/vue-tables-2.min.js"></script>

<script>
//Vue.use(VueTables.ClientTable);
Vue.use(VueTables.ClientTable, {}, false, 'bootstrap3', 'default');
</script>
```


可額外指定參數：

```javascript
Vue.use(ClientTable, [options = {}], [useVuex = false], [theme = 'bootstrap3'], [template = 'default']);
```

例如：
```
Vue.use(ClientTable, {}, false, 'bootstrap3', 'default');
```

| Option | Description | Type | Default |
|:-------|:------------|:----:|:-------:|
| options  | | Object | {} |
| useVuex  | 是否使用[Vuex](https://vuex.vuejs.org/)做狀態管理 | Boolean | false |
| theme    | 選擇CSS framework，可為`bootstrap3`,`bootstrap4`,`bulma` | String | 'bootstrap3' |
| template | 選擇HTML樣板，例如`default`,`footerPagination`  | String | 'default' |


### 建立表格資料

#### HTML

```html
<v-client-table ref="myTable" :data="tableData" :columns="columns" :options="options"></v-client-table>
```


#### JS

```javascript
const FOO_DATA = [
    {id: 1, name:'Luke Skywalker',gender:'male', img:'https://goo.gl/KEUxHN'},
    ...
];

export default {
  name: "app",
  data() {
    return {
      columns: ["id", "name", "gender"],
      tableData: [],
      options: {}
    };
  },
  created() {
    this.tableData = FOO_DATA;
  }
};
```

#### Demo

![](assets/demo1.gif)


若要取得目前已篩選的表格資料，可使用`ref`屬性以取得

1. allFilteredData: 所有已篩選資料 
2. filteredData: 目前分頁上的已篩選資料

```html
<v-client-table ref="myTable" :data="tableData" :columns="columns" :options="options"></v-client-table>
```

```javascript
//Get the filtered table data on current page
let showFilteredCurrentPageData =
      this.$refs.myTable.filteredData;

//Get the filtered table data on all pages
let showFilteredData = 
      this.$refs.myTable.allFilteredData;
```


