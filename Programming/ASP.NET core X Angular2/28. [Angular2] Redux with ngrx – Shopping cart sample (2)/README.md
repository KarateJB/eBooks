![](https://4.bp.blogspot.com/-nxyRIK-iah4/WHPP9B_qygI/AAAAAAAAELE/JYts8C9ZVogWryG4YuxW-lCUTf_BJ3-owCPcB/s1600/image001.jpg)

## Introduction

In the previous practice, we had successfully created an Angular2 app with [ngrx/store](https://github.com/ngrx/store) to maintain and manage the shopping cart state in our application.

Let’s improve the application by storing the individual product’s information in the state, and therefore we can show what a user are going to buy from the shopping cart.


## Environment

* Angular 2.1.0
* @ngrx/store  2.2.1


## Implement


#### Update state class

* ShopCart.ts

Add a `ShopItem[]` array into the `ShopCart` class.

```
import { IShopCart } from '../interface/IShopCart';
import { ShopItem } from '../class/ShopItem';

export class ShopCart implements IShopCart {
    items: ShopItem[];
    cnt: number;
    sum: number;

    constructor() {
        this.items = [];
        this.cnt = 0;
        this.sum = 0;
    }
}
```

* ShopItem.ts

Also we should keep the `id` and `title` of the item we put into the shopping cart.

```
export class ShopItem {
    id: string; //Product ID
    title: string; //Product name
    count: number; //Counter
    price: number; //Cash summary
}
```


#### Update reducer

We should implement the following logic in actions.
1. When pushing an item into the shopping cart,
   * If the item is first time being push, add it to the state.
   * Or update the count of the item in the state.
2. When pulling an item from the shopping cart,
   * Update the count of the item in the state.
   * Check if the item’s count equals zero, if yes, remove the item from the state.


* shopcart.action.ts

```
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Action, ActionReducer } from '@ngrx/store';
import { IShopCart } from '../interface/IShopCart';
import { ShopCart } from '../class/ShopCart';
import { ShopItem } from '../class/ShopItem';

export const PUSH = 'PUSH';
export const PULL = 'PULL';
export const CLEAR = 'CLEAR';

export const shopcartReducer: ActionReducer<IShopCart> = (state: ShopCart = new ShopCart(), action: Action) => {
    switch (action.type) {
        case PUSH:
            return pushToCart(state, action.payload);

        case PULL:
            return pullFromCart(state, action.payload);

        case CLEAR:
            state.cnt = 0;
            state.sum = 0;
            state.items = [];
            return state;

        default:
            return state;
    }
}


function pushToCart(shopcart: ShopCart, payload: ShopItem) {
    shopcart.cnt += 1;
    shopcart.sum += payload.price * 1;
    updateItems(shopcart, payload);
    return shopcart;
}

function pullFromCart(shopcart: ShopCart, payload: ShopItem) {
    shopcart.cnt -= 1;
    shopcart.sum -= payload.price * 1;
    updateItems(shopcart, payload);
    return shopcart;
}


function updateItems(shopcart: ShopCart, payload: ShopItem) {
    let targetItem = shopcart.items.find(item => item.id === payload.id);
    if (targetItem) { //Exist
        if (payload.count <= 0) {
            var index = shopcart.items.indexOf(targetItem);
            shopcart.items.splice(index, 1);
        }
        else {
            targetItem.count = payload.count;
        }
    }
    else { //First time adding to shopping cart
        shopcart.items.push(payload);
    }
}
```

Okay, it's done. We have successfully made the state supports maitaining the individual product information.

Let’s create a new component for showing the items in the shopping cart.


#### Showing shopping cart

* shopcart.component.ts

```
import { Component, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { PUSH, PULL, CLEAR } from '../../../service/shopcart.action';
import { IShopCart } from '../../../interface/IShopCart';
import { ShopCart } from '../../../class/ShopCart';
import { ShopItem } from '../../../class/ShopItem';

@Component({
    selector: 'shop-cart',
    providers: [],
    template: `
                   <div><button class="btn btn-default" (click)="goToProducts()"><i class="fa fa-ra"></i> Back </button></div>
                   <div>
                   <table class="table table-inverse">
                     <thead>
                        <tr>
                            <th>Product</th>
                            <th>Number</th>
                            <th>Price/per</th>
                            <th>Total Price</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr *ngFor="let item of (shopcart | async)?.items">
                          <td>{{item.title}}</td>
                          <td>{{item.count}}</td>
                          <td>{{item.price}}</td>
                          <td>{{item.count * item.price}}</td>
                        </tr>
                     </tbody>
                   </table>
                   </div>
                 `
})

export class ShopcartComponent implements OnInit {

    private shopcart: Observable<IShopCart>;

    constructor(
        private router: Router,
        private store: Store<IShopCart>
    ) {
        //Get the reducer
        this.shopcart = store.select("shopcart");
    }
}
```


#### Using the curren state

Last step, we will use the current state to get the items in the shopping cart, and then update the display value in the view. 

![](https://2.bp.blogspot.com/-lMDtPnI5P98/WHT_4R284OI/AAAAAAAAELY/LC4jjhJkSKMokMavD7Ewna5FKbkBf6_tQCLcB/s1600/image002.png)

Take `ProductBooksComponent` for example,


* product-books.component.ts (Update)

```
ngOnInit() {
    this.initBooks();
    this.initToastrOptions();
}

//Initialize books
private initBooks() {
    this.productService.getBooks().then(data => {
        this.books = data;

        //Use shopping cart to update data
        this.shopcart.subscribe(cart => {
            this.books.forEach(item => {
                let storeItem = cart.items.find(x => x.id === item.Id);
                if (!storeItem) {
                    this.itemNumbers[item.Id] = 0;
                }
                else {
                    this.itemNumbers[item.Id] = storeItem.count;
                }
            });
        })
    })
}
```

#### Save the state (Shopping cart)

Everything is done for our shopping cart, all we have to do is send the state's information to backend after user clicks a save button or whatever.

(I will skip this practice … :)


### Demo

![](https://1.bp.blogspot.com/-b7CwKT9iUP8/WHUAAIEtnxI/AAAAAAAAELc/tYuoMUDJNVgASSieY1sBhHXH-TbURoWNwCLcB/s1600/image003.gif)



## Reference

1. [ngrx/store](https://github.com/ngrx/store)

