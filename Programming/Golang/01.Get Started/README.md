# Get Started

## Install Go

### Windows

Download and install from [official site](https://golang.org/doc/install).
Or use [Chocolaty](https://chocolatey.org/) to install [Go](https://chocolatey.org/packages/golang#install):

```s
$ choco install golang [--version 1.15.6]
```

To upgrade it,

```s
$ choco upgrade golang
```


### Ubuntu

```s
$ sudo add-apt-repository ppa:longsleep/golang-backports
$ sudo add-apt-repository ppa:gophers/archive
$ sudo apt update
```


To install the latest version of Go:

```s
$ sudo apt install -y golang-go
```

Or install certain version:

```s
$ sudo apt install -y golang-1.15-go
```

#### Add PATH environment variables

Open `~/.profile`, and append the following texts:

```s
export GOROOT=/usr/lib/go-1.15  # Change to the version you installed
export GOPATH=$HOME/go # This will be where the import packages located
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
```

Then execute the above commands by,

```s
$ source ~/.profile
```


#### (optional) Install GCC

```s
$ sudo apt-get install build-essential
```



