![](https://2.bp.blogspot.com/-UoCMYEnuy6A/WG0O7wKmxXI/AAAAAAAAEHI/UqpVgVPWsGAErojAw6xu8QBjr9ClW2pIACLcB/s400/fullpage.png)
##### (Picture from https://github.com/meiblorn/ng2-fullpage)

## Introduction

[ng2-fullpage](https://github.com/meiblorn/ng2-fullpage) can creates beautiful fullscreen scolling website for Angular2 developers.

Check this [demo](http://meiblorn.github.io/ng2-fullpage/) from the author, [Vadim Fedorenko](https://github.com/meiblorn).

I will make a sample with real-time and repeat data in this article.


## Environment

* Angular 2.1.0
* ng2-fullpage 2.0.5


## Implement


#### Install

`npm install ng2-fullpage --save`

#### Import

* app.module.ts

```
import { MnFullpageDirective, MnFullpageService } from "ng2-fullpage";

@NgModule({
    declarations: [
      //...
      MnFullpageDirective
    ],
    imports: [
      //...
    ],
    providers: [
      //...
      MnFullpageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

#### Usage

* yp.fullpage.component.ts

```
import { Component, OnInit } from '@angular/core';
import { PrizeService } from '../../service/prize.service';

@Component({
    selector: 'yearend-fullpage',
    templateUrl: './yp.fullpage.component.html',
    styleUrls: ['./yp.fullpage.component.css']
})
export class YearEndPartyFullPageComp implements OnInit {

    private prizeGpls: PrizeGroupList[];

    constructor(
      private pgService: PrizeService) {
      }

    ngOnInit() {
         this._initLocalData(); //Get data from local json file
    }

    private _initLocalData() {
        this.blockUI.start();
        this.pgService.getAll().then(data => {
            this.prizeGpls = data;
        })
    }
}
```

* yp.fullpage.component.html

```
<div mnFullpage
    [mnFullpageNavigation]="true"
    [mnFullpageKeyboardScrolling]="true"
    [mnFullpageControlArrows]="false">
    <div class="section fp-section fp-table fullPageDiv">
        <div class="fp-tableCell">
            <div class="text-center"><h1>2017 Yearend Party</h1></div>
        </div>
    </div>
    <div class="section fp-section fp-table" *ngFor="let gplist of prizeGpls">
        <div class="fp-tableCell">
            <div class="slide">
                <div class="text-center">
                    <span class="title">Lottory</span>
                    <div>
                        <i class="fa fa-arrow-circle-right fa-2x"></i>
                        <i class="fa fa-arrow-circle-right fa-2x"></i>
                        <i class="fa fa-arrow-circle-right fa-2x"></i>
                        <span class="subTitle">{{gplist.name}}</span>
                    </div>
                </div>

            </div>
            <div class="slide" *ngFor="let gp of (gplist.prizeGroups | prizeGroupFiringPipe)">
                <div style="max-width:60%" class="center-block text-center">
                    <i class="fa fa-tag fa-3x"></i>
                    <span class="subTitle">{{gp.pType}}</span>
                    <table class="table table-bordered table-hover prizeTb">
                        <thead>
                            <tr>
                                <th>Prize</th>
                                <th>Number</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{{gp.prizes[0].title}}</td>
                            <td>{{gp.prizes.length}}</td>
   <td>{{gp.prizes[0].cash}} {{gp.prizes[0].unit}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
```

However, we will encounter a problem that **ng2-fullpage read the html and dynamically add/modify HTML elements and class(CSS) on the current html BEFORE the data is rendered on the webpage by `ngFor`**.

What we expected is as following,

![](https://1.bp.blogspot.com/-gYIo4r0tSRg/WG0Pja332HI/AAAAAAAAEHM/stASbNx3grUqW-c5agEzi2-xSePvZt3TgCLcB/s640/image002.gif)

But the current `FullPage` will display incorrectly with all the slides sticking together.

![](https://3.bp.blogspot.com/-VjmISdFB45I/WG0Pll9T5MI/AAAAAAAAEHg/z3tFybLb1LI3Y6FvHMeuLEMH5mfKke1jwCEw/s640/image003.jpg)


PS. I tried `rebuild()` function and it didn't work. If you have better luck, please share how to do it with me :)



#### Fix it! (Simple and fast way)

Here is a quick solution to overcome this issue. Open

`\node_modules\ng2-fullpage\components\fullpage\mnFullpage.directive.js`

(PS. If you are not using Angular CLI, than go to your copy-destination-path. )

Set a delay for enabling `FullPage` in [ngOnInit](https://angular.io/docs/ts/latest/api/core/index/OnInit-class.html)

* mnFullpage.directive.js

```
setTimeout(function () {
    nel.fullpage(opt);
}, 2000);
```

This way only works when the request-for-data responses within the timeout.
So let’s try the hard way.

~~Open an issue and ask if the author could support the functions.~~

Just kidding, let’s fork `ng2-fullpage` and do it ourselves.


## Fork ng2-fullpage


Go to `$\ng2-fullpage\components\fullpage\`
We will find four key files,

![](https://2.bp.blogspot.com/-x37F2izE1DU/WG0PlRAaRBI/AAAAAAAAEHg/5PID4AHW1FYbKqC6jDVYyGSyBVS2XTwKACEw/s1600/image004.png)


#### What are we going to do?

We will add an `input variable` to `mnFullpage.directive.ts` for watching if the data is ready (rendered) on the webpage.

* mnFullpage.directive.ts

```
export class fullpageDirective implements OnInit, OnChanges {

    //...

    @Input('isRenderOk') isRenderOk: boolean;

    public ngOnChanges() {
        if (this.isRenderOk == true) {
            (<any>$)(this._el.nativeElement).fullpage(this.options);
        }
    }

    ngOnInit(): void {
       
        //...
       
        /**
         * Enable fullpage for the element
         */
        // (<any>$)(this._el.nativeElement).fullpage(this.options);
    }
}
```

In the above codes, we cancelled enabling `FullPage` in `OnInit`, but turned to watch the input variable and reacted.

Okay, it's done! Let us update our component.

* yp.fullpage.component.html (Update)

```
<div [hidden]="!isRenderOk"
     mnFullpage
     [isRenderOk]="isRenderOk"
     [mnFullpageNavigation]="true"
     [mnFullpageKeyboardScrolling]="true"
     [mnFullpageControlArrows]="false">

    <!-- skip... -->
```


* yp.fullpage.component.ts (Update)

```
private _initLocalData() {
    this.pgService.getAll().then(data => {
        this.prizeGpls = data;

        this.isRenderOk = true;
    })
}
```

### Demo

![](https://2.bp.blogspot.com/-4r9GP7Pdp-Q/WG0PmJjDHJI/AAAAAAAAEHg/7E2TJLQgxg8XFcoqoCzcLa8UA7Q7_G2XwCEw/s1600/image005.gif)

## Reference

1. [ng2-fullpage](https://github.com/meiblorn/ng2-fullpage)
2. [fullpage.js](https://github.com/alvarotrigo/fullPage.js/)

