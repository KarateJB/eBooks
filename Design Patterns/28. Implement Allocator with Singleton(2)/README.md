# 使用單例模式實做線性分配器(2/2)

延續[Day28.使用單例模式實做線性分配器(1/2)](https://ithelp.ithome.com.tw/articles/10197383)的需求，
我們接下來要開始實作取號的方法。



## Sample Codes

- [Source code](https://github.com/KarateJB/AspNetCore.LinearAllocator)



### ASP.NET Core - Dependency Injection

由於必須使用單例模式(Singleton)來設計取號這個動作，在ASP.NET Core可以很方便的利用DI機制來建立一個Singleton instance。
方式為在Startup.cs的`ConfigureServices`這個方法裡面注入我們的Singleton服務物件。

例如：

```
public void ConfigureServices(IServiceCollection services)
{
    //...

    services.AddSingleton<IMySingleton>(provider => new MySingleton());
}
```

如此我們可直接在Controller的建構子帶入注入的的服務物件，並開始使用它。

```
[Route("api/[controller]")]
public class MyController : BaseController
{
    private readonly IMySingleton _mySingleton = null;

    public MyController(IMySingleton mySingleton)
    {
        this._mySingleton = mySingleton;
    } 
} 
```

另外注入的類型分為：

| <center>Inject as</center> |  <center>Lifetime</center>  |
|:--------------------------:|:----------------------------|
| Transient                  | New instance is provided to every controller and every service. |
| Scoped                     | Service are created once per request. |
| Singleton                  | Single instance throughout the application, lazy singleton. |
| Singleton Instance         | Create instance when registered, eager singleton. |

可以參考我的這篇文章：[[ASP.NET Core] Dependency Injection service lifetime](http://karatejb.blogspot.tw/2017/06/aspnet-core-dependency-injection.html)






實際利用Postman建立一個分配器：

![](https://1.bp.blogspot.com/-wGUS9ymfP6U/Wl3eIQ2qAEI/AAAAAAAAFtE/XIdyI8kqUqsS692n69y1qZEN1OnedtBDQCLcBGAs/s1600/allocator_create.png)



取號的部分我們明天再來實作。


## Reference
- [[ASP.NET Core] Dependency Injection service lifetime](http://karatejb.blogspot.tw/2017/06/aspnet-core-dependency-injection.html)
