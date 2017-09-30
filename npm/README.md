## What is npm

A JavaScript package manager.


## Install

Install [Node.js](https://nodejs.org/en/download/).


* Check version

```
$ npm -v
```


## Steps

1. Initialize package.json

```
$ npm init
```
> Reference: [package.json](https://docs.npmjs.com/files/package.json)

2. Search package

```
$ npm search {package_name}
```

3. Find package versions

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


3. Install packages 

* Install globally

```
$ npm install {package_name} -g
```

* The latest release version for production (Default)
```
$ npm install {package_name} --save
```

> or use [--no-save] option.


* The latest release version for **devDependencies**
```
$ npm install {package_name} --save-dev
```

* Specific version

`$ npm install {package_name}@latest`

`$ npm install {package_name}@">=0.1.0 <0.2.0"`


* Latest version of 3.X.X
`$ npm install {package_name}@"^3.0.0"`

* Latest version of 3.2.X
`$ npm install {package_name}@"^3.2.0"`

> Reference: [npm-install](https://docs.npmjs.com/cli/install)


4. uninstall packages 

* Uninstall global package
```
$ npm uninstall {package_name} -g
```

* Uninstall local package

```
$ npm uninstall {package_name} --save
```

```
$ npm uninstall {package_name} --save-dev
```



5. List packages installed

```
$ npm list [package_name] [-g] [--depth=0]
```


## More 

1. [nvm(Node Version Manager)](https://github.com/creationix/nvm)
2. [Yarn](https://github.com/yarnpkg/yarn)