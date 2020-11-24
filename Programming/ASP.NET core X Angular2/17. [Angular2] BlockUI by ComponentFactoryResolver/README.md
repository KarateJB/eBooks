## Introduction

Since Angular2 doesn't have `$compile` equivalent, we could use [ComponentFactoryResolver](https://angular.io/docs/ts/latest/api/core/index/ComponentFactoryResolver-class.html) class to create the **component factory** and dynamically create a component.

We will make a sample, *blockUI*, which is a component that could be created in another component and destroyed at run-time.


## Environment

* Angular 2.1.0
* Angular 2.4.0 is tested fine now!


## Implement

#### HTML and CSS

First, we should have the blockUI's HTML and CSS.

* blockUI.component.ts

```
import {Component, Input} from '@angular/core';

@Component({
    selector: 'block-ui',
    template:
    `<div class="in modal-backdrop blockui-overlay"></div>
    <div class="blockui-message-container">
    <div class="blockui-message" [ngClass]="blockuiMessageClass">
      {{state.message}} <i class="fa fa-cog fa-spin"></i>
    </div>
    </div>`,
    styleUrls: ['/app/component/blockUI/blockUI.component.css']
})


export class BlockUIComponent {
    @Input() private blockuiMessageClass;
    private state: any;

    constructor() {
        this.state = {message: 'Loading...'};
    }
}
```

* blockUI.component.css

```
.blockui-overlay {
  background-color: white;
  cursor: wait;
}

.blockui-message-container {
  position: absolute;
  top: 35%;
  left: 0;
  right: 0;
  height: 0;
  text-align: center;
  z-index: 10001;
  cursor: wait;
}

.blockui-message {
  display: inline-block;
  text-align: left;
  background-color: #333;
  color: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  filter: alpha(opacity=100);
}

.modal-backdrop.in {
    filter: alpha(opacity=50);
    opacity: .5;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: #000;
}
```

* ComponentFactoryResolver

Let's create a service for blockUI.

> Notice that after Angular 2.2.0, there are some updates on ApplicationRef, and we could not use `appRef['_rootComponents'][0]['_hostElement'].vcRef` to get root component’s view anymore, see the difference between old version and latest version of blockUI service for Angular 2.4.0.

* blockUI.service.ts (with Angular 2.1.0 or earlier version)

```
import {Injectable, ApplicationRef, ComponentRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import {BlockUIComponent} from './blockUI.component';

@Injectable()
export class BlockUIService {
    private blockUI: ComponentRef<BlockUIComponent>;

    constructor(
        private appRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver) { }

    public start() {

        let viewContainerRef: ViewContainerRef = this.appRef['_rootComponents'][0]['_hostElement'].vcRef;
        let factory = this.componentFactoryResolver.resolveComponentFactory(BlockUIComponent);
        this.blockUI = viewContainerRef.createComponent(factory);
    }


    public stop() {
        if (this.blockUI) {
            this.blockUI.destroy();
        }
    }
}
```


* blockUI.service.ts (with latest Angular, 2.4.0 is tested fine)

In this version, we have to set the root component view from outside.
So we declare a PUBLIC [ViewContainerRef](https://angular.io/docs/ts/latest/api/core/index/ViewContainerRef-class.html) variable.

```
import {Injectable, ApplicationRef, ElementRef, ComponentRef, ViewContainerRef, ComponentFactory,ComponentFactoryResolver } from '@angular/core';
import {BlockUIComponent} from './blockUI.component';

@Injectable()
export class BlockUIService {
    private blockUI: ComponentRef<BlockUIComponent>;
    public vRef: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    public start() {
        let factory = this.componentFactoryResolver.resolveComponentFactory(BlockUIComponent);
        this.blockUI = this.vRef.createComponent(factory);
    }
    
    public stop() {
        if (this.blockUI) {
            this.blockUI.destroy();
        }
    }
}
```


#### [ApplicationRef](https://angular.io/docs/ts/latest/api/core/index/ApplicationRef-class.html)

A reference to an Angular application running on a page. We can use this class to get the `root component`. For example,

![](https://4.bp.blogspot.com/-i14RLrLcXbU/WGYaswIC0QI/AAAAAAAAEEc/OQBezibDfFQg9Kb3718eV-I8ZGT9YvC1QCLcB/s1600/image001.png)



#### [ComponentRef](https://angular.io/docs/js/latest/api/core/index/ComponentRef-class.html)

An instance of a Component created via a `ComponentFactory`.
In this sample, we need create a dynamic `ComponentRef<BlockUIComponent>` instance.


#### [ViewContainerRef](https://angular.io/docs/ts/latest/api/core/index/ViewContainerRef-class.html)

The View Container could be attached with one or more View.
We can insert the blockUI View to root component by function: [createComponent](https://angular.io/docs/ts/latest/api/core/index/ViewContainerRef-class.html#!)

```
viewContainerRef.createComponent(factory);
```

and destroy the blockUI view by function: [remove](https://angular.io/docs/ts/latest/api/core/index/ViewContainerRef-class.html#!).


#### [ComponentFactoryResolver](https://angular.io/docs/ts/latest/api/core/index/ComponentFactoryResolver-class.html)

Use `ComponentFactoryResolver` class to create the component factory and the blockUI component.


### Usage

Here is an example for using our blockUI.

* app.module.ts

```
import { BlockUIComponent } from './components/blockUI/blockUI.component';
import { BlockUIService } from './components/blockUI/blockUI.service';

@NgModule({
    declarations: [
      //...
      BlockUIComponent
    ],
    imports: [
      //...
    ],
    entryComponents: [
          BlockUIComponent
    ],
    providers: [
        //...
        BlockUIService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

> What is entryComponents?
> 
> It's used for compiling the dynamic component with `ViewContainerRef.createComponent()`. Notice that the components registered in routes are also automatically added to `entryComponents` as well.
> Reference : [What is entryComponents in angular ngModule? (Stack Overflow)](http://stackoverflow.com/a/39756244/7045253)


* Any component

```

//For the old version of BlockUIService with Angular 2.1.0 or earlier
//constructor(
//  private blockUI: BlockUIService) {
//}

constructor(
    private viewContainerRef: ViewContainerRef,
    private blockUI: BlockUIService) {
        this.blockUI.vRef= this.viewContainerRef;
}

private getLaggers() {
    this.blockUI.start();
    return new Promise(
      resolve => {
          this.ypService.getLaggers().then(
            data => {
                this.laggers = data;
                resolve();
                this.blockUI.stop();
            }, err => { console.log(err); });

      });
}
```


### Demo

![](https://4.bp.blogspot.com/-NuzFzTDrv1Y/WGYa41WqHxI/AAAAAAAAEEg/AC8yjG_0Rtsr43TP5ebWDHAh-YMBwLDIQCLcB/s1600/image002.gif)


## Reference

1. [How to achieve block ui kind of behaviour in angular 2](http://stackoverflow.com/questions/36075152/how-to-achieve-block-ui-kind-of-behaviour-in-angular-2)
