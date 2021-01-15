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
$ dotnet tool install --global dotnet-dump
```

Notice that the tool(s) will be installed to `~/.dotnet/tools`.
To execute the tool, use like this,

```s
$ ~/.dotnet/tools/dotnet-trace ps
1 dotnet     /usr/share/dotnet/dotnet

$ ~/.dotnet/tools/dotnet-counters monitor --refresh-interval 1 -p 1
```

The `--refresh-interval` is the number of seconds to refresh the information.
It will show...

![](assets\gc_heap_size.jpg)


## Generate memory dump

We can use `dotnet-dump` to generate the memory dump of a .NET Core application.

```s
$ ~/.dotnet/tools/dotnet-dump collect -p 1
Writing full to /root/.dotnet/tools/core_20210115_195251
Complete
```


## Analyze the dump

Analyze the dump file by the following command,

```s
$ ~/.dotnet/tools/dotnet-dump analyze core_20210115_195251
Loading core dump: core_20210115_195251 ...
Ready to process analysis commands. Type 'help' to list available commands or 'help [command]' to get detailed help on a command.
Type 'quit' or 'exit' to exit the session.
```

To look at the stat of the managed heap:

```s
> dumpheap -stat
Statistics:
              MT    Count    TotalSize Class Name
00007fbe58b03708       22         2464 System.Diagnostics.Tracing.EventSource+OverideEventProvider
00007fbe5da12638       62         2480 System.Collections.Generic.List`1+Enumerator[[Microsoft.AspNetCore.Mvc.ApplicationModels.SelectorModel, Microsoft.AspNetCore.Mvc.Core]]
00007fbe5904e758       62         2480 System.Collections.Generic.List`1+Enumerator[[Microsoft.Extensions.Configuration.IConfigurationProvider, Microsoft.Extensions.Configuration.Abstractions]]


> dumpheap -mt 00007fbe58b03708
         Address               MT     Size
00007fbb08041ab8 00007fbe58b03708      112
00007fbb08041b80 00007fbe58b03708      112
...
00007fbb480ad978 00007fbe58b03708      112
00007fbb480ada40 00007fbe58b03708      112

Statistics:
              MT    Count    TotalSize Class Name
00007fbe58b03708       22         2464 System.Diagnostics.Tracing.EventSource+OverideEventProvider
Total 22 objects


> gcroot -all 00007fbb08041ab8 
HandleTable:
    00007FBED12513E0 (pinned handle)
    -> 00007FBDA7FFF038 System.Object[]
    -> 00007FBB080416E8 Microsoft.AspNetCore.Hosting.HostingEventSource
    -> 00007FBB08041AB8 System.Diagnostics.Tracing.EventSource+OverideEventProvider

Found 1 roots.
```

We can see the HandleTable and identify the source of major memory leaks come from.



## Reference

- [Debug a memory leak in .NET Core](https://docs.microsoft.com/en-us/dotnet/core/diagnostics/debug-memory-leak)





