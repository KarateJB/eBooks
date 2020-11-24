![](https://1.bp.blogspot.com/-fEGdxW0nyK8/WHg9tals8oI/AAAAAAAAENA/FMtwVoSRj-E2J7RVc2dSH7nx5ZoSPX43wCLcB/s1600/firebase.png)

## Introduction

Let’s learn how to deploy our Angular2 website to [Firebase hosing](https://firebase.google.com/docs/hosting/) via [Firebase CLI](https://github.com/firebase/firebase-tools).

## Environment

* Angular CLI 1.0.0-beta.19.3
* Firebase CLI 3.2.1

## How to deploy


#### Install Firebase CLI

```
npm install -g firebase-tools
```

#### Build

Build our Angular2 website with `Angular CLI` by this command.

```
ng build --prod
```

> The ready-to-deploy files are in */dist*


#### Deploy 

Before deployment, we should set up the Firebase options.
Type
```
firebase init
```
for setting the following options,


> 1. What Firebase CLI features do you want to setup?
> Choose `Hosting`.
> 2. What Firebase project fo yu want to associate as default?
> Select your default project.
> 3. What file should be used for Database Rules?
> Use default file: `database.rule.json`, which will be initialized with the settings in the  Firebase database rules.
> 4. What do you want to use as your publis directory?
> Of course that will be "`dist`".
> 5. Configure as a single-page app (rewrite all urls to /index.html)?
> Choose yes will make every route shows the url as http://XXX/index.html but not the route url in the browser.
> 6. File dist/index.html already exists. Overwrite? 
> No


The above settings will create 3 files in your website,

1. database.rules.json
2. filebase.json
3. .firebaserc

> Notice `.firebaserc` keeps the default Firebase project name associated with our website.

Okay, everything is done, use the command to deploy.

```
firebase deploy
```

And we will successfully deploy our website to `Firebase` :)

![](https://4.bp.blogspot.com/-6xyoOj1VTy8/WHg7doKJAOI/AAAAAAAAEMo/BgkFN3KApCY-RHXvMZeyi-2hUZM32axawCLcB/s1600/image001.jpg)


#### How to make the website offline?

```
firebase hosting:disable
```

![](https://2.bp.blogspot.com/-nwuquSY-m1I/WHg7mn9xM_I/AAAAAAAAEMw/ei0EjOGnKNk4RueOQlVsLYUV2v2j_HQqgCLcB/s1600/image003.jpg)

## Reference

1. [Deploy Angular CLI Apps to Firebase](https://coryrylan.com/blog/deploy-angular-cli-apps-to-firebase)
2. [https://firebase.google.com/docs/cli/](https://firebase.google.com/docs/cli/)

