# Node.js


## node:onbuild

```
$ mkdir nodejs
$ cd nodejs
$ touch Dockerfile server.js index.html
```

- Dockerfile

```
FROM node:4-onbuild
EXPOSE 8888
```

- server.js

```
'use strict';

var connect = require('connect');
var serveStatic = require('serve-static');

var app = connect();
app.use('/', serveStatic('.'), {'index': ['index.html'] });
app.listen(8888);

console.log('Server is online...');
```

- index.html

```
<!DOCTYPE html>
<html lang="en">
<head></head>
  <body>
      <h2>Hello, Nodejs!</h2>  
  </body>
</html>
```


- package.json

Create a package.json by 

```
$ npm init
```

and install the [connect](https://www.npmjs.com/package/connect) and [serve-static](https://www.npmjs.com/package/serve-static) packages,

```
$ npm install connect --save
$ npm install serve-static --save
```


### Build and run


```
$ docker build -t node-demo .
$ docker run -it --rm -P --name my-nodejs node-demo
```


Test the web server inside the container,

```
$ docker exec -it my-nodejs bash
root@118ea35e34:/usr/src/app# curl http://localhost:8888
```

Or browse it outside the container by `http://$(docker-machine ip default):<mapping port>`.

To get mapping port, use `docker ps --filter "name=my-nodejs"` or `docker container port my-nodejs`

![](asssets/nodejs-001.png)



## node:slim

The recommand node's images are `node:<version>` or `node:<version>-slim` if you would like a minimum-size environment.
See more in [Official Node.js Docker hub](https://hub.docker.com/_/node/) 

Here is the sample for using `node:slim`.

> Copy the `index.html`, `package.json`, `server.js` from the sample in `node:onbuild`



- Dockerfile

```
FROM node:10.9-slim

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN rm Dockerfile && npm install
EXPOSE 8888

CMD ["node", "server.js"]
```


### Build and run

```
$ docker build -t nodeslim-demo .
$ docker run -it --rm -p 1212:8888 nodeslim-demo
```

Test result:

```
$ curl http://$(docker-machine ip default):1212
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
      <h2>Hello, Nodejs!</h2>
  </body>
  </html>
```
