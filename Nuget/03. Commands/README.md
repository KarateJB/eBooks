
## Dotnet

- Add Nuget package

```
$ dotnet add package JB.Infra.Util --version 0.0.0.50 --source MyNugetServer
```


## Nuget Server

- Add new Nuget Server

```
$ nuget sources add -name "MyNugetServer" -source http://xxxxx:8080/nuget -username xxxx -password xxx -configfile %AppData%\NuGet\Nuget.config
//C:\Users\jb\AppData\Roaming\NuGet
```

- Remove Nuget Server

```
$ nuget sources remove -name MyNugetServer
```

- List all Nuget Server(s)

```
$ nuget source list
```


## Nuget Package

- List all Nuget Packages

```
$ nuget list -Source MyNugetServer
```


- List all available versions of a package

```
$ nuget list JB.Infra.Util -AllVersions  -Source MyNugetServer
```


- Delete package with certain version

```
$ nuget delete JB.Infra.Util 0.0.0.30 -Source MyNugetServer -apikey xxxxxxx
```



