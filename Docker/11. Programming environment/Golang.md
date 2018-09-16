# GOlang
---

```
$ docker run -it golang /bin/bash
# go version
```




#### smaple.go

```
package main

import "fmt"

func main(){
    fmt.println("Hello, workd!")
}
```

```
FROM golang:latest

RUN mkdir -p /go/src/web-app
WORKDIR /go/src/web-app

# Copy local files to container
COPY . /go/src/web-app

# Download go-wrapper
RUN go-wrapper download
RUN go-wrapper install

ENV PORT 8080
EXPOSE 8080
CMD ["go-wrapper", "run"]
```


```
$ docker build -t golang-demo .
$ docker run -it --rm golang-demo
+ exec app
```


### Compile

```
$ docker run --rm -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp golang go build -v /usr/src/myapp
```




## Reference

- [如何在 Docker 中设置 Go 并部署应用](https://linux.cn/article-8113-1.html)
