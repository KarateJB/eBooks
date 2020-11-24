![](https://avatars2.githubusercontent.com/u/16272733?v=3&s=200)

## Introduction

[ngrx/store](https://github.com/ngrx/store) is a state management container and powers [Redux](http://redux.js.org/) for Angular2.
It allows us to manage our application state and maintains the state of the entire application.

> The key elements of [Redux](http://redux.js.org/):
> 1. Action:
>    Actions describe WHAT happened.
> 2. Reducer
>   The reducer is a pure function that takes the previous state and an action, and returns the next state.
> 3. Store
>    The store holds state and allows the state to be updated by dispatching an action.


We will learn the concept and how `ngrx/store` works in the simple sample from [ngrx/store](https://github.com/ngrx/store) github.


## Environment

* Angular 2.1.0
* @ngrx/store  2.2.1


## Implement


#### Install packages

[@ngrx/store](https://www.npmjs.com/package/@ngrx/store)


#### State

Create an interface or class for the State.

```
interface AppState {
    counter: number;
}
```

#### Reducer

```
import { Action, ActionReducer } from '@ngrx/store';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

export const counterReducer: ActionReducer<number> = (state: number = 0, action: Action) => {
    switch (action.type) {
        case INCREMENT:
            return state + 1;

        case DECREMENT:
            return state - 1;

        case RESET:
            return 0;

        default:
            return state;
    }
}
```

#### Import the reducer to injector

* app.module.ts

```
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ProductRoutes } from './product.route';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from '../../../service/counter.action';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ProductRoutes,
        StoreModule.provideStore(counter: counterReducer)
    ],
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

In order to see the power of the `ngrx/store`, we created three routes and see of the state is persistent during changing routes.

Let us start using `Store` in component, take one of the three components for example in the following step.

#### Usage in component

* component.html

```
<div>
        <table>
            <tr>
                <td (click)="decrement()"><i class="fa fa-minus"></i></td>
                <td style="min-width:50px" class="text-center">{{counter | async}}</td>
                <td (click)="increment()"><i class="fa fa-plus"></i></td>
            </tr>
        </table>
</div>
```

* component.ts

```
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { INCREMENT, DECREMENT, RESET } from '../../../service/counter.action';


@Component({
    selector: 'product-books',
    templateUrl: '/app/component/Basic/Product/product-books.component.html'
})

export class ProductBooksComponent implements OnInit {
    private counter: Observable<number>;

    constructor(private store: Store<AppState>) {
        this.counter = store.select("counter");
        //”counter” is the store’s name we created by StoreModule
    }


    private increment() {
        this.store.dispatch({ type: INCREMENT });
    }

    private decrement() {
        this.store.dispatch({ type: DECREMENT });
    }
}
```

### Demo

![](https://1.bp.blogspot.com/-txzwdDCkv8A/WHOpJ87Y46I/AAAAAAAAEKQ/6aaVE2O1LIsaFq_qBHt9hf2VlFfb4jdGQCLcB/s1600/image002.gif)


#### Whaz next?

We will learn how to use `ngrx/store` with a shoppig cart sample in the next day-sharing.

## Reference

1. [ngrx/store](https://github.com/ngrx/store)
2. [A conceptual overview of Redux or how I fell in love with a javascript state container](http://www.youhavetolearncomputers.com/blog/2015/9/15/a-conceptual-overview-of-redux-or-how-i-fell-in-love-with-a-javascript-state-container)





