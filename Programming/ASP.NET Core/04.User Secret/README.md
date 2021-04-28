# User Secret

The [Secret Manager tool](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0&tabs=windows#secret-manager) stores sensitive data during the development of ASP.NET Core project.

## How it works


### Where are the secrets

- Windows

```
%APPDATA%\Microsoft\UserSecrets\<user_secrets_id>\secrets.json
```

- Linux/macOS

```
~/.microsoft/usersecrets/<user_secrets_id>/secrets.json
```


### User secrets configuration provider

> The user secrets configuration source is automatically added in **Development mode** when the project calls [CreateDefaultBuilder](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.hosting.host.createdefaultbuilder), and it calls [AddUserSecrets](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.configuration.usersecretsconfigurationextensions.addusersecrets) when the environment is Development.

- Program.cs

```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
```



## Init user secret

Under your ASP.NET Core project,

```s
$ dotnet user-secrets init
```

Which will modify the project file and give a secret id, e.q.

```xml
<PropertyGroup>
   <TargetFramework>net5</TargetFramework>
   <UserSecretsId>e33a67fc-b413-4d84-9367-41c68735377c</UserSecretsId>
</PropertyGroup>
```

## Set secret

We can replace the content of `appsetting.json` by setting the mapping settings to user secrets

For example, my `appsettings.json` contains the Database connection strings as following,

```json
{
  "ConnectionStrings": {
    "Demo_PG": "Server=localhost;Port=5432;Database=Demo;User Id=xxxxx;Password=xxxxx;", // For PostgreSQL
    "Demo_MSSQL": "Server=.;Database=xxxxx;Persist Security Info=True;User ID=xxxx;Password=xxxx;MultipleActiveResultSets=true" // SQL Server
  }
}
```

Then we can set secrets to replace them,

```s
$ dotnet user-secrets set "ConnectionStrings:Demo_PG" "Server=localhost;Port=5432;Database=Demo;User Id=user;Password=pwd;"
$ dotnet user-secrets set "ConnectionStrings:Demo_MSSQL" "Server=.;Database=Demo;Persist Security Info=True;User ID=user;Password=pwd;MultipleActiveResultSets=true"
```

The `secrets.json`:

```json
{
  "ConnectionStrings:Demo_PG": "Server=localhost;Port=5432;Database=Demo;User Id=user;Password=pwd;"
  "ConnectionStrings:Demo_MSSQL": "Server=.;Database=Demo;Persist Security Info=True;User ID=user;Password=pwd;MultipleActiveResultSets=true"
}
```

To list the user secrets:

```s
$ dotnet user-secrets list
```



## Remove/Clear secret(s)

```s
$ dotnet user-secrets remove "ConnectionsStrings:Demo_PG"
```

or remove all by,

```s
$ dotnet user-secrets clear
```


## Advanced Uages

We can use the secrets by the Configuration API.

```csharp
public void ConfigureServices(IServiceCollection services)
{
    // Read the configuration
    var pgConnString = this.Configuration["ConnectionStrings:Demo_PG"];

    // Bind the configuration to an object
    var connsConfig = this.Configuration.GetSection("ConnectionStrings").Get<ConnectionStringOptions>();
    
    // Inject the configuration
    services.Configure<AppSettings>(this.Configuration);
}
```

And we can use them by Dependency Injection,

```csharp
private readonly AppSettings appSettings = null;

public TestController(
             IOptions<AppSettings> configuration)
{
    this.appSettings = configuration.Value;
}
```


## Reference

- [Safe storage of app secrets in development in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0&tabs=windows#secret-manager)




