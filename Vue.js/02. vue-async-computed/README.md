# vue-async-computed

> 可支援非同步computed property的套件，支援Vue.js 2.0以上的版本

## Github

[foxbenjaminfox/vue-async-computed](https://github.com/foxbenjaminfox/vue-async-computed)


## 範例

### JS

```
Vue.use(AsyncComputed);

var app = new Vue({
    el: "#app",
    data: {

    },
    asyncComputed: {
        options: {
            get: function () {
                var vm = this;
                let options = [];
                return new Promise(function (resolve, reject) {
                    vm.getHfFrequencyOptions().then(function (response) {

                        if (response.data) {
                            response.data.forEach(function (item) {
                                options.push({
                                    text: item.name,
                                    value: item.id
                                });
                            });
                        }

                        resolve(options);

                    }));
                });
            },
            default: function () {
                return [{ text: 'Loading...', value: '0' }];
            }
        }
    }
}
```

### HTML

```
<div>
 <select>
    <option v-for="item in options" :value="item.value">
        {{ item.text }}
    </option>
 </select>
</div>
```



## Demo

![](assets/demo.gif)

