## Introduction

We will learn the following ways to use **Configuration** in ASP.NET Core project.

1. Inject to Service Container
2. Create a static config-provider

## Environment

* Visual Studio 2015 Update 3  
* Microsoft.AspNetCore.Mvc 1.0.0


## Implement


#### Default way

Here is the default way to read the contents in `appsettings.json`.

* Startup.cs

```
public IConfigurationRoot Configuration { get; }

public Startup(IHostingEnvironment env)
{
    var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
    Configuration = builder.Build();

    var siteName = Configuration["Config:SiteName"];
}
```

* appsettings.json

```
{
  "Config": {
    "SiteName": "ASP.NET Core X Angular2",
    "SiteOwner":  "2016 JB"
  }
}
```

#### Inject to Service container

Create a class to store the configuration values.

* ConfigManager.cs

```
public class ConfigManager
{
        public string SiteName { get; set; }
        public string SiteOwner { get; set; }
}
```


* Startup.cs

Then inject the configurations as a `ConfigManager` object to the Service container.

```
public void ConfigureServices(IServiceCollection services)
{
      //Skip…

      services.Configure<ConfigManager>(Configuration.GetSection("Config"));
}
```

![](https://3.bp.blogspot.com/-xvrcvXgxfSw/WG9rUfrrnqI/AAAAAAAAEIw/PPhbGbQ4xCogHjqzG6g8ONz-JpzWL1T8wCLcB/s1600/image001.png)


#### Usage in MVC Controller

```
private ConfigManager _configManager = null;

public HomeController(IOptions<ConfigManager> options)
{
    IOptions<ConfigManager> cfgMangerOptions = options;
  this._configManager = cfgMangerOptions.Value;
}
public IActionResult Index()
{
    ViewBag.Title = this._configManager.SiteName;
    ViewBag.Owner = this._configManager.SiteOwner;
    return View();
}

```

Result:

![](https://2.bp.blogspot.com/-uEzA70mO_jY/WG9rZstXWRI/AAAAAAAAEI0/K_hu3UB84vkljVPH1CBy3xUspvSbAe4jwCLcB/s640/image002.png)


#### Create a static config-provider

Here is the other simple way to make the configurations available at any class, not just Controller. Just create a static class to store them.

* ConfigProvider.cs

```
public static class ConfigProvider
{
        public static string SiteName { get; set; }
        public static string SiteOwner { get; set; }
}
```

* Startup.cs

```
public void ConfigureServices(IServiceCollection services)
{
      //Skip …
      var configManager = new ConfigManager();
      Configuration.GetSection("Config").Bind(configManager);
      ConfigProvider.SiteName = configManager.SiteName;
      ConfigProvider.SiteOwner = configManager.SiteOwner;
}
```

Notice that we could bind the configuration values recursively into a complex class with `Configuration.GetSection("Config").Bind()` function.

* Usage

```
ViewBag.Title = ConfigProvider.SiteName;
ViewBag.Owner = ConfigProvider.SiteOwner;
```

Result :

![](https://3.bp.blogspot.com/-V3nWDNFNft8/WG9rhjXbwUI/AAAAAAAAEI4/GGJPFI3BJ6kruRNmvWtSDbil5WMAulY1QCLcB/s1600/image003.png)




#### IOptionsSnapshot

> Requires ASP.NET Core 1.1 or higher.

ASP.NET Core 1.1 and higher versions support reloading configuration data when the configuration file has changed. Take a look at the sample in [ASP.NET Core documents](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration?highlight=options#using-options-and-configuration-objects).

## Reference

1. [ASP.NET Core documents](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration?highlight=options#using-options-and-configuration-objects)
