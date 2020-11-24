## Introduction

In this article, we will continue learning `ComponentFactoryResolver` and create a *dynamic-component-loader* directive (or called "*component-outlet*").

The `component-outlet` will have the ability to load any (but one) component at run-time and hence we can have much advanced usage and fun(?) with it :)


## Environment

* Angular 2.1.0


## Implement

Our goal is to show customers’ data in *LIST style* or *CARD style*, which depends on the choosing of the user. We will make use of the `Component-Outlet` to show the different styles.

* LIST

![](https://2.bp.blogspot.com/-lnHYc0hysFA/WGfivD2HrEI/AAAAAAAAEE8/48VJ8oUKTpgfRFEEQvFuiyjPZePOD8YOQCLcB/s640/image001.png)

* CARD

![](https://2.bp.blogspot.com/-dHYraeF9M_A/WGfivCVf1KI/AAAAAAAAEFA/IHwhLrom2z8AvBNShiflvbttDfdSEhD8wCLcB/s640/image002.png)


#### Component Outlet

```

import { Directive, Component, ComponentFactory, OnChanges, Input, ViewContainerRef, Compiler, ComponentFactoryResolver } from '@angular/core';

@Directive({
    selector: '[component-outlet]'
})
export class ComponentOutlet implements OnChanges {
    @Input() selector: string;

    componentRef;

    constructor(
        private vcRef: ViewContainerRef,
        private resolver: ComponentFactoryResolver) {
       
        }

    ngOnChanges() {

        if (!this.selector) return;

        const factories = Array.from(this.resolver['_factories'].values());
        const factory: any = factories.find((x: any) => x.selector === this.selector);
        const compRef:any = this.vcRef.createComponent(factory);

        if (this.componentRef) {
            this.componentRef.destroy();
        }

        this.componentRef = compRef;
    }

    public ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }
}
```

> [OnChange](https://angular.io/docs/ts/latest/api/core/index/OnChanges-class.html) will be fired while any data-bound property of a directive/component changes. For more information, see [Lifecycle hooks](https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html).


#### Main component

Okay, let’s put the directive on the main component and load `customerdynamic-list` component (or `customerdynamic-card` component) in constructor.

* app.component.ts

```
import {Component, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'

@Component({
    selector: 'customermvc-index',
    template: `
    <div class="form-group row" style="max-width:70%">
        <div class="col-sm-3"><button (click)="showLists()">Show Lists</button></div>
        <div class="col-sm-3"><button (click)="showCards()">Show Cards</button></div>
    </div>
    <div>
      <div component-outlet selector="{{component}}"></div>
    </div>
  `,
})

export class CustomerDynamicIndexComponent implements OnInit {
    private component: string;

    constructor() {
        this.component = "customerdynamic-list"; //or "customerdynamic-card"
    }

    private showLists() {
        this.component = "customerdynamic-list";
}

private showCards() {
        this.component = "customerdynamic-card";
}
}
```

> We can use property binding on the Component-Outlet directive as well.
> `<div component-outlet [selector]="component"></div>`



* list.component.ts

I will ignore the html, cus it’s not the key point here.

```
import {Component, OnInit, Input} from '@angular/core';
import {Customer} from '../../../class/Customer';
import {CustomerService} from '../../../service/customer.service';
import {RestUriService} from '../../../service/resturi.service';

@Component({
    selector: 'customerdynamic-list',
    providers: [CustomerService, RestUriService],
    templateUrl: '/app/component/Basic/CustomerDynamic/list.component.html'
})

export class CustomerDynamicListComponent implements OnInit {

    customers: Customer[];
    constructor(private custService: CustomerService) {
    }


    ngOnInit() {
        this.initCustomers();
    }

    private initCustomers() {
        this.custService.getAll().then(
            data => {
                this.customers = data
            });
    }
}
```


* card.component.ts
The `card.component.ts` is the same as list.component.ts except for their HTML.


### Demo

![](https://1.bp.blogspot.com/-jvO3BNbUa8s/WGfivSfAncI/AAAAAAAAEFE/zGxyIFdUG9gTCrnjQbf6tfPfvFrSzZOwwCLcB/s1600/image003.gif)



## Reference

N/A
