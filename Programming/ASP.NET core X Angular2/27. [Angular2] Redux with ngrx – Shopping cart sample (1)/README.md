![](https://2.bp.blogspot.com/-nxyRIK-iah4/WHPP9B_qygI/AAAAAAAAELA/m9Zf2Zwxn6UO1BAB1H3e2WPSkkucAmydQCLcB/s1600/image001.jpg)

## Introduction

I will use [ngrx/store](https://github.com/ngrx/store) to implement a shopping cart example from my previous articles,

* [[ASP.NET Core X Angular2] Sub-routing](http://ithelp.ithome.com.tw/articles/10187589)
* [[ASP.NET Core X Angular2] Firebase integration (1)](http://ithelp.ithome.com.tw/articles/10187907)


## Environment

* Angular 2.1.0
* @ngrx/store  2.2.1


## Implement


Before we implement the shopping cart, the application currently is looked like this,

![](https://4.bp.blogspot.com/-zu6DMSrQDwk/WHPPURM6mPI/AAAAAAAAEK0/YKtxB6-6QD4ND5oywtXD7hf4_JaGXXXWQCLcB/s1600/image002.gif)


#### Install packages

1. [@ngrx/store](https://www.npmjs.com/package/@ngrx/store)
2. [ng2-toastr](https://www.npmjs.com/package/ng2-toastr)
3. [font-awesome](https://www.npmjs.com/package/font-awesome)


#### Booking component

Let’s create a component for booking a single product like this,

![](https://1.bp.blogspot.com/-3TM8Y2GbR4Y/WHPPKwsIxkI/AAAAAAAAEKw/VMTPhdqCoi0LbrE4qkGio0FpuNqkuhGDwCLcB/s1600/image003.png)

* ShopItem.ts

```
export class ShopItem {
    count: number; //Counter
    price: number; //Cash summary
}
```


* product-booking.component.ts

```
import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from '../../../class/Product';
import { ShopItem } from '../../../class/ShopItem';

@Component({
    selector: 'product-booking',
    template: `
               <table>
                 <tr>
                   <td (click)="decrement()"><label style="min-width:25px"><i class="fa fa-minus"></i></label></td>
                   <td><input style="max-width:50px" readonly="readonly" type="text" value="{{shopItem.count}}"/></td>
                   <td (click)="increment()"><label style="min-width:25px"><i class="fa fa-plus"></i></label></td>
                 </tr>
               </table>
              `
})

export class ProductBookingComponent implements OnInit {


    @Input('price') price: number;
    private shopItem: ShopItem = null;

    constructor() {

        this.shopItem = new ShopItem({ 'count': 0, 'price': this.price });
    }

    private increment() {
        this.shopItem.count += 1;
    }

    private decrement() {
        this.shopItem.count -= 1;       
    }
}
```

Then put the `ProductBookingComponent` into all three product components' HTML:
1. Books
2. Toys
3. Music

Take `ProductBooksComponent` for example,

* product-books.component.html

```
<div>
    <table class="table table-bordered table-hover">
        <thead>
            <tr>
                <th class="text-center">ID</th>
                <th class="text-center">Title</th>
                <th class="text-center">Price</th>
                <th>Shopping Cart</th>
                <th></th>
            </tr>
        </thead>
        <tr *ngFor="let prod of books">
            <td>{{prod.Id}}</td>
            <td>{{prod.Title}}</td>
            <td>{{prod.Price}}</td>
            <td><product-booking [price]="prod.Price"></product-booking></td>
            <td>
                <input type="button" value="Edit" class="btn btn-info" (click)="edit(prod)" />
                 
                <input type="button" value="Remove" class="btn btn-danger" (click)="remove(prod)" />
            </td>
        </tr>
    </table>
</div>
```

Result : 

![](https://2.bp.blogspot.com/-V8JJds2jR0M/WHPO8BFIF3I/AAAAAAAAEKs/R7P9xObu-B0OvG3upXF_7H960fle0h68wCLcB/s1600/image004.png)


#### Shopping Cart : State

We would like to have a shopping cart, which can stores how many items we orders and how much totally cost.

Yes! We can use `Redux` pattern here to stores the shopping cart state.
Furthermore,  while the state (shopping cart) changes by the `ProductBookingComponent`, emit the current state (shopping cart) to parent components.

First, create a State interface/class.

* IShopCart.ts

```
export interface IShopCart {
    cnt: number; //total booking counter
    sum: number; //total cost
}
```


* ShopCart.ts

```
import { IShopCart } from '../interface/IShopCart';

export class ShopCart implements IShopCart {
    cnt: number;
    sum: number;

    constructor() {
        this.cnt = 0;
        this.sum = 0;
    }
}
```


#### Shopping Cart : Reducer

* shopcart.action.ts

```
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
            return state;

        default:
            return state;
    }
}


export function pushToCart(shopcart: ShopCart, payload: ShopItem) {
    shopcart.cnt += 1;
    shopcart.sum += payload.price * 1;
    return shopcart;
}

export function pullFromCart(shopcart: ShopCart, payload: ShopItem) {
    shopcart.cnt -= 1;
    shopcart.sum -= payload.price * 1;
    return shopcart;
}
```

> Notice that,
> 1. The state is a `ShopCart` object.
> 2. The reducer needs to know who/what is updating the state thru the information in `action payloads`.Import the reducer to injector




#### Import the reducer to injector

Use `StoreModule.provideStore(shopcart: shopcartReducer)`
or if you have multiple reducers, import them like this,

```
//skip...
import { ProductBookingComponent } from './product-booking.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from '../../../service/counter.action';
import { shopcartReducer } from '../../../service/shopcart.action';


let rootReducer: any = {
    counter: counterReducer,
    shopcart: shopcartReducer
}


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ProductRoutes,
        StoreModule.provideStore(rootReducer)
    ],
    declarations: [
        //skip...
        ProductBookingComponent
    ],
    providers: [
        //skip...
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```


#### Update ProductBookingComponent

* product-booking.component.ts

```
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
    selector: 'product-booking',
    template: `
               <table>
                 <tr>
                   <td (click)="decrement()"><label style="min-width:25px"><i class="fa fa-minus"></i></label></td>
                   <td><input style="max-width:50px" readonly="readonly" type="text" value="{{shopItem.count}}"/></td>
                   <td (click)="increment()"><label style="min-width:25px"><i class="fa fa-plus"></i></label></td>
                 </tr>
               </table>
              `
   
})

export class ProductBookingComponent implements OnInit {

    @Input('price') price: number;
    @Output('emit-events') emitEvents = new EventEmitter<ShopCart>(true);

    private shopItem: ShopItem = null;
    private shopcart: Observable<IShopCart>;

    constructor(private store: Store<IShopCart>) {

       this.shopItem = new ShopItem({ 'count': 0, 'price': this.price });

        this.shopcart = store.select("shopcart");
    }

    private increment() {
        this.shopItem.count += 1;
        this.store.dispatch({ type: PUSH, payload: this.shopItem });

        this.shopcart.subscribe(data => {
            this.emitEvents.emit(data);
        });

    }

    private decrement() {
        this.shopItem.count -= 1;
        this.store.dispatch({ type: PULL, payload: this.shopItem });

        this.shopcart.subscribe(data => {
            this.emitEvents.emit(data);
        });
       
    }
}
```


#### Update Parent Components (Books,Toys and Music)

* product-books.component.html (Update)

```
<!-- skip... -->
<product-booking [price]="prod.Price" (emit-events)="setShopCart($event)"></product-booking>
<!-- skip... -->
```


* product-books.component.ts (Update)

```
//skip...

private setShopCart(data: ShopCart) {
    this.toastr.info(data.cnt + ' items, total $' + data.sum, 'Shopping Cart', this.toastrOptions);
}
```


### Demo

![](https://2.bp.blogspot.com/-KLjrkjdQzik/WHPOqQZyseI/AAAAAAAAEKo/ZTmgu2wx_l0Bep5pV-3ZqkFK-B5i-mv2gCLcB/s1600/image005.gif)


#### Whaz next?

You may find that although we store the total counts and prices in the state (shopping cart), we does not have the information of individual product in the state.

We will fix it and complete the sample in the next day :)


## Reference


1. [ngrx/store](https://github.com/ngrx/store)
