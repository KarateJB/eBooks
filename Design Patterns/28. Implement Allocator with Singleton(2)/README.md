# 使用單例模式實做線性分配器(2/2)

延續[Day28.使用單例模式實做線性分配器(1/2)](https://ithelp.ithome.com.tw/articles/10197383)的需求，
我們接下來要開始實作取號的方法。



## Sample Codes

- [Source code](https://github.com/KarateJB/AspNetCore.LinearAllocator)

<br><br>

## ASP.NET Core - Dependency Injection

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




<br><br>
### 實作取號的Singleton類別

有了以上DI的基礎後，我們開始來實作取號的單例類別。

* \Allocator.Service\AllocatorGetValProvider.cs
```
public interface IAllocatorGetValProvider
{
    /// <summary>
    /// 取號
    /// </summary>
    /// <returns></returns>
    long GetNextVal(String key);
}

public sealed class AllocatorGetValProvider : IAllocatorGetValProvider
{
    private DbContextFactory _dbFactory = null;
    private string _key = String.Empty; //紀錄Key Name
    private Int64 _minHiVal = 0;
    private Int64 _maxHiVal = 0;

    private static Int64 INTERVAL = 10; //minHi~maxHi
    private static object block = new object();

    public AllocatorGetValProvider(DbContextFactory dbFactory)
    {
        if (dbFactory != null)
            this._dbFactory = dbFactory;
    }


    /// <summary>
    /// 取號
    /// </summary>
    /// <returns></returns>
    public Int64 GetNextVal(String key)
    {
        lock (block)
        {
            if (!key.Equals(this._key))
            {
                //當Singleton被重新建立時(例如AP重啟)，強制跳號
                this.setMinMaxHi(key: key, isForceReset: true);
                this._key = key;
            }
            else
            {
                if (this._minHiVal < this._maxHiVal)
                {
                    this._minHiVal++;
                }
                else
                {
                    this.setMinMaxHi(key: key, isForceReset: true);
                }
            }

            return this._minHiVal;
        }
    }
    /// <summary>
    /// 取得NEXT HI
    /// </summary>
    private void setMinMaxHi(string key, bool isForceReset=false)
    {
        try
        {
            //設定 TransactionScope的 Option
            TransactionOptions transOptions = new TransactionOptions()
            {
                IsolationLevel = System.Transactions.IsolationLevel.Serializable,
                Timeout = new TimeSpan(0, 0, 1) //timeout : 1 min
            };

            using (var dbContext = this._dbFactory.CreateDbContext())
            using (var dbContextTransaction = dbContext.Database.BeginTransaction())
            using (var hlService = new HiLoService<DAL.Models.HiLo>(dbContext))
            {
                Int64 dbNextHi = 0;
                Int64 dbMaxVal = 0;

                #region Get current HiLo from database
                var hilo = hlService.Get(x => x.Key.Equals(key)).FirstOrDefault();
                if (hilo != null)
                {
                    dbNextHi = hilo.NextHi;
                    dbMaxVal = hilo.MaxValue;
                }
                else
                {
                    throw new Exception("The key is not exist in HiLo master table!");
                }
                #endregion

                #region 設定Singleton可用的minHi/maxHi value
                //this.setMinMaxHiValStrategy(dbNextHi, dbMaxVal);
                if (isForceReset || (this._minHiVal + 1) > dbMaxVal)
                {
                    //重新設定新Range
                    this._minHiVal = dbNextHi + INTERVAL;
                    this._maxHiVal = dbMaxVal + INTERVAL;

                    hilo.NextHi = this._minHiVal;
                    hilo.MaxValue = this._maxHiVal;
                    hlService.Update(hilo);
                }
                else
                {
                    this._maxHiVal = dbMaxVal;
                }
                #endregion

                dbContextTransaction.Commit();
            }
        }
        catch (Exception)
        {
            throw;
        }
    }
}
```

以上的程式碼重點在於：
1. `INTERVAL`: 決定每次分配號碼範圍的大小，例如設定INTERVAL=10，表示每次只會分配10個號碼。
2. 當提供的號碼(Lo)將超出分配的範圍時，重設Singleton的`_minHiVal`和`_maxHiVal`並更新回資料庫。
3. 當**重啟應用程式**或者**Client查詢另一組分派器**時，Singleton的`_minHiVal`和`_maxHiVal`將不具有參考價值，而必須回到資料庫取得新的分配範圍。
   > 例如：當INTERVAL100且已分配101-200，目前已取號到135，但是在AP重啟(等於Singleton物件被重新建立)及資料庫不記錄已用到哪一個號碼情況下，將直接重新分配201-300。 所以AP重啟後，Client拿到的第一個號碼是201。
4. 必須LOCK取號的動作，避免重複取得相同的號碼:



### 注入Singleton物件

* \Allocator.WebApi\Startup.cs
```
public void ConfigureServices(IServiceCollection services)
{
    #region Singleton HiLo-GetValue Provider
    var dbFactory = new DbContextFactory(CurrentEnvironment.EnvironmentName);
    services.AddSingleton<IAllocatorGetValProvider>(provider => new AllocatorGetValProvider(dbFactory));
    #endregion
}
```

接著我們可以在API Controller使用這個注入的Singleton物件，並將之作為參數丟給分配器管理者`AllocatorManager`的`GetNextVal`方法 (這邊使用了策略模式!)。

* \Allocator.WebApi\AllocatorController.cs
```
[Route("api/[controller]")]
public class AllocatorController : BaseController
{
    private readonly IHostingEnvironment _env = null;
    private readonly IAllocatorGetValProvider getValProvider = null;

    public AllocatorController(IHostingEnvironment env, IAllocatorGetValProvider getVal)
    {
        this._env = env;
        this.getValProvider = getVal;
    }  
    
    // GET api/hilo/keyName
    [Route("GetNext/{key}")]
    public async Task<Sequence> GetNext(String key)
    {
        if (String.IsNullOrEmpty(key))
        {
            throw new HttpRequestException("The key should not be NULL!");
        }
        else
        {
            using(var dbFactory = new DbContextFactory(this._env.EnvironmentName))
            using(var allocatorMng = new AllocatorManager(dbFactory))
            {
                var seq = allocatorMng.GetNextVal(key, this.getValProvider);
                return seq;
            }
        }
    }
}
```

最後我們更新分配器管理者`AllocatorManager`的`GetNextVal`方法如下：

* \Allocator.Service\AllocatorManager.cs
```
public class AllocatorManager : IDisposable
{
    private DbContextFactory _dbFactory = null;

    public AllocatorManager(DbContextFactory dbFactory)
    {
        this._dbFactory = dbFactory;
    }

    /// Create new HiLo instance in database
    //Skip CreateHiLoInstance method here...

    /// 取得Next value
    public Domain.Models.Sequence GetNextVal(string key, IAllocatorGetValProvider getValProvider)
    {
        var seq = new Domain.Models.Sequence()
        {
            Key = key,
            Value = getValProvider.GetNextVal(key)
        };
        return seq;
    }
}
```

### 測試取號

請確定如[Day28](https://ithelp.ithome.com.tw/articles/10197383)文末的方式建立一組Key分別為"TMS","HR"的分配器。(下圖為資料表HiLos的Snapshot)

![](https://2.bp.blogspot.com/-TidOBdrKN00/Wl7je_lshKI/AAAAAAAAFts/4L9a9m9fI0M8rUW1YEMueGYiVFh-18vqwCLcBGAs/s1600/LinearSeq_db.png)



我們實際利用Postman來取號：

![](https://2.bp.blogspot.com/-729E205aYW0/Wl7ir75YYQI/AAAAAAAAFtk/YMoclW5VM20HjlV4ODtEyDR_Cgcd39BEgCLcBGAs/s1600/LinearSeq_getnum.png)

> 等等! 為什麼第一個號碼不是**1**呢? <br>
> 原因在上面有提到因為我們是第一次啟動Web API(等於重啟)，所以分配器會分配下一組範圍值給我們。<br>
> 現在再重新查詢資料表的資料，其應被更新為：<br>
> ![](https://1.bp.blogspot.com/-7j9MO8tFNzA/Wl7kjo97CaI/AAAAAAAAFt4/NZhtTzWbAzQQ8tm0_MtffWOxYkItvPlaQCLcBGAs/s1600/LinearSeq_db2.png)

另外可以在Postman將這個Request存到Collection並利用Collection Runner執行多次來觀察取號的情形。

![](https://1.bp.blogspot.com/-5DAz6oKZX_A/Wl7oKjaaCbI/AAAAAAAAFuE/Nb3D3i6TyGAz0LxC7-9Yh5C5-eoycSNVACLcBGAs/s1600/postman.png)

![](https://4.bp.blogspot.com/-QG-aJtZU4P8/Wl7oK2fY0aI/AAAAAAAAFuI/9kGlD8W5CZEK6T95IorSoSUGcT6Cw1m0ACLcBGAs/s1600/postman_collection.png)

如果要測試Concurrent requests推薦使用[SuperBenchmarker](https://github.com/aliostad/SuperBenchmarker)。
我們用以下的指令來測試共1,000個requests，每次併發10個Cocurrent request。
```
sb -u http://localhost:5123/api/HiLo/GetNext/TMS -n 1000 -c 10 -m GET
```

其結果如以下LOG(只擷取最後面幾個Response logs)，可以確認1,000次取號都是沒有重複的。

![](https://1.bp.blogspot.com/-PqRYBfM2vaE/Wl7vK0GpzqI/AAAAAAAAFuY/EhAGS_mugYsyVFFgJlg_SSrq5GZWHdT7wCLcBGAs/s1600/LinearSeq_sb.png)



如果有興趣也可以同時開兩個CMD分別執行下面的sb指令來對不同的分配器作取號，可以觀察到送出request的Key有切換時，原本那一組分配的號碼範圍立即失效，分配器會重新指派下一組。

```
sb -u http://localhost:5123/api/Allocator/GetNext/TMS -n 1000 -c 10 -m GET -l C:\temp\log1.log
sb -u http://localhost:5123/api/Allocator/GetNext/HR -n 1000 -c 10 -m GET -l C:\temp\log2.log
```




## Summary

用了兩天的時間來說明如何利用單例模式(Singleton)來實作線性分配器(Linear Allocator)。
至於高低位分配器(Hi/Lo)差別只在於演算法的不同，實際上只要修改`AllocatorGetValProvider`裡面的邏輯即可。



## Reference
- [[ASP.NET Core] Dependency Injection service lifetime](http://karatejb.blogspot.tw/2017/06/aspnet-core-dependency-injection.html)
