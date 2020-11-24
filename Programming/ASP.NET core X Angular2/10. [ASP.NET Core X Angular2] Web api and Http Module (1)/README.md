## Introduction

In [Day 6 - Routing](http://ithelp.ithome.com.tw/articles/10186741), we mocked the customer data in the frontend but not the database. We will use Angular2 Http module and ASP.NET core – web api to fulfill the CRUD functions with data stored in database (in this example, it's sql server).
This article will separated into two parts:
1. ASP.NET Core - Web Api
2. Angular2 - Http Module


## Environment

* Visual Studio 2015 Update 3
* Sql Server 2012 R2
* NPM: 3.10.3                                    
* Microsoft.AspNetCore.Mvc 1.0.0
* angular 2: 2.1.0


## WEB API

Create an ASP.NET core Web application as Web api. What we will do before implementing the CRUD functions in frontend:

1.  Enable NLog logging
2.  Enable CORS
3.  Set global json options
4.  Support Entity framework core
5.  Create CRUD api in web api

#### Install packages

1. [NLog.Extensions.Logging](https://www.nuget.org/packages/NLog.Extensions.Logging/1.0.0-rtm-alpha4)
2. [Microsoft.Extensions.Logging.Filter](https://www.nuget.org/packages/Microsoft.Extensions.Logging.Filter/1.1.0-preview1-final)
3. [Microsoft.AspNetCore.Cors](https://www.nuget.org/packages/Microsoft.AspNetCore.Cors/1.1.0-preview1-final)
4. [Newtonsoft.Json](https://www.nuget.org/packages/Newtonsoft.Json/9.0.1)
5. [System.Data.SqlClient](https://www.nuget.org/packages/System.Data.SqlClient/4.3.0-preview1-24530-04)
6. [Microsoft.EntityFrameworkCore.SqlServer](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.SqlServer/1.0.1)

#### NLog logging

Please refer to this article: [Day 9 - NLog and jsnlog](http://ithelp.ithome.com.tw/articles/10187213)

#### CORS

Required package : [Microsoft.AspNetCore.Cors](https://www.nuget.org/packages/Microsoft.AspNetCore.Cors/1.1.0-preview1-final)

We will enable the global CORS settings in `Startup.cs`.
For more detail settings, visit here - [Enabling Cross-Origin Requests (CORS)](https://docs.asp.net/en/latest/security/cors.html)

* Startup.cs

```
public void ConfigureServices(IServiceCollection services)
{
   //Step1. Enable CORS
    services.AddCors(options =>
    {
                options.AddPolicy("AllowSpecificOrigin",
                    builder =>
                    builder.WithOrigins("http://localhost:4240") //Or AllowAnyOrigin()
                    .WithMethods("GET", "POST", "PUT", "DELETE") //Or AllowAnyMethod()
                    );
     });

     //Step2. Enable CORS for every MVC actions
     services.Configure<MvcOptions>(options =>
     {
                options.Filters.Add(new CorsAuthorizationFilterFactory("AllowSpecificOrigin"));
     });
}

public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
{
     //…
    app.UseCors("AllowSpecificOrigin");
}
```

If you don’t want to enable a policy on every web api action (http method), ignore step 2. And specify the CORS policy on an action with `[EnableCors]` attribute like this.

```
[EnableCors("AllowSpecificOrigin")]
public async Task<HttpResponseMessage> Create([FromBody]Customer cust)
{}
```

Or use `[DisableCors]` for security issue.


#### Set global json options

Web api will default return the `json` object with **lower-Camel-case property names**, even if the properties are in Pascal case.

> See [asp.net core 1.0 web api use camelcase](http://stackoverflow.com/questions/38139607/asp-net-core-1-0-web-api-use-camelcase)

For example, my class’s properties are Pascal case,

```
public class Customer
{
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public int Age { get; set; }
        public string Description { get; set; }
}
```

But web api returns lower Camel case. 

![](https://3.bp.blogspot.com/-kaMP_AicQV4/WBi4pYpL1LI/AAAAAAAAD9c/1LPmbqsDn5Q6ENyYBBzaiT3NIt-wjpIBQCLcB/s1600/image001.png)

So we add the following configuration to solve this issue.

* Startup.cs

```
public void ConfigureServices(IServiceCollection services)
{
            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
                options.SerializerSettings.Formatting = Formatting.None; //or Formatting.Indented for readability;
            });
           
            //…
}
```

See the updated result.

![](https://4.bp.blogspot.com/-BDkiO2BzX5U/WBi4pr-SIhI/AAAAAAAAD9g/EvhHP8FQ_Y8WFArpnHEw2CnHHjw4uvHQQCLcB/s1600/image002.png)


#### Support Entity framework core

Required : [Microsoft.EntityFrameworkCore.SqlServer](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.SqlServer/1.0.1)

> Also have a look at these related articles.
> 1. [Day 1 - Build MVC website with Entity Framework Core](http://ithelp.ithome.com.tw/articles/10184575)
> 2. [Day 3 - EF CLI migrations](http://ithelp.ithome.com.tw/articles/10186263)

* DAO

```
public class Customer
{
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [StringLength(100)]
        [Required]
        public string Name { get; set; }
        [StringLength(100)]
        public string Phone { get; set; }
        public int Age { get; set; }
        [StringLength(200)]
        public string  Description { get; set; }
}
```

* DbContext

```
public class NgDbContext : DbContext
{
        public NgDbContext(DbContextOptions options) : base(options)
        {}
        public DbSet<Customer> Customers { get; set; }
}
```

* DAO CRUD methods in CustomerService

```
public class CustomerService:IDisposable
    {
        private NgDbContext _dbContext = null;

        public CustomerService(NgDbContext dbContext)
        { 
                this._dbContext = dbContext;
        }

        public IQueryable<Customer> GetAll()
        {
            return this._dbContext.Customers;
        }

        public IQueryable<Customer> Get(Expression<Func<Customer, bool>> filter)
        {
            return this._dbContext.Customers.Where(filter);
        }

        public void Add(Customer entity)
        {
            this._dbContext.Customers.Add(entity);
            this._dbContext.SaveChanges();
        }

        public void Update(Customer entity)
        {
             this._dbContext.SaveChanges();
        }

        public void Remove(Customer entity)
        {
            this._dbContext.Customers.Remove(entity);
            this._dbContext.SaveChanges();
        }
}
```

Okay, everything is done. We are going to implement the CRUD http methods in `web api`.

#### Create CRUD api in web api

Okay, the following is a normal web api controller.
Notice in ASP.NET core MVC model binding, we MUST specify the binding source, like `[FromBody]`, `[FromHeader]` , `[FromForm]`, `[FromQuery]` , `[FromRoute]`.

```
[Route("api/Basic/[controller]")]
public class CustomerController : BaseController
{
        [HttpGet("GetAll")]
        public IQueryable<Customer> GetAll()
        {
            throw new NotImplementedException();
        }

        [HttpGet("Get/{id}")]
        public Customer Get(int id)
        {
           throw new NotImplementedException();
        }
       
        [HttpPost("Create")]
        public async Task<HttpResponseMessage> Create([FromBody]Customer cust)
        {
            throw new NotImplementedException();
        }

        [HttpPut("Update")]
        [CustomExceptionFilter]
        public async Task<HttpResponseMessage> Update([FromBody]Customer cust)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("Remove/{id}")]
        [CustomExceptionFilter]
        public async Task<HttpResponseMessage> Remove(int id)
        {
            throw new NotImplementedException();
        }
}
```

Thaz all for Web Api, we will write the front-end in the next day.


## Reference

1. [asp.net core 1.0 web api use camelcase](http://stackoverflow.com/questions/38139607/asp-net-core-1-0-web-api-use-camelcase)
