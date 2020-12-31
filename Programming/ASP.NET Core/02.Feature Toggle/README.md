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

For example,

```csharp
[FeatureGate(FeatureFlags.Demo)]
[Route("api/[controller]")]
[ApiController]
public class DemoController : ControllerBase
{ }
```

