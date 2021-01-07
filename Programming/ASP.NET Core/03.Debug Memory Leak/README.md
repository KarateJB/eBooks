# Debug Memory Leak

> Requirement: > dotnet core 3.1

## Install dotnet SDK

```s
$ apt-get update && \
  apt-get install -y wget && \
  apt-get install -y apt-transport-https && \
$ wget https://packages.microsoft.com/config/ubuntu/20.10/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
$ dpkg -i packages-microsoft-prod.deb   
$ apt-get install -y dotnet-sdk-5.0 # or dotnet-sdk-3.1
```


## Install global tools

```s
$ dotnet tool install --global dotnet-trace
$ dotnet tool install --global dotnet-counters
```


