## Introduction

We will integrate **Firebase** database service in this article with [angularfire2](https://github.com/angular/angularfire2) package.


## Environment

* Visual Studio 2015 Update 3
* NPM: 3.10.3                                    
* Microsoft.AspNetCore.Mvc 1.0.0
* angular 2: 2.1.0
* angularfire2 : 2.0.0-beta.6


## Firebase

Firebase* is a NoSql cloud databse, create a new project and enable read and write permission before we start implementing authorization.

*For more information, go to [https://firebase.google.com/docs/database/](https://firebase.google.com/docs/database/)

First let's update the rules like this, see more `database rules` [here](https://firebase.google.com/docs/database/security/).

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```


#### Install angularfire2

Use `npm` to install [angularfire2](https://www.npmjs.com/package/angularfire2) and [firebase](https://www.npmjs.com/package/firebase)*

```
npm install angularfire2 --save
npm install firebase --save
```

PS. Since [angularfire2](https://www.npmjs.com/package/angularfire2) is in beta (2.0.0-beta.6), it doesn't support `Storage` api so far. However, we can still use `firebase official js library` to develop the functions.
 
Optional: If you develop with Angular CLI and want to deploy the website to firebase, install [firebase-tools](https://www.npmjs.com/package/firebase-tools) as well.

Then you should update `systemjs.config.js` to include the packages.

![](https://4.bp.blogspot.com/-ec0Xoyvl9Zc/WGQ5dNgLIzI/AAAAAAAAEDM/xE6ExZrtskI_QhwrS_3ckmcepsz1Q7_pgCLcB/s1600/image001.png)



## Integrate Firebase database

We will update the sample codes in [Day13 – Sub-routing](http://ithelp.ithome.com.tw/articles/10187589).

Our goal is making the `product.service` support CRUD functions for data in `Firebase`.


#### Firebase configuration

Create a `FirebaseConfig module` to store the api key and other necessary information for connecting to `Firebase`.

PS. You can find your api key in `Firebase` by clicking the icon below.

![](https://4.bp.blogspot.com/-1aOverzKmMQ/WGQ559bh3XI/AAAAAAAAEDQ/EiZYHM3K6WMPYXj3rvbK_bp_X5rNKPdxwCLcB/s1600/image002.png)


* FirebaseConfig.ts

```
export module FirebaseConfig {
    var config: any;
    export function Get() {
        config = {
            apiKey: "XXXXXXXXXXXX",
            authDomain: "xxxx.firebaseapp.com",
            databaseURL: "https://xxxx.firebaseio.com",
            storageBucket: "xxxxx.appspot.com",
            messagingSenderId: "XXXXXXXXXXX"
        };

        return config;
    }
}
```

* product.app.module.ts

Inject the `angularfire2` package and api key config in to `product.app.module.ts`.

```
//...
import { AngularFireModule } from 'angularfire2';
import {FirebaseConfig} from '../../class/FirebaseConfig';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ProductRoutes,
        AngularFireModule.initializeApp(FirebaseConfig.Get())
    ],
    declarations: [
        //...
    ],
    bootstrap: [ProductAppComponent]
})
export class ProductAppModule { }
```

#### Update product.service with Firebase integration

Now we are going to update product.service to get the data from Firebase.

Tips:
Notice that everything in `Firebase` is a **URL**, so if the database structure is like this,

![](https://1.bp.blogspot.com/-6uD8as4zViA/WGQ6Nq-XqII/AAAAAAAAEDY/DDAgywze0AsyxsT-oe3lAue7gbMYC5QygCLcB/s1600/image003.png)


Some example codes...

1. Get the entire products:

```
constructor(private af: AngularFire) {}
this.af.database.object('/Demo/products');
```

2. Get the first object with key:

```
this.af.database.object('/Demo/products/0');
```

Okay, let's update our Service to integrate `Firebase` real-time data.

* product.service.ts

```
//...
import { AngularFire, FirebaseListObservable  } from 'angularfire2';

@Injectable()
export class ProductService {
    constructor(private af: AngularFire) {}

    //Create
    public create(prod:Product){
        return new Promise(
            resolve => {
                let itemObservable = this.af.database.object('/Demo/products/' + prod.Id);
                itemObservable.set(prod); //Set will overwrite
                resolve();
            });
    }

    //Update
    public update(prod: Product) {
        return new Promise<Product>(
            resolve => {
            let itemObservable = this.af.database.object('/Demo/products/' + prod.Id);
            itemObservable.update(prod); //Update current data
            resolve();
        })

    };

    //Remove
    public remove(prod: Product) {
        return new Promise(
            resolve => {
            let itemObservable = this.af.database.object('/Demo/products/' + prod.Id);
            itemObservable.remove(); //Remove current data
            resolve();
        })
    };


    //Get data with key
    public get(key: string) {
        return new Promise<Product>(
            resolve => {
            this.af.database.object('/Demo/products/' + key).subscribe(data => {
                resolve(data);
            })
        });
    }
   

    //Get books (or toys/music)
    public getBooks() {
        return new Promise<Product[]>(
            resolve => {

            this._queryProducts().subscribe(data => {
                if (data) {
                    let books = data.filter(x => x.Type == "Book");
                    resolve(books);
                }
                else {
                    resolve([]);
                }

            })

        });
    }
   
    //Query data from firebase
    private _queryProducts() {
        return this.af.database.object('/Demo/products');
    }
}
```

> Notice that we could use "`retrieving-data-as-objects`" way in the above codes, or either use "`retrieving-data-as-lists`" way to complete the same functions.


### Demo

![](https://3.bp.blogspot.com/-wsIydtYtirw/WGQ6lsCnV7I/AAAAAAAAEDg/GtwTVs_EXSssREyamzZQ4xA7IH2EXDKcwCLcB/s1600/image004.gif)



### Whaz next

We will integrate `Firebase` authentication in the next day-sharing.


## Reference

1. [Firebase Documentation](https://firebase.google.com/docs/)
2. [angularfire2 Documentation](https://github.com/angular/angularfire2/tree/master/docs)

