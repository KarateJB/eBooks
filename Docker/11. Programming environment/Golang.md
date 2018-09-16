# Golang
---

Quick start by using the official Golang image, 

```
$ docker run -it golang /bin/bash
# go version

go version go1.11 linux/amd64
```


Compile a local .go

```
$ docker run --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp golang:<tag> go build -v /usr/src/myapp
```

> `-v`:  print the names of packages as they are compiled



## Create Dockerfile (Example 1.)

```
$ mkdir demo
$ cd demo
$ touch Dockerfile sample.go
```

#### sample.go

```
package main

import "fmt"

func main(){
    fmt.Println("Hello, world!")
}
```


#### Dockerfile

```
FROM golang:1.11

RUN mkdir -p /go/src/app
WORKDIR /go/src/app

# Copy local files to container
COPY . /go/src/app

RUN go build .
ENTRYPOINT ./app
```


### Build and run

```
$ docker build -t go-demo .
$ docker run -it --rm go-demo

Hello, world!
```


## Create Dockerfile (Example 2.)

```
$ mk
```

#### webapp.go

```
$ mkdir demo
$ cd demo
$ touch Dockerfile webapp.go
```

#### webapp.go

```
package main
import (
    "fmt"
    "net/http"
)
func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello %s", r.URL.Path[1:])
}
func main() {
    http.HandleFunc("/World", handler)
    http.ListenAndServe(":8080", nil)
}
```

#### Dockerfile

```
FROM golang:1.11

RUN mkdir -p /go/src/web-app
WORKDIR /go/src/web-app

# Copy local files to container
COPY . /go/src/web-app

# Set environment variable: $PORT
ENV PORT 8080

# Expose port 8080
EXPOSE 8080

RUN go build .
ENTRYPOINT ./web-app
```

### Build and run

```
$ docker build -t go-web-demo .
$ docker run -d --rm -p 8080:8080 go-web-demo
$ curl http://$(docker-machine ip default):8080/World
Hello World
```


## Reference

- [如何在 Docker 中设置 Go 并部署应用](https://linux.cn/article-8113-1.html)
