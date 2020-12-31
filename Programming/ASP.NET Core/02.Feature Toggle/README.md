# Feature Toggle

## Introduction

While we have more and more features (APIs…) and environments (SIT, Staging…), we want to enable/disable certain features on specific environments by feature toggle.

This article shows how to do feature toggle by two ways

- Implement IAsyncResourceFilter
- Use official package: [Microsoft.FeatureManagement.AspNetCore](https://github.com/microsoft/FeatureManagement-Dotnet)


## Implement IAsyncResourceFilter

**Resource filters** will be after Authorization filters and before Action filters and model binding, so we can implement [IAsynResourceFilter](https://docs.microsoft.com/zh-tw/dotnet/api/microsoft.aspnetcore.mvc.filters.iasyncresourcefilter) to intercept the request and return 404(Not found) immediately.


- DisableApiFilter.cs

```csharp
public class DisableApiFilter : Attribute, IAsyncResourceFilter
{
    private readonly string env = string.Empty;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="hostEnvironment">IWebHostEnvironment</param>
    /// <param name="options">IOptions</param>
    /// <param name="onEnv">Regex for checking ASPNETCORE_ENVIRONMENT</param>
    public DisableApiFilter(
        IWebHostEnvironment hostEnvironment,
        IOptions<AppSettings> options,
        string onEnv = "")
    {
        this.env = hostEnvironment.EnvironmentName;
        this.OnEnv = string.IsNullOrEmpty(onEnv) ? options.Value?.EnvForDisableApiFilter : onEnv;
    }

    /// <summary>
    /// Regression expression of ASPNETCORE_ENVIRONMENT for disabling API
    /// </summary>
    public string OnEnv { get; set; }

    /// <summary>
    /// OnResourceExecutionAsync
    /// </summary>
    /// <param name="context">ResourceExecutingContext</param>
    /// <param name="next">ResourceExecutionDelegate</param>
    public async Task OnResourceExecutionAsync(ResourceExecutingContext context, ResourceExecutionDelegate next)
    {
        if (string.IsNullOrEmpty(this.OnEnv))
        {
            await next();
        }
        else
        {
            var regex = new Regex(this.OnEnv);

            if (regex.IsMatch(this.env))
            {
                context.Result = new EmptyResult();
                context.HttpContext.Response.StatusCode = StatusCodes.Status404NotFound;
            }
            else
            {
                await next();
            }
        }
    }
}
```


### Use DisabelApiFilter by setting regex pattern

The variable: `OnEnv`, is the parameter of the filter that supports Regular Expression.
When environment variable: `ASPNETCORE_ENVIRONMENT` matches the `OnEnv`, the filter will force the API to return 404.

For example, the following API will responece 404 when `ASPNETCORE_ENVIRONMENT`'s value contains `Production` or `production`.

```csharp
[TypeFilter(typeof(DisableApiFilter), Arguments = new object[] { "^(.*)[Pp]roduction(.*)$" })]
[HttpGet]
public async Task<IActionResult> Demo()
{}
```

### Use DisableApiFilter by default regex pattern

We can set a default regex pattern to be checked in `DisableApiFilter` when parameter `OnEnv` is not be specified.

- appsettings.json

```json
{
  "EnvForDisableApiFilter": "^(.*)[Pp]roduction(.*)$",
}
```

And we can disable API on demand environment(s) like this,

```csharp
[TypeFilter(typeof(DisableApiFilter))]
[HttpGet]
public async Task<IActionResult> Demo()
{}
```




## Microsoft.FeatureManagement.AspNetCore

Github: [microsoft/FeatureManagement-Dotnet](https://github.com/microsoft/FeatureManagement-Dotnet)

> This official package supports Feature toggle dynamically.

### Install Nuget package

- [Microsoft.FeatureManagement.AspNetCore](https://www.nuget.org/packages/Microsoft.FeatureManagement.AspNetCore)


### Feature Management Configuration

Define the key **FeatureManagement** in `appsettings.json` like following,


- appsettings.json

```json
"FeatureManagement": {
    "ApiDoc": false,
    "Demo": true,
    "DemoGlobalFilter": true,
    "Tests": true,
    "ServerEnvHeader": false
}
```

We can create a enum for later usage.

- FeatureFlags

```csharp
public enum FeatureFlags
{
    ApiDoc = 1,
    Demo,
    DemoGlobalFilter,
    Tests,
    ServerEnvHeader
}
```



### Enable Feature Management

- Startup.cs

```csharp
public void ConfigureServices(IServiceCollection services)
{
    // Add feature mangement services 
    services .AddFeatureManagement();

    services .AddControllers() .AddNewtonsoftJson();
}
```



### Feature toggle by Attribute

Now we can set feature toggle on API (Controller or Action) with [FeatureGateAttribute](https://github.com/microsoft/FeatureManagement-Dotnet/blob/main/src/Microsoft.FeatureManagement.AspNetCore/FeatureGateAttribute.cs).

For example, the API will return 404 if we set `false` on the mapping feature flag on `appsettings.json`.

```csharp
[FeatureGate(FeatureFlags.Demo)]
[Route("api/[controller]")]
[ApiController]
public class DemoController : ControllerBase
{ }
```

We can also use the injected `Microsoft.FeatureManagement.IFeatureManager` instance to get the value of feature flag.

```csharp
[ApiController]
public class DemoController : ControllerBase
{
    private readonly IFeatureManager featureManager = null;

    public DemoController( IFeatureManager featureManager)
    {
        this.featureManager = featureManager;
    }

    [HttpGet]
    public async Task<IActionResult> TestDisableApiFilter()
    {
        if (await featureManager.IsEnabledAsync(nameof(FeatureFlags.Tests)))
        {
            return this.Ok();
        }
        else 
        {
            return StatusCode(StatusCodes.Status404NotFound);
        }
    }

}
```

This is useful when we can control enabling certain features on startup of application.
For example, we can toggle API Document, like [Swagger](https://docs.microsoft.com/en-us/aspnet/core/tutorials/web-api-help-pages-using-swagger) with an extension method,


-  IApplicationBuilderExtensions.cs

```csharp
public static IApplicationBuilder UseToggleFeatures(this IApplicationBuilder app)
{
    var featureManager = app.ApplicationServices.GetService<Microsoft.FeatureManagement.IFeatureManager>();
    bool isEnableApiDoc = featureManager.IsEnabledAsync(nameof(FeatureFlags.ApiDoc)).Result;

    if (isEnableApiDoc)
    {
        // Enable something like Swagger, etc...
    }

    return app;
}
```

And apply it in `Startup.cs`,

- Startup.cs

```csharp
public class Startup
{
    public void Configure(IApplicationBuilder app)
    {
        // Use toggle features
        app.UseToggleFeatures();
    }
}
```


### Feature Management Configuration from other service

We can implement [IFeatureDefinitionProvider](https://github.com/microsoft/FeatureManagement-Dotnet/blob/main/src/Microsoft.FeatureManagement/IFeatureDefinitionProvider.cs) to get the Feature Management Configuration from other service's API.

We will use [json-server](https://github.com/typicode/json-server) to have an API running on `http://localhost:3000/feature-configuration`, which will returns the json configuration as below,

![](assets/remote-feature-management-config.jpg)


Now lets see how to load the configuration by implementing the custom `IFeatureDefinitionProvider`.


#### Implement IFeatureDefinitionProvider

We can take a look at [ConfigurationFeatureDefinitionProvider.cs](https://github.com/microsoft/FeatureManagement-Dotnet/blob/main/src/Microsoft.FeatureManagement/ConfigurationFeatureDefinitionProvider.cs) and try to create our custom one.

> The sample code also refer to the following article:
> [[料理佳餚] 實作 IFeatureDefinitionProvider 從外部的服務載入 ASP.NET Core Feature Flags（Feature Toggle）的設定](https://dotblogs.com.tw/supershowwei/2020/11/23/180548)



- RemoteFeatureDefinitionProvider.cs

```csharp

```



