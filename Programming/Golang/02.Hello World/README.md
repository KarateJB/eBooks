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


- greetings.go

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

Open `hello/hello.go`, we will the the method(s) from `greetings` module.


- hello.go

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
