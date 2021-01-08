# Debug Memory Leak

> Requirement: > dotnet core 3.1

## Install dotnet SDK

```s
$ apt-get update && \
  apt-get install -y wget && \
  apt-get install -y apt-transport-https && \
$ wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
$ dpkg -i packages-microsoft-prod.deb   
$ apt-get update
$ apt-get install -y dotnet-sdk-5.0 # or dotnet-sdk-3.1
```


## Install global tools

```s
$ dotnet tool install --global dotnet-trace
$ dotnet tool install --global dotnet-counters
```

Notice that the tool(s) will be installed to `~/.dotnet/tools`.
To execute the tool, use like this,

```s
$ ~/.dotnet/tools/dotnet-trace ps
1 dotnet     /usr/share/dotnet/dotnet

$ ~/.dotnet/tools/dotnet-counters monitor --refresh-interval 1 -p 1
```

It will show...

![](assets\gc_heap_size.jpg)





