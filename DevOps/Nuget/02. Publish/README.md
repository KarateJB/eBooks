## Nuget server/feed

### Add source

```
$ nuget sources add -name <MyNugetServer> -source http://xxxxxxxx2:8080/nuget -username xxxx -password xxxx
```


We can determine which `NuGet.Config` to apply the new feed by `-config`,

```
$ nuget sources add -name "MyNugetServer" -source http://xxxxx:8080/nuget -username xxxx -password xxx -configfile %AppData%\NuGet\Nuget.config
```

The default path of `Nuget.Config` is in
- %AppData%\NuGet\NuGet.Config (Windows) 
- ~/.nuget/NuGet/NuGet.Config (Mac/Linux)  

### Remove source

```
$ nuget sources remove -name <MyNugetServer>
```

### List sources

```
$ nuget source list
```


### List packages from source

```
$ nuget list -source <MyNugetServer>
```


### Publish nupkg package

```
$ nuget publish <nupkg_file_name> -Source <MyNugetServer> -apikey xxxxxxx
```


### Remove package

```
$ nuget delete <nupkg_file_name> <version> -source <MyNugetServer> -apikey xxxxxxx
```

For example,

```
$ nuget delete JB.Infra.Util 0.0.0.30 -Source MyNugetServer -apikey xxxxxxx
```
