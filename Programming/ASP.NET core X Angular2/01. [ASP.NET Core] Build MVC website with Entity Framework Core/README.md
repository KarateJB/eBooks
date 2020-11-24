## Introduction

Let's begin learning how to build a development environment for .NET Core applications and create a MVC website with Entity Framework Core and NLog.

> Notice the frameworks and pakcages are moving very fast and the ones of mine may differ from yours. 


## Environment

* Visual Studio 2015 Update 3
* Visual Studio 2015 DotNetCore tools – preview 2
* DotNetCore 1.0.0 Runtime


## Downloads

#### Update Visual Studio
> [Visual Studio downloads](https://www.visualstudio.com/downloads/)

#### Install .NET Core SDK
> Find it on [Microsoft .NET Framework Downloads](https://www.microsoft.com/net/download).

#### Install VS2015 DotNetCore tools – preview 2
> Download it [here](https://go.microsoft.com/fwlink/?LinkId=817245).


## Walk thru

### Create ASP.NET Core website project
![](https://1.bp.blogspot.com/-LI-iqRBLcIY/V4-i3qbs5GI/AAAAAAAADvY/GSf7gUmHJbYkgRhomMrFGJ_z23sf9OpwACLcB/s1600/image001.png)

![](https://3.bp.blogspot.com/-x0bMk4pB86A/V4-i3hFqX5I/AAAAAAAADvc/yeE3XsuYFuwvlwVZnA3GQwJuIZCvj-C2wCLcB/s1600/image002.png)

* appsettings.json
Most settings in WebConfig was moved to this file. We will later add connctionString into appsettings.json.

* bundleconfig.json
We can use [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)/ or [Bundler & Minifier](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.BundlerMinifier).

* project.json
project.json is the file which is for managing the packages and dependencies.
We can still use NUGET to install the package, or just editing the project.json and use `dotnet restore` to restore or remove the packages for us.


### NLog
> Install [NLog.Extensions.Logging](https://www.nuget.org/packages/NLog.Extensions.Logging)
> Reference : [NLog/NLog.Extensions.Logging](https://github.com/NLog/NLog.Extensions.Logging)

#### Injection
Then inject the NLog provider into loggerFactory in **Startup.cs : Configure**
```
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
{
    //add NLog to ASP.NET Core
    loggerFactory.AddNLog();
    //Configure nlog.config in your project root
    env.ConfigureNLog("NLog.config");
}
```

PS. Don’t forget to set [NLog.config](https://www.nuget.org/packages/NLog.Config/)!

#### Usage
```
public class StoreController : Controller
{
    protected static Logger _logger = LogManager.GetCurrentClassLogger();
    public IActionResult Index()
    {
        _logger.Debug($"Debug message from current logger!");
        _logger.Error($"Error message from current logger!");
    }
}
```


### Entity Framework Core (to Sql server)

> Package : [Microsoft.EntityFrameworkCore.SqlServer](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.SqlServer/)


#### ConnectionString
![](https://4.bp.blogspot.com/-t2fu-_u6zFs/V4-i4IOV0-I/AAAAAAAADvk/tSdJ1P2OIw0oz-RoB7f47CIric2RkxCjgCLcB/s1600/image005.png)


#### Create DbContext and DAO
* DbContext
```
public class DefaultDbContext : DbContext
{
    public DefaultDbContext(DbContextOptions options) : base(options) 
    {}
    public DbSet<Store> Stores { get; set; }
}
```

* DAO
```
[Table("Stores")]
public class Store
{
    [Key]
    public int Id { get; set; }
    [StringLength(200)]
    [Required]
    public string Name { get; set; }
    [StringLength(500)]
    public string Description { get; set; }
}
```


#### Injection
In this step, we will create DbContext and inject it to IServiceCollection.
In **Startup.cs : ConfigureServices**, add the following code.
```
public void ConfigureServices(IServiceCollection services)
{
   // Add Entity Framework
   services.AddDbContext<DefaultDbContext>(
                options => options.UseSqlServer(
                    Configuration["Data:DefaultConnection:ConnectionString"]));
}
```


#### Usage
Since we inject the EntityFrameworkCore.SqlServer provider, we can use the DbContext like this,
```
public class StoreController : Controller
{
    private DefaultDbContext _dbContext = null;
    public StoreController(DefaultDbContext dbContext)
    {
            this._dbContext = dbContext;
            //Do something with this._dbContext ... 
    }
}
```


## Implement a Hello world

Okay, we have logger and ORM now. It’s time to implement a simple web page!


#### View
* index.cshtml
```
@model  IEnumerable<JB.Sample.AspNetCore.DAL.Store>
<table class="list">
    <thead>
        <tr>
            <th>@Html.DisplayNameFor(model => Model.First().Id)</th>
            <th>@Html.DisplayNameFor(model => Model.First().Name)</th>
            <th>@Html.DisplayNameFor(model => Model.First().Description)</th>
        </tr>
    </thead>

    <tbody>
        @if (Model != null)
        {
            foreach (var item in Model)
            {
                <tr>
                    <td>@Html.DisplayFor(model => item.Id)</td>
                    <td>@Html.DisplayFor(model => item.Name)</td>
                    <td>@Html.DisplayFor(model => item.Description)</td>
                </tr>
            }
        }
    </tbody>
</table>
```


#### Controller
* StoreController.cs
```
public IActionResult Index()
{
    using (var storeService = new StoreService(DbContextFactory.Create()))
    {
        var stores = storeService.GetAll();
        return View(stores);
    }
}
```

* StoreService.cs
```
public class StoreService : IDisposable
{
        private DefaultDbContext _dbContext = null;
        public StoreService(DefaultDbContext dbContext)
        {
            if(dbContext!=null)
            {
                this._dbContext = dbContext;
            }
        }

        public IEnumerable<Store> GetAll()
        {
            return this._dbContext.Stores;
        }
}
```


#### Result

![](https://4.bp.blogspot.com/-nf9y_LaH3OM/V4-i4N3FZbI/AAAAAAAADvo/YMawRwR_CO0FtQH7Ayy1KuyxE2xRvDx7QCLcB/s1600/image006.png)


## Tag Helpers

There is another new feature of ASP.NET Core MVC 6 – Tag Helpers.
Tag Helpers ain’t created to replace Html Helpers, but enhance them.

For more details, take a look at
[Tag Helpers in ASP.NET MVC 6 - An Overview](https://www.exceptionnotfound.net/tag-helpers-in-asp-net-core-1-0-an-overview/)
[Cleaner Forms using Tag Helpers in ASP.NET Core MVC](http://www.davepaquette.com/archive/2015/05/11/cleaner-forms-using-tag-helpers-in-mvc6.aspx)



### Reference

1. [Microsoft ASP.NET Core Documentation](https://docs.asp.net/en/latest/)
2. [Microsoft Entity Framework Core document](https://docs.efproject.net/en/latest/index.html)
3. [GitHub : aspnet/Docs](https://github.com/aspnet/Docs/tree/master/aspnet)






