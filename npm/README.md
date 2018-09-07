# What is npm

A JavaScript package manager.


# Install

Install [Node.js](https://nodejs.org/en/download/).

Check version

```
$ npm -v
```   


# Steps

### Initialize package.json

```
$ npm init
```

> Reference: [package.json](https://docs.npmjs.com/files/package.json)  


### Search package

```
$ npm search {package_name}
```  


### Find package versions

```
$ npm view {package_name}
```  

```
$ npm show {package_name} version
```  

```
$ npm show {package_name} versions
```  

> Go to [npm](https://www.npmjs.com) to find the packages.  


### Install packages  

1. Install globally

   ```
   $ npm install {package_name} -g
   ```  

2. The latest release version for production (Default)

   ```
   $ npm install {package_name} --save
   ```

   > or use [--no-save] option.  


3. The latest release version for **devDependencies**

   ```
   $ npm install {package_name} --save-dev
   ```  

4. Specific version

   `$ npm install {package_name}@latest`

   `$ npm install {package_name}@">=0.1.0 <0.2.0"`  


5. Latest version of 3.X.X
   
   `$ npm install {package_name}@"^3.0.0"`  

6. Latest version of 3.2.X

   `$ npm install {package_name}@"~3.2.0"`  

   > Reference: [npm-install](https://docs.npmjs.com/cli/install)  


### Install packages from package.json

```
$ npm install
```

To install only those in `devDependencies`:

```
$ npm install --only=dev[elopment]
```
To install without those in `devDependencies`:

```
$ npm install --only=prod[uction]
```



### Uninstall packages 
np
1. Uninstall global package

   ```
   $ npm uninstall {package_name} -g
   ```  

2. Uninstall local package

   ```
   $ npm uninstall {package_name} --save
   ```  

   ```
   $ npm uninstall {package_name} --save-dev
   ```  



## List packages installed

```
$ npm list [package_name] [-g] [--depth=0]
```  


# More 

1. [nvm(Node Version Manager)](https://github.com/creationix/nvm)
2. [Yarn](https://github.com/yarnpkg/yarn)  