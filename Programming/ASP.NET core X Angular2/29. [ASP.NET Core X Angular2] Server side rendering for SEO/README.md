![](https://3.bp.blogspot.com/-AaGcD4-ND6c/WHc8zYG-tlI/AAAAAAAAEL0/KdrAhKTimeA43Q3nm2pj9_M_fYiljVHEwCLcB/s320/Angular2_Universal.jpg)

## Introduction

We take great advantage of better UX and performance in SPA ([Single Page Application](https://en.wikipedia.org/wiki/Single-page_application)), but dealing with [SEO](https://support.google.com/webmasters/answer/35291?hl=en) is a headache since SPA doesn’t perform well against the indexing of web crawler.

The best way for building a SEO friendly SPA is using server-side rendering.

In my previous article,
[[ASP.NET Core X Angular2] Render MVC view in ng2 component](http://ithelp.ithome.com.tw/articles/10187559)

We can render a MVC view from server side in angular component, but honestly, this way has some integration issues and is not easy to maintain.

So we will use [Angular Universal](https://universal.angular.io/) and [Microsoft.AspNetCore.SpaServices](https://github.com/aspnet/JavaScriptServices/tree/dev/src/Microsoft.AspNetCore.SpaServices) to build a server-side-rendering single page app.


#### Angular Universal

[Angular Universal](https://github.com/angular/universal) does server-side rendering and serves the single pages as what they behave on the client side. 

PS. There will be a chance (?) for integrating `Angular Universal` to `Angular CLI`, follow issues: [#1050](https://github.com/angular/angular-cli/issues/1050), [#3013](https://github.com/angular/angular-cli/issues/3013).
 
Here are some ways to use Angular Universal quickly,

1. [NodeJS :: Universal Starter repo](https://github.com/angular/universal-starter)
2. [ASP.NET Core :: Universal Starter repo](https://github.com/MarkPieszak/aspnetcore-angular2-universal)
3. [Angular Universal CLI repo](https://github.com/devCrossNet/universal-cli)


#### Microsoft.AspNetCore.SpaServices

This package enables the following functions for building SPA with `Angular2`, `React`, `Knockout`… in ASP.NET Core.

1.[Server-side rendering](https://github.com/aspnet/JavaScriptServices/tree/dev/src/Microsoft.AspNetCore.SpaServices#server-side-prerendering)
2.[Webpack dev middleware](https://github.com/aspnet/JavaScriptServices/tree/dev/src/Microsoft.AspNetCore.SpaServices#webpack-dev-middleware)
3.[Hot module replacement](https://github.com/aspnet/JavaScriptServices/tree/dev/src/Microsoft.AspNetCore.SpaServices#webpack-hot-module-replacement)
4.[Integrating server-side routing with client-side routing](https://github.com/aspnet/JavaScriptServices/tree/dev/src/Microsoft.AspNetCore.SpaServices#routing-helper-mapspafallbackroute)


## Implement


Since it’s fairly complex to integrate `Microsoft.AspNetCore.SpaServices` and `Angular Universal`, there is a quick way to get started with Angular2 server-side rendering on ASP.NET Core: [aspnetcore-spa generator](http://blog.stevensanderson.com/2016/05/02/angular2-react-knockout-apps-on-aspnet-core/).

#### Install

* webpack

```
npm install -g webpack
```

* aspnetcore-spa generator

```
npm install -g yo generator-aspnetcore-spa
```


#### Create New project

Under an empty folder, use the following command to create a new project.

```
yo aspnetcore-spa
```

And execute `dotnet restore`  and  `npm install` after the project is created.

![](https://3.bp.blogspot.com/-AiXHnh5WqhM/WHc9brYzgcI/AAAAAAAAEL8/f42FxcOWNpgEl6g5p4vqyplz6ZzjCgwwgCLcB/s1600/image001.png)


> PS. You can also create the SPA project by installing [ASP.NET Core Template Pack extension](https://visualstudiogallery.msdn.microsoft.com/31a3eab5-e62b-4030-9226-b5e4c9e1ffb5).


#### Server side rendering

Okay, take a look the view-source of our previous non-server-side-rendering app in the browser.

![](https://2.bp.blogspot.com/-8kEEFprt18Q/WHc9jdTw7NI/AAAAAAAAEMA/M67ve7hMgbE40if40J6VB-7uLtdSjJlEACLcB/s1600/image002.jpg)

![](https://2.bp.blogspot.com/-pK24m9Fuiwo/WHc9oaN34zI/AAAAAAAAEME/N3C_CeglN-UYRxHCpZZQZZsQvYYz99VPgCLcB/s1600/image003.png)


And now we implement the same codes on the template generated from [aspnetcore-spa generator](http://blog.stevensanderson.com/2016/05/02/angular2-react-knockout-apps-on-aspnet-core/). With `Angular Universal` and `ASP.NET Core SPA Services`, we have a server-side rendering app now! 

![](https://1.bp.blogspot.com/-3r_lCIwKh5Q/WHc9uFsHmhI/AAAAAAAAEMI/za0NiUfNjf8K4WQqQRfkV5u_4p5GR7HsgCLcB/s1600/image004.png)


#### Hot module replacement (Demo)

![](https://3.bp.blogspot.com/-b3NnEhJBNis/WHc9zQEiPQI/AAAAAAAAEMM/u-ObjSQrh8QoqRMXmV216cKLhddPH7otgCLcB/s1600/image005.gif)



## Summary

With [Angular Universal](https://universal.angular.io/), we can quickly build a SEO friendly Single page application with Angular2. Also [Angular Universal](https://universal.angular.io/) will support more backend frameworks in the near future!

> Angular Universal was originally built to work with a node.js back-end. There are adapters for most popular node.js server-side frameworks such as Express or Hapi.js. In addition to node.js, however, Angular Universal has ASP.NET Core support. In the near future we hope to add support for Java, PHP and Python. - From [Angular Universal document](https://universal.angular.io/)


## Reference

1. [Angular Universal](https://universal.angular.io/overview/)
2. [angular/universal (Github)](https://github.com/angular/universal)
3. [aspnet/JavaScriptServices](https://github.com/aspnet/JavaScriptServices/tree/dev/src/Microsoft.AspNetCore.SpaServices#server-side-prerendering)
4. [Server-Side Rendering in Angular 2 with Angular Universal](https://scotch.io/tutorials/server-side-rendering-in-angular-2-with-angular-universal)
5. [Angular 2, React, and Knockout apps on ASP.NET Core](http://blog.stevensanderson.com/2016/05/02/angular2-react-knockout-apps-on-aspnet-core/)

