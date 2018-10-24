# v-mask

> 輸入框限制格式元件，例如當使用者輸入電話號碼"0911123456"，可主動讓其輸入值轉換為"0911-123-456"

## Github

[probil/v-mask](https://github.com/probil/v-mask)

## 格式限制指定值

| 符號 | 符合值域 |
|:----:|:--------|
| # | 數字 |
| A | 字母 (a-z, A-Z) |
| N | 數字或字母 |
| X | 任意 |
| ? | 表示下個限制符號非必要 |

## 範例

### JS

```
Vue.use(VueMask.VueMaskPlugin);

var app = new Vue({
    el: "#app",
    data:{
        me: {
            nameZh: null,
            nameEn: null,
            birthday: null,
            age: null,
            phone: null
        }
    },
    mounted() {
    }
})
```

### HTML

```
<input type="text" class="form-control" id="name" v-model="me.nameZh" v-mask="'XX?X?X?X?X'">
<input type="text" class="form-control" id="name" v-model="me.nameEn" v-mask="'A?A?A?A?A?A?A?A?A'">
<input type="text" class="form-control" id="birthday" v-model="me.birthday" placeholder="yyyy/MM/dd" v-mask="'####/##/##'">
<input type="text" class="form-control" id="age" v-model="me.age" placeholder="0-999" v-mask="'#?#?#'">
<input type="text" class="form-control" id="phone" v-model="me.phone" placeholder="ex. 0922123456" v-mask="'####-###-###'">
```


輸入後結果：

![](assets/001.png)


