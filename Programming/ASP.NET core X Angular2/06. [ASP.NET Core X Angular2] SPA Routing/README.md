## Introduction

We will start building the routing  with angular2 router.

## Environment

* Visual Studio 2015 Update 3
* NPM: 3.10.3                                    
* Microsoft.AspNetCore.Mvc 1.0.0
* angular 2: 2.1.0

## ASP.NET Core MVC

#### Create MVC controller and view

![](https://4.bp.blogspot.com/-rc8lbc_vwwE/WAd3KHSbP7I/AAAAAAAAD60/Fo3qPPnidewiAwwpCqVlsdduBn5OzjMqgCEw/s1600/image001.png)

* Controller

```
[Area("Basic")]
[Route("Basic/[controller]")]

public class CustomerController : Controller
{
        [Route("[action]")]
        public IActionResult Index()
        {
            return View();
        }
}
```

* View

```
@{
    Layout = "~/Views/Shared/_Layout.cshtml";
}
<h2>Index</h2>
```


## Router


#### Base Url

If you hadn't set the base url on `_Layout.cshtml`, don't forget it!

```
<head>
    <base href="/">
    <!--Skip....-->
</head>
```

#### Modules and Main component

Like we created *"Hello world"* module and component in [Day 5](http://ithelp.ithome.com.tw/articles/10186604), we need to create the following typescripts.
1. `customer.module.ts` : imports necessary modules and declarations.
2. `customer.component.ts` : our component.
3. `Customer.main.ts`  : bootstrapping and target the browser platform.

* customer.main.ts

```
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {CustomerAppModule} from './customer.app.module';
import {enableProdMode} from '@angular/core';

platformBrowserDynamic().bootstrapModule(CustomerAppModule);
```

* customer.component.ts

In order to use the **angular router library**, import `Routes` and `RouterModule` from `@angular/router`.
Furthermore, use the directive: `router-outlet` as the template.
```
import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@Component({
    selector: 'customer-app',
    template: '<router-outlet></router-outlet>'
})
export class CustomerAppComponent implements OnInit {
    ngOnInit() {
    }
} 
```

* customer.module.ts

```
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CustomerAppComponent }  from './customer.app.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot([])  //The routes should be set here!
    ],
    declarations: [CustomerAppComponent],
    bootstrap: [CustomerAppComponent]
})
export class CustomerAppModule { }
```

* /Aears/Basic/Customer/Index.cshtml

Update Index.cshtml to load `/app/Basic/Customer/customer.main.js`
and put `customer-app` inside.

```
@{
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Index</h2>
<hr />
<customer-app>
    <div><p><img src="~/images/gif/ajax-loader.gif" /> Please wait ...</p></div>
</customer-app>

@section Scripts {
    <script>
        System.config({
            map: {app: 'app/Basic/Customer'},
            packages: {app: {main:'customer.main.js',defaultExtension: 'js'}}
        });
        System.import('app/customer.main').then(null, console.error.bind(console));
    </script>
}
```

#### Create the Single Pages

In this sample, we will have the following pages :
* /Basic/Customer/Index
* /Basic/Customer/Create
* /Basic/Customer/Update

So we first create the above components and html and will implement the real content in the next few days. 
For example, the `index component` should be looked like this…

* customer.index.component.ts

```
import {Component, OnInit} from '@angular/core';
import {Routes} from "@angular/router";

@Component({
    selector: 'customer-index',
    templateUrl: '/app/Basic/Customer/customer-index.component.html'
})

export class CustomerIndexComponent implements OnInit {
    title: string;
    constructor() {
        this.title = "Customers:Index";
    }
    ngOnInit() {
    }
}
```

* customer.index.component.html

```
<h3>{{title}}</h3>
<hr />
<ul>
    <li>
        <a [routerLink]="['/Basic/Customer/Create']">Go to Create</a>
    </li>
    <li>
        <a [routerLink]="['/Basic/Customer/Edit']">Go to Edit</a>
    </li>
</ul>
```

> Notice that in `[routerLink]`, the name should be "/" + "The route path".


#### Set the routes

Set the routes in `RouterModule.forRoot()`
and don't forget to import the component and declare them!

* customer.app.module

```
//Skip...
import {CustomerIndexComponent} from './customer-index.component';
import {CustomerCreateComponent} from './customer-create.component';
import {CustomerEditComponent} from './customer-edit.component';

@NgModule({
    imports: [
        //Skip...       
        RouterModule.forRoot([
            { path: 'Basic/Customer/Index', component: CustomerIndexComponent },
            { path: 'Basic/Customer/Create', component: CustomerCreateComponent },
            { path: 'Basic/Customer/Edit', component: CustomerEditComponent },
            { path: '', redirectTo: '/Basic/Customer/Index', pathMatch: 'full' }
        ])
    ],


    declarations: [CustomerAppComponent, CustomerIndexComponent, CustomerCreateComponent, CustomerEditComponent],
    bootstrap: [CustomerAppComponent]
})
export class CustomerAppModule { }
```


#### The router works now

![](https://3.bp.blogspot.com/-PMDNdBKh_Hk/WAd4fmYvWAI/AAAAAAAAD7E/sQGlbi546WU7v9yxkaYB3DOWcECn8bqJwCLcB/s1600/image004.gif)


## Send parameter with route path

Notice that when we want to edit a customer, we need to let the `Customer Edit Component` know which customer we are editing.

There are at least two ways to achieve the goal: Send customer id to Edit Component.
1. Thru a Service.
2. Thru url parameter.

Here we will use **url parameter** for sending the customer's id.


#### Route with parameter

First let's update the `RouterModule` settings.

* customer.app.module

```
RouterModule.forRoot([
     //...
     { path: 'Basic/Customer/Edit/:id', component: CustomerEditComponent }
])
```

The event of clicking the `[Edit]` button on any data is as following.

* customer.index.component.ts

```
private editCustomer(item: Customer) {
    this.router.navigate(['Basic/Customer/Edit', item.Id]);
}
```

And the html should be like this,

```
<input type="button" class="btn btn-info" value="Edit" (click)="editCustomer(item)" />
```

So that when we click the `[Edit]` button on a customer data, we will navigate to
`http://localhost:4240/Basic/Customer/Edit/11`


#### Receive route parameter

And how to get the parameter value from Url? The interface [ActivatedRoute](https://angular.io/docs/ts/latest/api/router/index/ActivatedRoute-interface.html) will do us the favor.

* customer-edit.component.ts

```

//...
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'customer-edit',
    providers: [CustomerService, RestUriService],
    templateUrl: '/app/Basic/Customer/customer-edit.component.html'
})

export class CustomerEditComponent implements OnInit {
    //...
    constructor(
        private router: Router,
        private route: ActivatedRoute) {
          //...
        }

    ngOnInit() {
        this.route.params.subscribe(params => {
           let custIdValue = params['id'];
            let custId = +custIdValue; //Equales to parseInt
            console.log("query id = " + +custIdValue);
        });
    }
}
```

## Implement the content

We can now start implementing our content and services of SPA.
But first, let's create some fake data and style our pages.

#### Style it

* customer.index.component.ts

We will do the following works:
1. Create const data and use `ngFor` to display them.
2. Use router's `navigate` function to change current route.

```
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'customer-index',
    templateUrl: '/app/Basic/Customer/customer-index.component.html'
})

export class CustomerIndexComponent implements OnInit {
    title: string;
    customers: any[];
    constructor(private router:Router) {
        this.title = "Customers:Index";
        this.customers = CUSTOMERS;
    }

    ngOnInit() {
    }

    //Go to create page
    private goToCreate() {
        this.router.navigate(['Basic/Customer/Create']);
    }
}

const CUSTOMERS: any[] =
    [{ "Id": 1, "Name": "<b>JB</b>", "Phone": "0933XXXXXX", "Age": 35 }
    //...
];
```

* customer.index.component.html

```
<input type="button" class="btn btn-primary" value="Create New" (click)="goToCreate()" />
<!--Skip some html-->
<tr *ngFor="let item of customers; let sn=index">
                    <td class="col-sm-1 text-center">{{item.Id}}</td>
                    <td class="col-sm-2" [innerHtml]="item.Name">
                    </td>
                    <td class="col-sm-2">{{item.Phone}}</td>
                    <td class="col-sm-1">{{item.Age}}</td>
                    <td class="col-sm-2">
                        <input type="button" class="btn btn-info" value="Edit" (click)="editCustomer(item)" />
                         
                        <input type="button" class="btn btn-danger" value="Delete" (click)="deleteCustomer(item)" />
                    </td>
</tr>
```

#### Result

![](https://3.bp.blogspot.com/-koYTHjfnOow/WAd4f2hR67I/AAAAAAAAD7A/xMG8ZekPoNEhb4IVNkU2wG_wdqL61H38QCLcB/s640/image005.gif)



### What’s next?

In the next day-sharing, we will use the current SPA and build advanced content for it.


## Reference

1. [Getting Started with Angular 2 using TypeScript](https://www.sitepoint.com/getting-started-with-angular-2-using-typescript/)
2. [Using MVC 6 And AngularJS 2 With .NET Core](http://www.c-sharpcorner.com/article/using-mvc-6-and-angularjs-2-with-net-core/)


