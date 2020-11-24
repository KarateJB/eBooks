## Before you read

From Day 5,  I will start integrate `Angular2` into ASP.NET Core MVC website.
I developed some projects with `ASP.NET MVC5` and `Angular 1.X`, and they worked perfectly.
However, `Angular2` is a complete architectural solution with [angular-cli](https://github.com/angular/angular-cli) and we don't really need a MVC website with it to complete the requirements.
Sometimes, or most times, using `Angular CLI`, `RESTful api` and `DAL` will be enough.

So if you DO NOT develope a MVC website, please SKIP this article :)


## Introduction

This article will shows how to integrate ASP.NET Core MVC website with Angular2.

**Visual Studio templates**
> For those who want to quickly create the development template, there are some ASP.NET core +angular 2 templates released. 
> [ASP.NET Core + Angular 2 template for Visual Studio](http://blog.stevensanderson.com/2016/10/04/angular2-template-for-visual-studio/)
> [ASPNET-Core-Angular2-StarterTemplate](https://github.com/FabianGosebrink/ASPNET-Core-Angular2-StarterTemplate/)


## Environment

* Visual Studio 2015 Update 3
* NPM: 3.10.3	
* Microsoft.AspNetCore.Mvc 1.0.0
* angular 2: 2.1.0

## Create MVC website and install packages

#### Create ASP.NET Core MVC

Choose ASP.NET Core Web Application (.NET Core) project template and using the EMPTY template.

![](https://4.bp.blogspot.com/-Lk1jmB_py-I/WAT58V91UYI/AAAAAAAAD54/xnT8AeD4KkYI4zEaF0-OIfkbbU1FE0qfwCLcB/s1600/image001.png)

![](https://2.bp.blogspot.com/-_3ruBnjuAb8/WAT58SazFMI/AAAAAAAAD50/v8LaIYzOFeMMUuzxDafEGEKZwLvkZ4xlgCLcB/s1600/image002.png)


#### Install packages

Open project.json, add the following packages in “dependencies”.

```
"dependencies": {
    "Microsoft.NETCore.App": {
      "version": "1.0.0",
      "type": "platform"
    },
    "Microsoft.AspNetCore.Diagnostics": "1.0.0",
    "Microsoft.AspNetCore.Server.IISIntegration": "1.0.0",
    "Microsoft.AspNetCore.Server.Kestrel": "1.0.0",
    "Microsoft.Extensions.Logging.Console": "1.0.0",
    "Microsoft.AspNetCore.Mvc": "1.0.0",
    "Microsoft.AspNetCore.StaticFiles": "1.0.0",
    "es6-shim.TypeScript.DefinitelyTyped": "0.8.1"
},
```

![](https://2.bp.blogspot.com/-zWBy8tbjvoQ/WAT6OYeJvuI/AAAAAAAAD58/ylHLmrTf9ogRcLafatCgixh0WG7vgsAkgCLcB/s1600/image003.png)

#### Set MVC rounting rule

Please see [Day03 - [ASP.NET Core] Set Routing](http://ithelp.ithome.com.tw/articles/10184790)


#### View and Controller

Now we can add the controller, view and master page (_Layout.cshtml) in the project.
Then run it!

![](https://2.bp.blogspot.com/-r6whWolWUyI/WAT6ZZsORrI/AAAAAAAAD6E/TclNUomsQ8sCfc07g6L3Sww2Oa3vNBMNQCLcB/s320/image005.png)

The MVC website is ready, we will install packages for [angular2](https://angular.io/), [bootstrap](http://getbootstrap.com/) later.


## Bower : install bootstrap and jquery(optional)

#### Install
> Or intall them with [npm](https://www.npmjs.com/)

Add `bower.json` to the root of our project, then add the following packages within it.

![](https://1.bp.blogspot.com/-2I8Lo2LEj_8/WAT6ZQCX7GI/AAAAAAAAD6A/NZKtw_5lrAQ5wANk6XmaH5qOt2s_UOM2QCLcB/s320/image006.png)

Save `bower.json` and wait for the packages are installed under the path *$/wwwroot/lib/*.


#### Update _Layout.cshtml

Put bootstrap js and css into `_Layout.cshtml`'s `<header>` in order to style our website.

```
<head>
    <script src="~/lib/bootstrap/dist/js/bootstrap.min.js"></script>
    <link href="~/lib/bootstrap/dist/css/bootstrap.css" rel="stylesheet" />
</head>
```
![](https://3.bp.blogspot.com/-6ynqRgzvLNM/WAT675dr8GI/AAAAAAAAD6M/GsC85f2wMQkWyouh0rs7vjAzjfGc8GSZQCLcB/s400/image008.png)


## npm and gulp

#### Install packages

* frameworks
1. [@angular/core](https://www.npmjs.com/package/@angular/core)
2. [@angualr/common](https://www.npmjs.com/package/@angular/common)
3. [@angular/compiler](https://www.npmjs.com/package/@angular/compiler)
4. [@angular/forms](https://www.npmjs.com/package/@angular/forms)
5. [@angular/http](https://www.npmjs.com/package/@angular/http)
6. [@angular/platform-browser](https://www.npmjs.com/package/@angular/platform-browser)
7. [@angular/platform-browser-dynamic](https://www.npmjs.com/package/@angular/platform-browser-dynamic)
8. [@angular/router](https://www.npmjs.com/package/@angular/router)
9. [rxjs](https://www.npmjs.com/package/rxjs)  
10. [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
11. [Systemjs](https://www.npmjs.com/package/systemjs)
12. [Zone.js](https://www.npmjs.com/package/zone.js)  
13. [es6-shim](https://www.npmjs.com/package/es6-shim) 

* Typescript
1. [typescript](https://www.npmjs.com/package/typescript)
2. [typings](https://www.npmjs.com/package/typings)

* And the following packages for managing the js and packages.
1. [rimraf](https://www.npmjs.com/package/rimraf)
2. [gulp](https://www.npmjs.com/package/gulp)
3. [gulp-concat](https://www.npmjs.com/search?q=gulp-concat)
4. [gulp-cssmin](https://www.npmjs.com/package/gulp-cssmin)
5. [gulp-uglify](https://www.npmjs.com/search?q=gulp-uglify)

* Optional js library
1. [Sweetalert2 ](https://www.npmjs.com/package/sweetalert2)

Here is my `package.json` snapshot for your reference.

```
{
  "version": "1.0.0",
  "name": "asp.net",
  "private": true,
  "Dependencies": {
    "systemjs": "0.19.39",
    "es6-shim": "^0.33.3",
    "rxjs": "5.0.0-rc.1",
    "sweetalert2": "5.2.1"
  },
  "devDependencies": {
    "systemjs": "0.19.39",
    "es6-shim": "^0.33.3",
    "rxjs": "5.0.0-rc.1",
    "gulp": "3.8.11",
    "gulp-concat": "2.5.2",
    "gulp-cssmin": "0.1.7",
    "gulp-uglify": "1.2.0",
    "rimraf": "2.2.8",
    "sweetalert2": "5.2.1",
    "typescript": "2.0.3",
    "typings": "1.4.0"
  },
  "dependencies": {
    "@angular/common": "^2.1.0",
    "@angular/compiler": "^2.1.0",
    "@angular/core": "^2.1.0",
    "@angular/forms": "^2.1.0",
    "@angular/http": "^2.1.0",
    "@angular/platform-browser": "^2.1.0",
    "@angular/platform-browser-dynamic": "^2.1.0",
    "@angular/router": "3.1.0",
    "reflect-metadata": "^0.1.8",
    "zone.js": "^0.6.25"
  }
}
```

#### Gulp: tasks

Add a gulp config (`gulpfile.js`) and create the **copy** tasks.

```
"use strict";
var gulp = require('gulp');
var root_path = {
    webroot: "./wwwroot/"
}

//library source
root_path.nmSrc = "./node_modules/";
//library destination
root_path.package_lib = root_path.webroot + "lib-npm/"

//rxjs
gulp.task("copy-rxjs", function () {
    return gulp.src(root_path.nmSrc + '/rxjs/**/*.js', {
        base: root_path.nmSrc + '/rxjs/'
    }).pipe(gulp.dest(root_path.package_lib + '/rxjs/'));
});

//reflect-metadata
gulp.task("copy-reflect-metadata", function () {
    return gulp.src(root_path.nmSrc + '/reflect-metadata/*.js', {
        base: root_path.nmSrc + '/reflect-metadata/'
    }).pipe(gulp.dest(root_path.package_lib + '/reflect-metadata/'));
});

//zone.js
gulp.task("copy-zonejs", function () {
    return gulp.src(root_path.nmSrc + '/zone.js/dist/**/*.js', {
        base: root_path.nmSrc + '/zone.js/dist/'
    }).pipe(gulp.dest(root_path.package_lib + '/zone.js/'));
});


//angular2
gulp.task('copy-ng2-common', function () {
    return gulp.src(root_path.nmSrc + "/@angular/common/bundles/**/*.js", {
        base: root_path.nmSrc + '/@angular/common/bundles/'
    }).pipe(gulp.dest(root_path.package_lib + '/angular2/common/'));
});
gulp.task('copy-ng2-compiler', function () {
    return gulp.src(root_path.nmSrc + "/@angular/compiler/bundles/**/*.js", {
        base: root_path.nmSrc + '/@angular/compiler/bundles/'
    }).pipe(gulp.dest(root_path.package_lib + '/angular2/compiler/'));
});
gulp.task('copy-ng2-core', function () {
    return gulp.src(root_path.nmSrc + "/@angular/core/bundles/**/*.js", {
        base: root_path.nmSrc + '/@angular/core/bundles/'
    }).pipe(gulp.dest(root_path.package_lib + '/angular2/core/'));
});
gulp.task('copy-ng2-forms', function () {
    return gulp.src(root_path.nmSrc + "/@angular/forms/bundles/**/*.js", {
        base: root_path.nmSrc + '/@angular/forms/bundles/'
    }).pipe(gulp.dest(root_path.package_lib + '/angular2/forms/'));
});
gulp.task('copy-ng2-http', function () {
    return gulp.src(root_path.nmSrc + "/@angular/http/bundles/**/*.js", {
        base: root_path.nmSrc + '/@angular/http/bundles/'
    }).pipe(gulp.dest(root_path.package_lib + '/angular2/http/'));
});
gulp.task('copy-ng2-router', function () {
    return gulp.src(root_path.nmSrc + "/@angular/router/bundles/**/*.js", {
        base: root_path.nmSrc + '/@angular/router/bundles/'
    }).pipe(gulp.dest(root_path.package_lib + '/angular2/router/'));
});
gulp.task('copy-ng2-platform-browser', function () {
    return gulp.src(root_path.nmSrc + "/@angular/platform-browser/bundles/**/*.js", {
        base: root_path.nmSrc + '/@angular/platform-browser/bundles/'
    }).pipe(gulp.dest(root_path.package_lib + '/angular2/platform-browser/'));
});
gulp.task('copy-ng2-platform-browser-dynamic', function () {
    return gulp.src(root_path.nmSrc + "/@angular/platform-browser-dynamic/bundles/**/*.js", {
        base: root_path.nmSrc + '/@angular/platform-browser-dynamic/bundles/'
    }).pipe(gulp.dest(root_path.package_lib + '/angular2/platform-browser-dynamic/'));
});

//systemjs
gulp.task('copy-systemjs', function () {
    return gulp.src(root_path.nmSrc + "/systemjs/dist/**/*.*", {
        base: root_path.nmSrc + '/systemjs/dist/'
    }).pipe(gulp.dest(root_path.package_lib + '/systemjs'));
});
//ES6
gulp.task('copy-es6-shim', function () {
    return gulp.src(root_path.nmSrc + "/es6-shim/es6-sh*", {
        base: root_path.nmSrc + '/es6-shim/'
    }).pipe(gulp.dest(root_path.package_lib + '/es6-shim'));
});
//sweetalert2
gulp.task('copy-sweetalert2', function () {
    return gulp.src(root_path.nmSrc + "/sweetalert2/dist/sweetalert2*", {
        base: root_path.nmSrc + '/sweetalert2/dist/'
    }).pipe(gulp.dest(root_path.package_lib + '/sweetalert2/'));
});

gulp.task("copy-all", [
    "copy-rxjs",
    "copy-reflect-metadata",
    "copy-zonejs",
    "copy-ng2-common",
    "copy-ng2-compiler",
    "copy-ng2-core",
    "copy-ng2-forms",
    "copy-ng2-http",
    "copy-ng2-router",
    "copy-ng2-platform-browser",
    "copy-ng2-platform-browser-dynamic",
    "copy-systemjs",
    "copy-es6-shim",
    "copy-sweetalert2"])
```

Run the following command (or use the task runner in Visual Studio).
```
gulp copy-all
```
![](https://1.bp.blogspot.com/-lBtoHdz-xyM/WAT7O1iEe8I/AAAAAAAAD6Q/IVXngr0gi7EH7HeYkxE5jj8flAB58hdoQCLcB/s1600/image010.png)


I created an extra folder named "typings" to store the 3rd typing definition files.
In this sample, we will need *es6-shim.d.ts* and *sweetalert.d.ts*


## Using the packages and modules

#### Add tsconfig.json

![](https://4.bp.blogspot.com/-3F_NntWb9h4/WAT7dAXJj1I/AAAAAAAAD6U/B35WUxriY3oLGnlgdy27mqOjTMvTZp0NgCLcB/s400/image011.png)

```
{
  "compilerOptions": {
    "noImplicitAny": false,
    "noEmitOnError": true,
    "removeComments": false,
    "sourceMap": true,
    "target": "es5",
    //add this to compile app component
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "module": "system",
    "moduleResolution": "node"
  },
  "exclude": [ "node_modules", "wwwroot/lib" ]
}
```
 
#### Load packages

Okay, now we can add the necessary references of the packages on the `_Layout.cshtml`
Notice that we are going to use anuglar’s router for building SPA.
So we have to set the BASE URL: `<base href="/">`

```
<head>
    <base href="/">
    <script src="~/lib-npm/reflect-metadata/Reflect.js"></script>
    <script src="~/lib-npm/zone.js/zone.js"></script>
    <script src="~/lib/jquery/dist/jquery.min.js"></script>
    <script src="~/lib-npm/es6-shim/es6-shim.js"></script>
    <script src="~/lib-npm/systemjs/system.src.js"></script>
    <script src="~/lib-npm/sweetalert2/sweetalert2.min.js"></script>
    <link href="~/lib-npm/sweetalert2/sweetalert2.min.css" rel="stylesheet" />
    <script src="~/lib/bootstrap/dist/js/bootstrap.min.js"></script>
    <link href="~/lib/bootstrap/dist/css/bootstrap.css" rel="stylesheet" />
</head>
```

#### Load dynamic modules

We are going to use `Systemjs` to load the dynamic modules: **@angular** and **rxjs**.
Create systemjs.config.js in `$/wwwroot/app/` or somewhere else.

* systemjs.config.js
```
System.config({
    transpiler: 'typescript',
    typescriptOptions: { emitDecoratorMetadata: true },
    map: {
        'rxjs': 'lib-npm/rxjs',
        '@angular': 'lib-npm/angular2'
    },
    packages: {
        'rxjs': { main: 'Rx.js' },
        '@angular/router': { main: 'router.umd.min.js'},
        '@angular/core': { main: 'core.umd.min.js' },
        '@angular/common': { main: 'common.umd.min.js' },
        '@angular/compiler': { main: 'compiler.umd.min.js' },
        '@angular/forms': { main: 'forms.umd.js' },
        '@angular/platform-browser': { main: 'platform-browser.umd.min.js' },
        '@angular/platform-browser-dynamic': { main: 'platform-browser-dynamic.umd.min.js' }
    }
});
```

Next, we put this js to the _Layout.cshtml.
```
<head>
   <!-- skip ... -->
    <script src="~/app/systemjs.config.js"></script>
</head>
```

> PS. If you got any system.js error in the following process, it may be something wrong within this file!


## Angular2

We will create a quick ng2 page sample in this step.

#### Target the browser platform, and create ng2 module and component

We need to create the 3 files to fire an ng2 application.
1. `app.module.ts` : imports necessary modules and declarations.
2. `app.component.ts` : our directive.
3. `main.ts` : bootstrapping and target the browser platform.


* wwwroot/app/app.component.ts
```
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'core-app',
    template: '<h3>Hello world!</h3>'
})
export class AppComponent implements OnInit {
    ngOnInit() {
    }
} 
```

* wwwroot/app/app.module.ts
```
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

* wwwroot/app/main.ts
```
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
import {enableProdMode} from '@angular/core';

//enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
```

Then update `$/Views/Home/Index.cshtml` and add the **component** to it.

> Note : Use systemjs: System.import to add the compiled typescript to the HTML.

* Views/Home/Index.cshtml
```
@{
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Index</h2>
<core-app>
    <div>
        <p><img src="~/images/gif/ajax-loader.gif" /> Please wait ...</p>
    </div>
</core-app>

@section Scripts {
   <script>
        System.config({
            map: {
                app: 'app'
            },
            packages: {
                app: {main: 'main.js',defaultExtension: 'js'}
            },
        });
        System.import('app/main').then(null, console.error.bind(console));
    </script>
}
```

#### Result

![](https://2.bp.blogspot.com/-l9nwn3PIvqc/WAT7xLSmDiI/AAAAAAAAD6Y/FnvjJu6m_gMsiAlSbZBr83n2MoVOCLT_gCLcB/s1600/image012.gif)


#### What’s next?

In the next day-sharing, we will start creating the SPA for CRUD.


## Reference

1. [Getting Started with Angular 2 using TypeScript](https://www.sitepoint.com/getting-started-with-angular-2-using-typescript/)
2. [Using MVC 6 And AngularJS 2 With .NET Core](http://www.c-sharpcorner.com/article/using-mvc-6-and-angularjs-2-with-net-core/)
3. [systemjs](https://github.com/systemjs/systemjs)
4. [es6-shim](https://github.com/paulmillr/es6-shim)
5. [rxjs](https://github.com/Reactive-Extensions/RxJS)


