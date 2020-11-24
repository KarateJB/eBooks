## Introduction

We will complete the authentication part with [Firebase](https://firebase.google.com).



## Environment

* Visual Studio 2015 Update 3
* NPM: 3.10.3                                    
* Microsoft.AspNetCore.Mvc 1.0.0
* angular 2: 2.1.0
* angularfire2 : 2.0.0-beta.6


## Integrate Firebase authentication

Remember that in the beginning we set both `read` and `writ` are PUBLIC with the database.

Now try set the rules as **must-be-authorized**,

```
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

And this step results in getting the error message when accessing the data in `product.service`:

> EXCEPTION: permission_denied at /Demo/products: Client doesn't have permission to access the desired data.


So in the next step, we are going to create a login and authorization page for `Firebase` and make sure the authorized user could have the permission to read/write the database.


#### Enable OAuth provider

We will use **Google OAuth** for example, make sure the `Google Authentication provider` is enabled in your *Firebase console*.

![](https://4.bp.blogspot.com/-QSdVAhSSMRg/WGQ61DJakCI/AAAAAAAAEDk/S-cEdOP8vJ4rZRoOv9PD1F4-oxD0abN1wCLcB/s1600/image005.png)


#### Enable OAuth provider

We will put the login/logout functions on the below `app.component`.
If the user already logins, show the user's information and logout button on the page.

![](https://4.bp.blogspot.com/-ZGY2IeGsL3c/WGQ7H0LZbrI/AAAAAAAAEDs/HhFBW8W3iG8D-bgH5MNZUMuWbsirhBFcwCLcB/s1600/image006.png)

* app.component.html

```
<div class="card">
    <div class="card-block">
        <div class="card-text" [ngSwitch]="isAuth">
            <div *ngSwitchCase="false" class="text-center">
                <button class="btn btn-toolbar" (click)="login('google')">
                                <img width="30" src="../asset/images/logo/google-logo.png" />
                                Use Google Account
                            </button>
            </div>
            <div *ngSwitchCase="true" class="text-center">
                <table class="table">
                    <tr>
                        <td class="text-center">
                            <label class="control-label">{{user.name}}</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center">
                            <label class="control-label">{{user.email || '(no email)'}}</label>
                        </td>
                    </tr>
                </table>
                <div>
                    <input type="button" class="btn btn-warning" (click)="logout()" value="Logout" />
                </div>
            </div>
        </div>

    </div>
</div>
```

The HTML should be displayed like this.

![](https://4.bp.blogspot.com/-Qgr7lmDGc6k/WGQ7Wn8q9FI/AAAAAAAAED0/CK2UuavqZJQRPIkwAfAq7_K1ByBcC_qvwCLcB/s1600/image007.png)


* app.component.ts

Here are the login/logout functions, notice that we check the user's login state in `constructor`.

```
import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';


@Component({
    selector: 'core-app',
    templateUrl:'/app/app.component.html'
})
export class AppComponent implements OnInit {

    private isAuth = false;
    private user = {};


    constructor(private af: AngularFire) {

        //Check the login state
        this.af.auth.subscribe(
            user => this._changeState(user),
            error => JL("Angular2").error(error)
        );
    }

    ngOnInit() {

    }

    //Login
    private login(provider: string) {
        this.af.auth.login({
            provider: this._getProvider(provider),
            method: AuthMethods.Popup
        });
    }

    //Logout
    private logout() {
        this.af.auth.logout();
    }

    //Check if the user is login or not
    private _changeState(user: any = null) {
        if (user) {
            this.isAuth = true;
            this.user = this._getUserInfo(user)
        }
        else {
            this.isAuth = false;
            this.user = {};
        }
    }

    //Get the user information from Provider's user data
    private _getUserInfo(user: any): any {
        if (!user) {
            return {};
        }
        let data = user.auth.providerData[0];
        return {
            name: data.displayName,
            avatar: data.photoURL,
            email: data.email,
            provider: data.providerId
        };
    }

    private _getProvider(provider: string) {
        switch (provider) {
            case 'twitter': return AuthProviders.Twitter;
            case 'facebook': return AuthProviders.Facebook;
            case 'github': return AuthProviders.Github;
            case 'google': return AuthProviders.Google;
        }
    }
} 
```

* app.module.ts

Of course we have to import the necessary `AngularFireModule`, `AuthProviders`, `AuthMethods` and also initialize `AngularFireModule` in `app.module.ts`.

```
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {FirebaseConfig} from './class/FirebaseConfig';

@NgModule({
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(FirebaseConfig.Get())
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

Okay, everything is done. Show time.

### Demo

![](https://1.bp.blogspot.com/-73Odut8GWDQ/WGQ7k0Fi9UI/AAAAAAAAEEA/5zP0T5-pBpsd5C6OFawo88YZZCh_BJ84gCEw/s1600/image008.gif)



## Reference

1. [Firebase Documentation](https://firebase.google.com/docs/)
2. [angularfire2 Documentation](https://github.com/angular/angularfire2/tree/master/docs)

