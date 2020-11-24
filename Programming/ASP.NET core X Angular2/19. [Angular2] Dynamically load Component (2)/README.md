## Introduction

We will update our `Component-Outlet` directive and make it support **passing parameter** to the component.


## Environment

* Angular 2.1.0


## Implement


#### Update Component Outlet

Add a new input property: `inputValue`, to the `Component Outlet`.

* component-oulet.directive.ts

```
import {  Directive, Component, ComponentFactory, OnChanges, Input, ViewContainerRef, Compiler, ComponentFactoryResolver } from '@angular/core';

@Directive({
    selector: '[component-outlet]'
})
export class ComponentOutlet implements OnChanges {
    @Input() selector: string;
    @Input() inputValue: any;

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

        //Set input value for the component (optional)
        compRef.instance.inputValue = this.inputValue;

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


#### Usage

Let’s update the previous sample that users can choose the style for showing the customers’ data and HOW MANY records should be displayed.

* app.component.ts

```
<!-- New -->
<div class="col-sm-3"><input type="text" class="form-control" [(ngModel)]="maxDisplayNum" value="" /></div>

<!-- Update -->
<div component-outlet [selector]="component" [inputValue]="maxDisplayNum"></div>

```

Okay, we can pass a parameter to the `Component Outlet` and it’s time to update the target components.
Take *List style component* for example,

* list.component.ts

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
    @Input() inputValue: number;

    customers: Customer[];
    constructor(private custService: CustomerService) {
    }


    ngOnInit() {
        this.initCustomers();
    }

    private initCustomers() {
        this.custService.getAll().then(
            data => {
                this.customers = [];
                if (!this.inputValue) {
                    this.customers = data
                }
                else {
                    for (let i = 0; i < this.inputValue; i++) {
                        this.customers.push(data[i]);
                    }
                }
            });
    }
}
```


### Demo

![](https://4.bp.blogspot.com/-XeZPEKc9bdo/WGflLZxRg0I/AAAAAAAAEFQ/X42umlvlU4wpkL_-AW4eBEcVr_PblRo1gCLcB/s1600/image001.gif)


## Reference

N/A

