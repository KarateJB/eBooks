# iView - AutoComplete

> 一套基於 Vue.js 的高質量UI 組件庫，此篇介紹Input輸入框


## Github

[iview/iview](https://github.com/iview/iview)


## 範例

### 具有清空按鈕之輸入框

```
<i-input v-model="myValue" clearable  />
```

### 自訂按鈕之輸入框

可使用`Prop`或`Slot`的前後顯示方式：

```
<i-input v-model="me.name" prefix="ios-contact"  />
<i-input v-model="me.name" suffix="ios-contact"  />
```

````
<i-input v-model="me.name">
    <icon type="ios-contact" slot="prefix" />
</i-input>
<i-input v-model="me.name">
    <icon type="ios-contact" slot="suffix" />
</i-input>
```

### 加入點選按鈕事件

```
<!-- Birthday -->
<i-input v-model="me.birthday" 
                             icon="ios-arrow-dropright-circle" 
                             @on-click="giveAge(me.birthday)" />
<!-- Age -->
<i-input v-model="me.age" type="number" />
```

```
var app = new Vue({
    el: "#app",
    data: {
        me: {
            name: "",
            birthday: "",
            age: null,
            gender: ""
        }
    },
    methods: {
        giveAge(birthday){
            if(birthday)
                this.me.age = this.calAge(birthday);
        },
        calAge(targetDate) {
            var today = new Date();
            var birthDate = new Date(targetDate);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
    }
})
```
