## Introduction

We will try creating the sub component and connect the information between it and its parent component.

## Environment

* Visual Studio 2015 Update 3
* NPM: 3.10.3                                    
* Microsoft.AspNetCore.Mvc 1.0.0
* angular 2: 2.1.0

## Create Sub-component

Extending the previous example, we want to show the customer's details inside the customer.index.component.html

So here what we are going to do
1. Create `Customer class` for strong typed programming
2. Create detail component
3. Send the selected customer to `detail component`
4. Hide the list of customers and display the selected customer's detail

#### Customer class

* /app/class/Customer.ts

```
export class Customer {
    Id: number;
    Name: string;
    Phone: string;
    Age: number;
}
```

Because the class is not under the same path of customer components, 
we have to load it thru `Systemjs`. Open `/app/systemjs.config.js` and add the new settings for all the class within `/app/class`

* systemjs.config.js

```
System.config({
    transpiler: 'typescript',
    typescriptOptions: { emitDecoratorMetadata: true },
    map: {
        //Skip…
'class': 'app/class'
    },
    paths: {
        //Skip…
        "class:*": "app/class/*.js"
    },
    packages: {
        //Skip…
        'class': { main: '*.js', defaultExtension: 'js' }
    }
});
```

#### Create Customer detail component

We are going to make a `child component`: **Customer detail**, for `main component`: **Cusomter index**.
When clicking on the customer's name, hide the customers' list and display the content of `child component`.

* /app/Basic/Customer/customer-detail.component.ts

```
import {Component, OnInit, Input} from '@angular/core';
import {Customer} from '../../class/Customer';
@Component({
    selector: 'customer-detail',
    templateUrl: '/app/Basic/Customer/customer-detail.component.html',
    styleUrls: ['/app/Basic/Customer/customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

    @Input('selectedCustomer') customer: Customer;
    constructor() {
    }

    ngOnInit() {
    }
}
```

Notice that we have an *INPUT VARIABLE*: `customer`, alias name: `selectedCustomer`, in the child component.

Then import it to `customer.app.module`.

* /app/Basic/Customer/customer.app.module.ts

```
//Skip...
import {CustomerDetailComponent} from './customer-detail.component';
@NgModule({
    //Skip...
    declarations: [CustomerAppComponent, CustomerIndexComponent, CustomerCreateComponent, CustomerEditComponent, CustomerDetailComponent],
})
//...
```

#### Update Customer Index Component

* /app/Basic/Customer/customer.index.component.html

```
<div [hidden]="selectedCustomer">   
    <div>
        <input type="button" class="btn btn-primary" value="Create New" (click)="goToCreate()" />
    </div>
    <br />
    <div>
        <table class="table table-bordered table-hover">
            <thead><tr>
                    <td>ID</td>
                    <td class="text-center">Name</td>
                    <td class="text-center">Phone</td>
                    <td class="text-center">Age</td>
                    <td></td>
                </tr></thead>
            <tbody>
                <tr *ngFor="let item of customers; let sn=index">
                        <td class="col-sm-1 text-center">{{item.Id}}</td>
                    <td class="col-sm-2">
                        <a [innerHtml]="item.Name" (click)="showDetail(item)"></a>
                    </td>
                    <td class="col-sm-2">{{item.Phone}}</td>
                    <td class="col-sm-1">{{item.Age}}</td>
                    <td class="col-sm-2"><input type="button" class="btn btn-info" value="Edit" (click)="editCustomer(item)" /> <input type="button" class="btn btn-danger" value="Delete" (click)="deleteCustomer(item)" /></td>
                </tr></tbody></table>
    </div>
</div>

<div *ngIf="selectedCustomer">
    <customer-detail [selectedCustomer]="selectedCustomer" >
    </customer-detail>
    <input type="button" class="btn btn-primary" value="Back" (click)="backToList()" />
</div>
```

Because we have an input variable in `Detail component`, we need to set a **Property binding**: `[selectedCustomer]= "selectedCustomer"` for it.
PS. The latter `selectedCustomer` is the object in parent component.

* /app/Basic/Customer/customer.index.component.ts

Also we add the events for the parent component.

```
export class CustomerIndexComponent implements OnInit {
    title: string;
    customers: Customer[];
    selectedCustomer: Customer;
    constructor(private router:Router) {
        this.title = "Customers:Index";
        this.customers = CUSTOMERS;
    }

    //Go to create page
    private goToCreate() {
        this.router.navigate(['Basic/Customer/Create']);
    }
    //Back to list (Show list)
    private backToList() {
        this.selectedCustomer = null;
    }
    //Show details of the customer
    private showDetail(cust: Customer) {
        this.selectedCustomer = cust;
    }

   const CUSTOMERS: Customer[] = …
}
```

### Result

![](https://2.bp.blogspot.com/-xoqAzFEWXlw/WAuuHihAyTI/AAAAAAAAD7s/in4uUibrRGoGXiW8N-N56PqNEIpXy9P1ACLcB/s640/image001.gif)


## Emit event from Sub-component

We can send something from sub-component to parent with [EventEmitter](https://angular.io/docs/ts/latest/api/core/index/EventEmitter-class.html).
We will

1. Create a message class: `SysEvent`
2. Emit an object as `SysEvent`, from sub-component to parent component. That means form `customer-detail.component` to `customer-index.component`.
3. Parent component will show the received message.

#### SysEvent class

* /app/class/SysEvent.ts

```
export class SysEvent {
    Title: string;
    Msg: string;
    CreateBy: string;
    CreateOn: Date = new Date();

    constructor(fields?: {
        Title?: string,
        Msg?: string,
        CreateBy?: string,
        CreateOn?: Date;
        }) {
          if (fields) Object.assign(this, fields);
    }
}
```

> In the class's constructor, use `Object.assign` to create the initial properties values

#### EventEmitter

Create an [EventEmitter](https://angular.io/docs/ts/latest/api/core/index/EventEmitter-class.html) in Customer Detail component and the call-back function in Customer Index component.

* /app/Basic/Customer/customer-detail.component.ts

```
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SysEvent} from '../../class/SysEvent';

@Component({
    selector: 'customer-detail',
    templateUrl: '/app/Basic/Customer/customer-detail.component.html'
})
export class CustomerDetailComponent implements OnInit {

    @Input('selectedCustomer') customer: Customer;
    @Output('emit-events') emitEvents = new EventEmitter<SysEvent[]>(true); //Must set the EventEmitter to async

    ngOnInit() {
        //Emit event
    let evts: SysEvent[] = [
        new SysEvent({
            Title: "Info",
            Msg: "You are looking at " + this.customer.Name + "'s information.",
            CreateBy: "angular",
            CreateOn: new Date()
         })
     ];
     this.emitEvents.emit(evts);
    }
}
```

> Notice that we have to initialize the `emitEvents` in **async mode**.

![](https://2.bp.blogspot.com/-YMO5zR_Hrng/WAuuW6Da3fI/AAAAAAAAD7w/bM6D5a8uZww40UMCaDCh6cNLi-tOSLb-ACLcB/s1600/image002.jpg)


If not, we will get the following message which angular is saying that it cannot get the correct value from the child component.

*`core.umd.min.js:28 EXCEPTION: Error in /app/Basic/Customer/customer-index.component.html:48:5 caused by: Expression has changed after it was checked. Previous value: 'undefined'. Current value: '[object Object]'.`*

* /app/Basic/Customer/customer-index.component.ts

Set a call-back for the EventEmitter.

```
events:SysEvent[]

private setSysEvents(data: SysEvent[]) {
    this.events = data;
}
```

* /app/Basic/Customer/customer-index.component.html

```
<!-- Skip  ... -->

<div *ngIf="selectedCustomer">
    <customer-detail [selectedCustomer]="selectedCustomer" (emit-events)="setSysEvents($event)">
    </customer-detail>
    <input type="button" class="btn btn-primary" value="Back" (click)="backToList()" />
</div>

<!-- New html  -->

<hr />
<div *ngIf="events">
    <div class="list-group" *ngFor="let evn of events; let sn=index">
        <a href="#" class="disabled list-group-item" [innerHtml]="evn.Msg"></a>
    </div>
</div>
```

#### Result

![](https://3.bp.blogspot.com/-VJwa926cbYE/WAuuhmZmfgI/AAAAAAAAD70/mKQs8LVqzycEmOvapmGSBXNub5JvXtcJwCLcB/s640/image003.gif)


### What's next?

In the next day-sharing, we will use angular's [pipes](https://angular.io/docs/ts/latest/guide/pipes.html) and our custom pipe to provide a more clean message from the Customer Detail Component.


## Reference

1. [Angular 2 document](https://angular.io/)