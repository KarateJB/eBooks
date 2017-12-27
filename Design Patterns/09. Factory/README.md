# Factory 工廠模式

## 需求描述

Lily(Team member):
> As a 開發人員
> I want 建立一個Interface來讓開發人員建立各資料庫連線物件
> So that 避免在多個程式碼區塊放入建立資料庫連線的細節，讓高階模組依賴抽象，降低耦合


## 思考設計

JB:<br> 
我們終於排入這個Backlog了，看看這些到處散落的建立資料庫連線的程式碼! 


Hachi:<br>
對，充滿了壞味道([Bad Smell](https://en.wikipedia.org/wiki/Code_smell))，不過重構永遠不嫌晚，我們開始進行吧! 大家都同意使用工廠模式嗎？

JB:<br>
無庸置疑!


## 定義

> 讓工廠類別(Factory Class)去做建立物件的細節，至於使用者只要使用Factory去建立需要的物件，不需要知道物件怎麼建立的，或是細節。


> 通過轉換已經存在類別的接口以適應而不改變它。([WIKI](https://en.wikipedia.org/wiki/Adapter_pattern))<br>

以下將介紹幾種常用的工廠模式：
1. Static factory
2. Abstract factory
3. Generic factory


假設在這個需求，我們有三個不同的Database server需要連線，分別為
* DataMart資料庫
* 歷史資料庫
* 線上資料庫

我們把對應的DB Server name和連線字串存放在`DbContext`類別:

```
public class DbContext
{
    public string Server { get; set; }
    public string ConnectionStr { get; set; }
    public void Connect()
    {
        System.Diagnostics.Trace.WriteLine($"Connect to {this.Server}");
    }
}
```

### Static Factory

Static Factory有兩種使用方式：
1. 藉由參數來選擇要建立哪種連線(例如底下的`Create`方法)
2. 直接呼叫對應的方法(例如底下的`CreateDataMart`/`CreateHistory`/`CreateOnline`方法)

* C#
```
public class StcDbFactory
{
    public static DbContext Create(DbEnum dbEnum)
    {
        switch (dbEnum)
        {
            case DbEnum.DataMart:
                return new DbContext()
                {
                    Server = "DataMart",
                    ConnectionStr = "DataMart connection string"
                };
            case DbEnum.History:
                return new DbContext()
                {
                    Server = "History",
                    ConnectionStr = "History connection string"
                };
            case DbEnum.Online:
                return new DbContext()
                {
                    Server = "Online",
                    ConnectionStr = "Online connection string"
                };
            default:
                throw new Exception("No mapping database settings!");
        }

    }

    public static DbContext CreateDataMart()
    {
        return new DbContext()
        {
            Server = "DataMart",
            ConnectionStr = "DataMart connection string"
        };
    }

    public static DbContext CreateHistory()
    {
        return new DbContext()
        {
            Server = "History",
            ConnectionStr = "History connection string"
        };
    }

    public static DbContext CreateOnline()
    {
        return new DbContext()
        {
            Server = "Online",
            ConnectionStr = "Online connection string"
        };
    }
}
```

* Python
```
```


使用方式：

* C#
```
//1. 由參數決定建立哪種連線
var dmDbcontext =  StcDbFactory.Create(DbEnum.DataMart);
dmDbcontext.Connect();
Assert.Equal(DbEnum.DataMart.ToString(), dmDbcontext.Server);

//2. 直接呼叫對應的方法
var olDbcontext =  StcDbFactory.CreateOnline();
Assert.Equal(DbEnum.Online.ToString(), olDbcontext.Server);
olDbcontext.Connect();
```

* Python
```
```



### Abstract factory

建立一個抽象工廠，再各自建立擴充的工廠來覆寫它。

* C#
```
public abstract class AbsDbFactory
{
    public abstract DbContext Create();
}

public class DataMartDbFactory : AbsDbFactory
{
    public override DbContext Create()
    {
        return new DbContext()
        {
            Server = "DataMart",
            ConnectionStr = "DataMart connection string"
        };
    }
}

//請參考DataMartDbFactory建立HistoryDbFactory, OnlineDbFactory
```

* Python
```
```

使用方式：

* C#
```
var dmFactory = new DataMartDbFactory();
var dmDbcontext =  dmFactory.Create();
dmDbcontext.Connect();
```

* Python
```
```


### Generic factory

或是建立interface : `IDbContext`，再建立各資料庫類別實作它； 由泛型工廠建立對應之類別。

* C#
```
public interface IDbContext
{
    string Server { get; set; }
    string ConnectionStr { get; set; }
    void Connect();
}

public class DataMartDbContext : IDbContext
{
    public string Server { get; set; } = "DataMart";
    public string ConnectionStr { get; set; } = "DataMart connection string";
    public void Connect() => System.Diagnostics.Trace.WriteLine($"Connect to {this.Server}"); 
}
//請參考DataMartDbContext建立HistoryDbContext, OnlineDbContext

//泛型工廠
public static class GenericDbFactory<T> where T : IDbContext, new()
{
    public static T Create()
    {
        return new T();
    }
}
```

* Python
```
```

使用方式：

* C#
```
var olDbcontext =  GenericDbFactory<OnlineDbContext>.Create();
olDbcontext.Connect();
```

* Python
```
```


## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Adapter)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtAdapter.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Adapter)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Adapter/UtAdapter.py)





