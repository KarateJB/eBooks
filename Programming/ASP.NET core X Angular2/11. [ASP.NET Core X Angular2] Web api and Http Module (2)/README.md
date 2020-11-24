## Introduction

We will continue completing the front-end of [Day 10 - Web api and Http Module](http://ithelp.ithome.com.tw/articles/10187315).

## Environment

* Visual Studio 2015 Update 3
* Sql Server 2012 R2
* NPM: 3.10.3
* Microsoft.AspNetCore.Mvc 1.0.0
* angular 2: 2.1.0

## Angular2 : Http Module


### Create CRUD Service

* /app/Basic/Customer/customer.app.module.ts

Import [HttpModule](https://angular.io/docs/ts/latest/guide/server-communication.html) from `@angular/http`.

```
//...
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CustomerRoutes,
        HttpModule
    ],
    //...
})
export class CustomerAppModule { }
```

* /app/Basic/Customer/customer.service.ts

```
import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import {Customer} from '../../class/Customer';
import {ICrudService} from '../../interface/ICrudService';
import {RestUriService} from '../../service/resturi.service';

@Injectable()
export class CustomerService implements ICrudService {

    private customers: Customer[];
    private httpOptions: RequestOptions;

    constructor(
        private http: Http,
        private resturiService: RestUriService
    ) {
       this.customers = [];

       let headers = new Headers({ 'Content-Type': 'application/json' });
       this.httpOptions = new RequestOptions({ headers: headers });
}

//Get all customers
public getAll() {
    return new Promise<Customer[]>(
        resolve => {
        this.http.get(this.resturiService.customerGetAllUri)
            .subscribe(value => {
                Object.assign(this.customers, value.json());
                resolve(value.json());
            });
    });
}

//Get a customers with Id
public get(id: number) {
    return new Promise<Customer>(
        resolve => {
        this.http.get(this.resturiService.customerGetUri.concat(id.toString()))
            .subscribe(value => {
                resolve(value.json());
            });
    });
}

//Create a new customer
public create(item: Customer) {

    var entity = JSON.stringify(item);

    return new Promise(
        resolve => {
            this.http.post(this.resturiService.customerCreateUri, entity, this.httpOptions)
                .subscribe(() => {
                    resolve();
                });
        });
}

//Update a customer
public update(item: Customer) {

    return new Promise(
        resolve => {
            this.http.put(this.resturiService.customerUpdateUri, item, this.httpOptions)
                .subscribe(value => {
                    resolve();
                });
        });
}

//Remove a customer
public remove(item: Customer) {
    return new Promise(
        resolve => {
this.http.delete(this.resturiService.customerRemoveUri.concat(item.Id.toString()))
                .subscribe(value => {
                    resolve();
                });
        });
}
```

Notice that we can specify the http header like this,

```
let headers = new Headers({ 'Content-Type': 'application/json' });
this.httpOptions = new RequestOptions({ headers: headers });

//this.http.post(uri, object, httpOptions)
```


### The real data from backend

We will use our new `CustomerService` to replace the CONSTANT data in [Day 6 - Routing](http://ithelp.ithome.com.tw/articles/10186741) and implement the CRUD functions of `Customer components`.

#### Read

* /app/Basic/Customer/customer.index.component.ts

```
import {CustomerService} from './customer.service';
//...

@Component({
    selector: 'customer-index',
    providers: [CustomerService],
    templateUrl: '/app/Basic/Customer/customer-index.component.html'
})

export class CustomerIndexComponent implements OnInit {
   
    //...
    customers: Customer[];

    constructor(
        private router: Router,
        private custService: CustomerService) {
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

#### Delete

* /app/Basic/Customer/customer.index.component.ts

Add the following function for deleting a customer.

```
//Remove customer
private deleteCustomer(item: Customer) {

        this.custService.remove(item).then(
                () => {
                    //Remove item in Front-end
                    var index = customers.indexOf(item);
                    this.customers.splice(index, 1);
                });
}
```

#### Create

* /app/Basic/Customer/customer.create.component.ts

Implement the create function in Customer Create component.

```
private save() {

    this.custService.create(this.customer).then(
        () => {
                //Return to Index after finished
                this.router.navigate(['Basic/Customer/Index']);
        });
}
```

#### Update

* /app/Basic/Customer/customer.edit.component.ts

Complete the Customer Edit component by querying cutomer when `ngOnInit` and update customer on saving.

```
//...
import {CustomerService} from './customer.service';

@Component({
    selector: 'customer-edit',
    providers: [CustomerService, RestUriService],
    templateUrl: '/app/Basic/Customer/customer-edit.component.html',
    styleUrls: ['/app/Basic/Customer/customer-edit.component.css']
})

export class CustomerEditComponent implements OnInit {
    title: string;
    customer: Customer;
    selectedCustomer: Customer;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private custService: CustomerService) {
            this.title = "Customers - Edit";
            this.customer = new Customer();
        }

    ngOnInit() {
        this.route.params.subscribe(params => {
            let custIdValue = params['id'];
            let custId = +custIdValue; //Equales to parseInt

            this.custService.get(custId).then(
                data => {
                    this.customer = data
                });
        });
    }

    //Save!
    private save() {
        this.custService.update(this.customer);
    }
}
```

### Demo

![](https://2.bp.blogspot.com/-PNU1BQuWds4/WBi5ACCPrpI/AAAAAAAAD9k/aRto0g0c-ZUyN1y689tu2T-B3BdRuIZTACLcB/s1600/demo.gif)


## Reference

N/A

