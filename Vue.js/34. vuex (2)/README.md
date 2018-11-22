# vuex (2)

> Vue.js官方的狀態管理套件，本篇說明進階的**Mutations**用法及透過Dispatch **Actions**來引發Mutations

## Github

[vuejs/vuex](https://github.com/vuejs/vuex)

## Commit Mutations with Payload

在觸發Mutations可另外傳遞參數，也就是Payload。
例如下面程式碼中，我們可透過Payload決定這次`count`加上的值，或是預設加`1`；

> 通常會指定Payload為object

#### Vuex instance

```javascript
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increment (state, payload) {
        if(payload) state.count += payload;
        else state.count++;
      },
      //...skip
    }
})
```

#### Usage

讓狀態裡的`count`直接加`10`:

```javascript
let amt = 10;
store.commit("increment", amt);
```


## Use mapMutations to commit mutations

透過[注入vuex store到所有子元件](https://github.com/KarateJB/eBooks/tree/master/Vue.js/33.%20vuex%20(1)#%E6%B3%A8%E5%85%A5vuex-store%E5%88%B0%E6%89%80%E6%9C%89%E5%AD%90%E5%85%83%E4%BB%B6)，我們可以以全域方式取得或操作vuex store: `this.$store.state.count`；

另可透過[mapMutations](https://vuex.vuejs.org/guide/mutations.html#committing-mutations-in-components)來對應自訂的方法名稱至Mutations:

```javascript
import { mapMutations } from "vuex";

var app = new Vue({
  el: '#app',
  methods: {
    ...mapMutations({
      add: "increment", // Map `this.add()` to `this.$store.commit('increment')`
      minus: "decrement", // Map `this.add()` to `this.$store.commit('decrement')`
      clear: "reset" // Map `this.add()` to `this.$store.commit('reset')`
    })
  },
})
```

這時候就可以使用自訂方法名稱來commit Mutations:

```javascript
this.add(10); //10 is the optional payload
this.minus();
this.clear();
```

也可以直接使用Mutations的原名稱作為自訂方法名稱：

```javascriptmethods: {
methods: {
    ...mapMutations({
      "increment", // Map `this.increment()` to `this.$store.commit('increment')`
      "decrement", // Map `this.decrement()` to `this.$store.commit('decrement')`
      "reset" // Map `this.reset()` to `this.$store.commit('reset')`
    })
}
```

## Actions

[Actions](https://vuex.vuejs.org/guide/actions.html)用於Commit Mutations，可為asynchronous(非同步)操作。

### Get started

#### vuex store

```javascript
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';
export const RESET = 'reset';

export const store = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increment (state, payload) {
        if(payload) state.count += payload;
        else state.count++;
      },
      decrement(state){
          if(state.count > 0)
            state.count--;
      },
      reset(state){
          state.count= 0;
      }
    },
    actions: {
      increment (context, payload) {
        context.commit('increment', payload);
      },
      decrement(context){
        context.commit('decrement');
      },
      reset(context){
        context.commit('reset');
      }
    }
})
```

#### Usage

可以在Component透過import singleton store或注入的store來disptach Actions； 

```javascript
//import singleton store
store.dispatch('increment',10); //10 is the payload
store.dispatch('decrement');

//Injected store
this.$store.dispatch('increment',10); //10 is the payload
this.$store.dispatch('decrement');
```


### When Payload is object

若Payload為物件，例如`myPayload={amt:10}`，則可以使用下列任一寫法：

```javascript
//1.
store.dispatch('increment', myPayload)
//2.
store.dispatch('increment', {amt:10})
//3.
store.dispatch({
    type: "increment",
    amt: 10
});
```

### Asynchronous Actions

#### 使用promise

```javascript
actions: {
      increment (context, payload) {

        return new Promise((resolve, reject) => {
          setTimeout(() => {
            context.commit('increment', payload);
            resolve();
          }, 3000)
        })
      },
      //...
}
```


#### 使用async/await


```javascript
actions: {
  async increment (context) {
    context.commit('increment', await getPayload());
  }
  //...
}
```

其中我們假設`getPayload`回傳promise如下範例：

```javascript
//Assume that getPayload() return promise as following
const getPayload = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(10);
    }, 3000)
  })
}
```

#### Dispatch async Actions

```javascript
store.dispatch("increment", amt).then(function(){
  alert("Async increment is done!");
});
```



## Use mapActions to dispatch actions


我們亦可在[注入vuex store到所有子元件](https://github.com/KarateJB/eBooks/tree/master/Vue.js/33.%20vuex%20(1)#%E6%B3%A8%E5%85%A5vuex-store%E5%88%B0%E6%89%80%E6%9C%89%E5%AD%90%E5%85%83%E4%BB%B6)後，使用[mapActions](https://vuex.vuejs.org/guide/actions.html#dispatching-actions-in-components)來對應自訂的方法名稱至Actions:

```javascript
import { mapActions } from "vuex";

var app = new Vue({
  el: '#app',
  methods: {
    ...mapActions({
      add: "increment", // Map `this.add()` to `this.$store.dispatch('increment')`
      minus: "decrement", // Map `this.add()` to `this.$store.dispatch('decrement')`
      clear: "reset" // Map `this.add()` to `this.$store.dispatch('reset')`
    })
  },
})
```

如此可直接使用自訂方法Dispatch Actions:
```javascript
this.add(10) //10 is Payload
this.minus()
```


## Getters

雖然我們可以在Component裡面針對Vuex的狀態(State)利用Computed property來做進一步的取值或其他篩選動作，但缺點是如果是其他Component也需要用到的話就無法共用。 這時候就可以在Vuex instance裡面建立[Getters](https://vuex.vuejs.org/guide/getters.html)，把共用的Computed property邏輯放在Getters已讓所有Components共用。


#### Vuex store

範例程式碼：

```javascript
class ShopCart {
    constructor() {
        this.items = [];
        this.totalCnt = 0; //Total count for all items in shopcart
        this.totalPrice = 0; //Total pricing for all items in shopcart
    }
}

const store = new Vuex.Store({
  state: new ShopCart(),
  mutations: {
    //...skip
  },
  getters: {
    totalCnt(state) {
      return state.totalCnt;
    },
    totalPrice(state) {
      return state.totalPrice;
    },
    item: (state) => (id) => {
      return state.items.find(x => x.id === id);
    }
    //The above code equals to 
    // item(state) {
    //   return (id) => {
    //     return state.items.find(x => x.id === id);
    //   }
    // }
  }
})
```

注意'item'這個Getter指定需要傳入了參數：`id`。
當建立好Getters後，我們即可在Components使用：

```javascript
let total = {
  cnt: store.getters.totalCnt,
  price: store.getters.totalPrice
};

let item = store.getters.item(this.targetId);
```


### mapGetters

另外我們也可以使用透過[mapGetters](https://vuex.vuejs.org/guide/getters.html#the-mapgetters-helper)，以[object rest/spread operator](https://tc39.github.io/proposal-object-rest-spread/)宣告在Computed properties:

```javascript
computed: {
    // Other computed props    
    ...mapGetters({
      totalCnt: "totalCnt",
      totalPrice: "totalPrice",
      targetItem: "item"
    })
  }
```

即可在以一般的Computed prop方式取值，

```javascript
console.info(this.totalCnt);
console.info(this.totalPrice);
let item = this.targetItem(this.targetId));
```


也可使用預設的Getters名稱：

```javascript
computed: {
    // Other computed props    
    ...mapGetters([
      "totalCnt","totalPrice","item"
    ])
  }
```

