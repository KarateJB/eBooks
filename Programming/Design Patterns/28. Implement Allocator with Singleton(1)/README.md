# 使用單例模式實做線性分配器(1/2)

[線性分配器(Linear Block Allocator)](http://literatejava.com/hibernate/linear-block-allocator-a-superior-alternative-to-hilo/)與[高低位分配器(Hi/Lo allocator)](https://vladmihalcea.com/the-hilo-algorithm/)皆是在不需要頻繁與後端連線的情況下取得一組Unique number。

作法為在後端(此例指資料庫)先指定一個範圍值給 Hi，例如1001 - 1999 ，然後在應用程式設定一個Singleton物件並記錄這個範圍值，每次取號時就從這個範圍逐一取一個號碼出來，也就是lo。 當這個範圍取完之後，再向後端要一個新的範圍來用。

使用的情景為，當我們的AP需要快速回應，並且夾帶一個唯一的序號時，那麼就可以透過Allocator很快的取得一組已經分配好的序號。

> 線性分配器所分配的範圍會連號，但是Hi-Lo則不會。本文章將採用線性分配器來實作。



## Scenario

在一個線上過卡交易的系統中，系統在傳送實際交易前，會送兩次認證的請求(Http Request)，Server必須分別回應包含唯一序號的認證成功訊息。
但我們不希望這兩次認證請求拖慢整體交易時間，因此採用線性分配器來降低取得序號的時間。

以循序圖表示：

![](https://4.bp.blogspot.com/-lAWr14z8xww/Wl7J43oALrI/AAAAAAAAFtU/BWzFNoTTF-sWWLMtqpZD9GEVcsVKHcDpgCLcBGAs/s1600/LinearSeq.png)

## Why use Singleton pattern?

這是個標準取號的Singleton需求；另外我們也可以透過ASP.NET Core強大的DI機制來注入並使用Singleton物件。


## Sample Codes

- [Source code](https://github.com/KarateJB/AspNetCore.LinearAllocator)

這個範例程式碼需要使用到Sql Server資料庫，請先查看[README](https://github.com/KarateJB/AspNetCore.LinearAllocator)的步驟。


我們將利用ASP.NET Core Web API實作以下功能：
1. 建立分配器
2. 取號


### Models 


#### Data Access Object

* \Allocator.DAL\Models\HiLo.cs
```
[Table("HiLos")]
public class HiLo
{
    [Key]
    [StringLength(200)]
    public string Key { get; set; }

    [Required]
    [Column(TypeName="bigint")]
    public Int64 NextHi { get; set; }

    [Required]
    [Column(TypeName="bigint")]
    public Int64 MaxValue { get; set; }
}
```

* Key: 分配器名稱
* NextHi: 在此分配的範圍的第一個值 (lo的起始值)
* MaxValue: 分配的範圍的最大值


#### Data Transfer Object

另外我們建立一個前端取號的DTO：

* \Allocator.Domain\Models\Sequence.cs
```
public class Sequence
{
    public string Key { get; set; }
    public long Value { get; set; }
}
```

### 分配器管理者

這個Facade類別主要負責提供介面來建立一個新的取號器，以及取得下一個號碼。
但我們先實作建立取號器的方法：`CreateHiLoInstance(HiLo hl, out bool isKeyExist)`

* \Allocator.Service\AllocatorManager.cs
```
public class AllocatorManager : IDisposable
{
    private DbContextFactory _dbFactory = null;

    public AllocatorManager(DbContextFactory dbFactory)
    {
        this._dbFactory = dbFactory;
    }
    
    ///建立一個新的取號器
    public void CreateHiLoInstance(HiLo hl, out bool isKeyExist)
    {
        isKeyExist = false;

        using (var hlService = new HiLoService<HiLo>(this._dbFactory.CreateDbContext()))
        {
            isKeyExist = hlService.GetAll().Any(x => x.Key.Equals(hl.Key));
            if (!isKeyExist)
            {
                hlService.Add(hl);
            }
            else
            {
                isKeyExist = true;
            }
        }
    }
    
    /// 取得下一個號碼
    public Domain.Models.Sequence GetNextVal(string key)
    {
        throw new NotImplementException();
    }
}
```

另外程式中在DAL(Data Access Layer)使用了Unit Of Work pattern，所以會有利用
`var hlService = new HiLoService<HiLo>(this._dbFactory.CreateDbContext())`
來新增資料的寫法。

UOW Pattern可以參考[Tom Dykstra](https://github.com/tdykstra)的文章：[Implementing the Repository and Unit of Work Patterns in an ASP.NET MVC Application](https://docs.microsoft.com/en-us/aspnet/mvc/overview/older-versions/getting-started-with-ef-5-using-mvc-4/implementing-the-repository-and-unit-of-work-patterns-in-an-asp-net-mvc-application)



### API Controller


* \Allocator.WebApi\Controllers\AllocatorController.cs
```
[Route("Create")]
[HttpPost]
public async Task<HttpResponseMessage> Create([FromBody]HiLo hilo)
{
    if (hilo == null)
    {
        return new HttpResponseMessage(HttpStatusCode.BadRequest);
    }
    else
    {
        using(var dbFactory = new DbContextFactory(this._env.EnvironmentName))
        using(var allocatorMng = new AllocatorManager(dbFactory))
        {
            bool isKeyExist = false;
            allocatorMng.CreateHiLoInstance(hilo, out isKeyExist);
        }
        return new HttpResponseMessage(HttpStatusCode.Created);
    }
}
```


實際利用Postman建立一個分配器：

![](https://1.bp.blogspot.com/-wGUS9ymfP6U/Wl3eIQ2qAEI/AAAAAAAAFtE/XIdyI8kqUqsS692n69y1qZEN1OnedtBDQCLcBGAs/s1600/allocator_create.png)



取號的部分我們明天再來實作。


## Reference
- [Linear block allocator - a superior alternative to hilo](http://literatejava.com/hibernate/linear-block-allocator-a-superior-alternative-to-hilo/)
- [The hilo algorithm](https://vladmihalcea.com/the-hilo-algorithm/)
