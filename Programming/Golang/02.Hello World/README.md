# Hellow World

This is the tutorial from official [golang.org](https://golang.org/doc/tutorial/create-module).
I will short it up in this article.

The sample code is at [karatejb/Go.Samples]().


## Files Structure

Create the folder and files like following,

```s
├── greetings
|  └──  greetings.go
└── hello
   └── hello.go
```



## Module: greetings

In `greetings.go`, first create a method that can return random greeting message,


---
`greetings.go`

```go
package greetings

import (
	"errors"
	"fmt"
	"math/rand"
	"time"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

func randomFormat() string {
    // A slice of message formats
	formats := []string{
        "Hi, %v. Welcome!",
		"Great to see you, %v!",
		"Hail, %v! Well met!",
	}

	return formats[rand.Intn(len(formats))]
}
```


The `greetings` module supports the following methods:

```go
// Hello returns a welcome message for the named person.
func Hello(name string) (string, error) {
    if name == "" {
		return "", errors.New("Empty name")
	}

	// message := fmt.Sprintf("Hi, %v. Welcome!", name)
	message := fmt.Sprintf(randomFormat(), name)
	return message, nil
}
```

```go
// Hellos returns a map that associate each of the named people with a greeting message
func Hellos(names []string) (map[string]string, error) {
	// A map to associate names with messages
	messages := make(map[string]string)

	for _, name := range names {
		msg, err := Hello(name)
		if err != nil {
			return nil, err
		}

		messages[name] = msg
	}

	return messages, nil
}
```


### Create go.mod file

Run the `go mod init` command with the module path: `example.com/greetings`, to create `go.mod` file.

```s
$ go mod init example.com/greetings
go: creating new go.mod: module example.com/greetings
```

Now our files structure is as following,

```s
├── greetings
|  ├── go.mod
|  └──  greetings.go
└── hello
   └── hello.go
```

The `greetings/go.mod`'s content:

```
module example.com/greetings

go 1.15
```


## Module: hello

Open `hello/hello.go`, we will call the method(s) from `greetings` module.

First, lets create the `go.mod` file, and import `greetings` module by replacing the `greetings` module path.

```s
$ cd hello
$ go mod init hello
go: creating new go.mod: module hello
$ go mod edit -replace "example.com/greetings = ../greetings"
```

Here, the [replace directive](https://golang.org/ref/mod#tmp_15) tells Go to replace the module path with a path we specify. In this case, that's a `greetings` directory next to the `hello` directory.


Then add the `greetings` module as a dependency with following command,

```s
$ go mod edit -require example.com/greetings@1.1.0
```

The `hello/go.mod` will be with these content,

```s
module hello

go 1.15

replace example.com/greetings => ../greetings

require example.com/greetings v1.1.0
```


---
`hello.go`

```go
package main

import (
	"fmt"

	greetings "example.com/greetings"
)

func main() {
	// Hello message for a single person
	message, _ := greetings.Hello("JB")
	fmt.Printf(message + "\n")

	// Hello messages for a group
	names := []string{"Dog", "Cat", "Rabbit"}
	messages, _ := greetings.Hellos(names)
	for _, msg := range messages {
		fmt.Println(msg)
	}
}
```

Now run and see the result,

```s
$ cd hello
$ go run hello.go
Great to see you, JB!
Hi, Rabbit. Welcome!
Hi, Dog. Welcome!
Hi, Cat. Welcome!
```

### (Optional) Build The Package

We can compile the packages to the resulting executable to an output file.

```s
$ go build
```

And now we can we can execute the `hello.exe` by `./hello.exe`.

The final files structure is as following,

```s
├── greetings
|  ├── go.mod
|  └── greetings.go
└── hello
   ├── go.mod
   ├── hello.exe
   └── hello.go
```


### (Optional) Logging

[log](https://golang.org/pkg/log/) is a package for logging.
Lets modify the original sample code to support logging the error message.

```go
package main

import (
	"fmt"
	"log"

	greetings "example.com/greetings"
)

func main() {
	log.SetPrefix("greetings: ")
	log.SetFlags(log.LstdFlags | log.Lshortfile) // Set to 1 as default format, or use constant flags, see https://golang.org/pkg/log/#pkg-constants

	// Hello message for a single person
	message, err := greetings.Hello("JB")

	if err != nil {
		log.Fatal(err)
		// Output "greetings: 2021/01/20 11:04:10 hello.go:17: Empty name"
	}

	fmt.Printf(message + "\n")

	// Hello messages for a group
	names := []string{"Dog", "Cat", "Rabbit"}
	messages, err := greetings.Hellos(names)
	if err != nil {
		log.Fatal(err)
		// Output "greetings: 2021/01/20 11:04:10 hello.go:17: Empty name"
	}

	for _, msg := range messages {
		fmt.Println(msg)
	}
}
```



## Reference

- [Call your code from another module](https://golang.org/doc/tutorial/call-module-code)
- [Return and handle an error](https://golang.org/doc/tutorial/handle-errors)




