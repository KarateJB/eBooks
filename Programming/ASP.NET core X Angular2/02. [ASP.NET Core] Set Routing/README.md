## Introduction

In this article, we will know how to 
* Set an Areas routing rule (template)
* Use Route attribute in MVC
* Use Route attribute in WebApi

## Environment

* Visual Studio 2015 Update 3
* Visual Studio 2015 DotNetCore tools – preview 2
* DotNetCore 1.0.0 Runtime

## Implement

#### Set an Areas routing rule (template)

We can find the default route template in Startup.cs : Configure
Add the following red codes to support Area routing ruls.

```
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
{
    //…Skip
    app.UseMvc(routes =>
    {
       routes.MapRoute(
              name:"areaRoute", 
              template:"{area:exists}/{controller=Home}/{action=Index}/{id?}");

       routes.MapRoute(
              name: "default",
              template: "{controller=Home}/{action=Index}/{id?}");
     });
}
```
#### Enable Areas routing in MVC:Controller

Now create Areas, for example,

![](https://3.bp.blogspot.com/-EuX9u61BI_0/V5ihdRwobGI/AAAAAAAADxo/cEH7gZ7qzWczq3yHPl5v4FuFPeJZ1x9ugCLcB/s1600/image001.png)

To enable Areas routing, use `Area` and `Route` attributes like this,
```
[Area("User")]
[Route("User/[controller]")]
public class AuthController : Controller
{
       [Route("[action]")]
        public IActionResult Index()
        {
            ViewBag.Title = "Index";
            return View();
        }

        [Route("[action]")]
        public IActionResult Create()
        {
            ViewBag.Title = "Create";

            return View();
        }

        //[Route("[action]/{page}")] //It's ok to write like this
        [Route("[action]/{page:int?}")]
        public IActionResult Edit(int? page)
        {
            ViewBag.Title = "Edit";
            ViewBag.Page = page;

            return View();
        }

        [Route("[action]/{data}")]
        public IActionResult Edit(String data)
        {
            ViewBag.Title = "Edit";
            ViewBag.Page = data;

            return View();
        }

}

```

#### Enable Areas routing in WebApi:Controller

There is no need to add routing template in WebApi Startup.cs
Just put `Route` attribute to assign the routing rules for WebApi’s controllers and actions (Restful methods).

![](https://2.bp.blogspot.com/-5JJe4dnB-Uc/V5ihdaRTrAI/AAAAAAAADxs/XvfVCs2qX-AxuKb5SUsQOJgdjafpW2dHgCLcB/s1600/image002.png)

```
[Route("api/User/[controller]")]
public class AuthController : Controller
{
        [HttpGet("GetAll")]
        public IEnumerable<string> Get()
        {
            return new string[] { "auth1", "auth2" };
        }

        [HttpGet("Get/{id}")]
        public string Get(int id)
        {
            return id.ToString();
        }

        // POST api/values
        [HttpPost]
        public void Post(DtoModel model)
        {
        }

        // DELETE api/values/5
        [HttpDelete("Delete/{id}")]
        public void Delete(int id)
        {
        }
}
```

Note that you can add an action name in Http Method attribute like the following to define the action name for the action 

```
[HttpGet("GetAll")]
public IEnumerable<string> Get()
```

And the HttpGet url will be 
`http://localhost:14125/api/user/auth/getall`

Results in Postman:

![](https://2.bp.blogspot.com/-XuiHxSC8lLQ/V5ihdWB8tEI/AAAAAAAADxk/fhZyrYAihaswMkyBVpAUyekn5mMfy84PACLcB/s1600/image003.png)

![](https://1.bp.blogspot.com/-ERqaDxYDWak/V5ihd-dN59I/AAAAAAAADxw/IHtv3SvHLrczXzi-ztEP2x-AhwkaogCLcB/s1600/image004.png)

![](https://2.bp.blogspot.com/-xlpeh201Dw8/V5ihd-AO8oI/AAAAAAAADx0/8oGBV8XVgZo9WiAyTP8u4NiboPcw8nG1wCLcB/s1600/image005.png)


### Reference
1. [Microsoft ASP.NET Core Documentation](https://docs.microsoft.com/en-us/aspnet/core/)