## Introduction

[Swagger](http://swagger.io/) is a powerful open source framework that helps you design, build, document  the RESTful APIs. We are going to install Swagger into our web api and create the api document.

## Environment

* Visual Studio 2015 Update 3	
* dotnet 1.0.0-preview2-003131
* Swashbuckle.SwaggerGen 6.0.0-beta
* Swashbuckle.SwaggerUi 6.0.0-beta

## Walk thru

#### Install packages

* [Swashbuckle.SwaggerGen](https://www.nuget.org/packages/Swashbuckle.SwaggerGen/6.0.0-beta902) (6.0.0-beta902)
* [Swashbuckle.SwaggerUi](https://www.nuget.org/packages/Swashbuckle.SwaggerUi/6.0.0-beta902) (6.0.0-beta902)

#### Enable XML document output

![](https://3.bp.blogspot.com/-DjMdWn6h03U/WFV0Unn8bkI/AAAAAAAAEAg/0U6PhjDFnXU0jMs5M6E1vr8kFpBC8itMQCLcB/s1600/image001.png)


#### Configuration

Let’s set the XML documentation path and API document information for `Swagger`.

* Startup.cs
```
public void ConfigureServices(IServiceCollection services)
{
        #region MVC
        //...
        #endregion
        #region CORS
        //...
        #endregion

        #region Swagger
        var basePath = PlatformServices.Default.Application.ApplicationBasePath;
        var xmlPath = Path.Combine(basePath, "Angular2.Mvc.Webapi.xml");
        services.AddSwaggerGen();
        services.ConfigureSwaggerGen(options =>
         {
                options.SingleApiVersion(new Swashbuckle.Swagger.Model.Info
                {
                    Version = "v1",
                    Title = "Angular2.Mvc WebApi",
                    Description = "Angular2.Mvc WebApi samples",
                    TermsOfService = "None"
                });
                options.IncludeXmlComments(xmlPath);
                options.DescribeAllEnumsAsStrings();
          });

        #endregion
}
```

#### Run Web api and navigate Swagger UI

Run the Web api application and navigate the URL :
`http://localhost:XXXX/swagger/ui/index.html`

![](https://1.bp.blogspot.com/-PS7rts7nVVc/WFV0UbW9foI/AAAAAAAAEAY/iqKCYSrPTr48Z31RP5ycKHhdV8wDH00WgCLcB/s1600/image002.jpg)


Okay, now we get the api document, let’s try use the Swagger Editor to modify the document.
**Copy the url on the top of the document** and browse it, you will get a JSON on the browser.

![](https://3.bp.blogspot.com/-JnokG2cgV3o/WFV0UX8vd8I/AAAAAAAAEAc/NST-w95k4E0bH8JYYxNk5Gu9U0WxaHgnwCLcB/s1600/image003.jpg)

Copy the JSON. 

![](https://2.bp.blogspot.com/-H7fXFPxfiAk/WFV0VEc-EcI/AAAAAAAAEAo/TKoTPouQw40qXpbQ_ZX6RrknxCT3bhFqwCLcB/s1600/image004.png)

Go to [Swagger Editor](http://editor.swagger.io/) and import the JSON as file or just paste it.

![](https://1.bp.blogspot.com/-fYxYlrz3i4Y/WFV0U0aRYrI/AAAAAAAAEAk/GVGSvSoR-AYqUG3WzB2aJshQbZnPXptlgCLcB/s1600/image005.png)

![](https://4.bp.blogspot.com/-BuSB0tfTQN8/WFV0VQoxldI/AAAAAAAAEAs/oRXrF6ryCIY8QL6H8fPvtHxTs_hRQEJsQCLcB/s1600/image006.png)


Okay we put our api document on the [Swagger Editor](http://editor.swagger.io/), now we can edit the document!
For example, we add the host url for testing the APIs.

```
host: 'localhost:xxxx'
```

> If you encounter the problem of COR from Swagger Editor.
> Just add the CORS support for Swagger Editor.

```
    services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin",
           builder =>
           builder.WithOrigins("http://localhost:4240", "http://editor.swagger.io") 
                 .WithMethods("HEAD", "GET", "POST", "PUT", "DELETE") //Or AllowAnyMethod()
         );
    });
```

![](https://2.bp.blogspot.com/-MsQ0r8zdVz4/WFV0VSIbpII/AAAAAAAAEAw/j-o_kCBTPyE1tUBW53ck0yhnw30m5z4DACLcB/s1600/image007.jpg)


### Produces Different Response Type

Swagger also support the different response type on the document.
Here is a sample, the Web api method returns `DtoError` object when there is an `InternalServer error(500)`. 

All we have to do the add this line: 
`[ProducesResponseType(typeof(DtoError), 500)] `

* ApiController

```
    [HttpGet("GetAll")]
    [ProducesResponseType(typeof(DtoError), 500)] 
    public IQueryable<DtoCustomer> GetAll()
    {
       try
       {}
       catch (Exception ex)
       {
                var err = new DtoError
                {
                    StatusCode = 500,
                    ServerError = ex.Message,
                    ClientMsg = "Please try again..."
                };

                var errJson = JsonConvert.SerializeObject(err);
                byte[] data = System.Text.Encoding.UTF8.GetBytes(errJson);
                Response.ContentType = "application/json";
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                Response.Body.WriteAsync(data, 0, data.Length);
                throw;
      }

    }
```

And the API document will be updated like this.

![](https://2.bp.blogspot.com/-KjLvZtiQJ2k/WFV0VfPMEGI/AAAAAAAAEA0/BjUgdiBHZVg_qTu66VgqArFKeUCrymrTgCLcB/s1600/image008.png)


### Generate Client 

Here is another powerful function of [Swagger Editor](http://editor.swagger.io/). You can choose to generate the document as HTML, codes… etc, as the reference.

![](https://4.bp.blogspot.com/-0lkDZhBxFVk/WFV0V53kOSI/AAAAAAAAEA4/KlgNGCpYjKcJsPBVxmBtG4eae34P15V-QCLcB/s1600/image009.jpg)



## Reference

1. [ASP.NET CORE 1.0 MVC API DOCUMENTATION USING SWASHBUCKLE SWAGGER](https://damienbod.com/2015/12/13/asp-net-5-mvc-6-api-documentation-using-swagger/)
2. [Swagger](http://swagger.io/)

