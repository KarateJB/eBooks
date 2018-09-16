# GOlang
---

```
$ docker run -it golang /bin/bash
# go version

go version go1.11 linux/amd64
```



#### smaple.go

```
package main

import "fmt"

func main(){
    fmt.Println("Hello, world!")
}
```


```
FROM golang:1.11

RUN mkdir -p /go/src/app
WORKDIR /go/src/app

# Copy local files to container
COPY . /go/src/app

RUN go build .
ENTRYPOINT ./app
```


```
$ docker build -t go-demo .
$ docker run -it --rm go-demo

Hello, world!
```




### Compile

```
$ docker run --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp golang go build -v /usr/src/myapp
```




## Reference

- [如何在 Docker 中设置 Go 并部署应用](https://linux.cn/article-8113-1.html)
