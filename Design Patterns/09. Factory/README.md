# Factory 工廠模式

## 需求描述

Lily(Team member):
> As a 開發人員<br>
> I want 建立一個Interface來讓開發人員建立各資料庫連線物件<br>
> So that 避免在多個程式碼區塊放入建立資料庫連線的細節，降低耦合度<br>


## 思考設計

JB:<br> 
我們終於排入這個Backlog了，看看這些到處散落的建立資料庫連線的程式碼! 


Hachi:<br>
對，充滿了壞味道([Bad Smell](https://en.wikipedia.org/wiki/Code_smell))，不過重構永遠不嫌晚，我們開始進行吧! 大家都同意使用工廠模式嗎？

JB:<br>
無庸置疑!


## 定義

> 讓工廠類別(Factory Class)去做建立物件的細節，至於使用者只要使用Factory去建立需要的物件，不需要知道物件怎麼建立的，或是細節。([WIKI](https://en.wikipedia.org/wiki/Abstract_factory_pattern))

以下將介紹幾種常用的工廠模式：
1. Static factory
2. Abstract factory
3. Generic factory (C#)


假設在這個需求，我們有三個不同的Database server需要連線，分別為
* DataMart資料庫
* 歷史資料庫
* 線上資料庫

我們把對應的DB Server name和連線字串存放在`DbContext`類別:

* C#
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

* Python
```
class DbContext:
    def __init__(self, server="", connectionStr=""):
        self.server = server
        self.connectionStr= connectionStr

    def connect(self):
        print("Connect to {0}".format(self.server))

```

另外建立一個列舉型別：`DbEnum`，下一個步驟可利用它作為參數決定`DbContext`的細節。

* C#
```
public enum DbEnum
{
    DataMart = 1,
    History,
    Online
}
```

* Python
```
from enum import Enum

class DbEnum(Enum):
     DataMart = 1
     History = 2
     Online = 3
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
class StcDbFactory(object):
    @staticmethod
    def create(dbEnum:DbEnum):
        
        return {
            DbEnum.DataMart: DbContext(server="DataMart", connectionStr="DataMart connection string"),
            DbEnum.History: DbContext(server="History", connectionStr="History connection string"),
            DbEnum.Online: DbContext(server="Online", connectionStr="Online connection string")
        }[dbEnum]

    @staticmethod
    def createDataMart():
        dbContext = DbContext(
            server="DataMart", connectionStr="DataMart connection string")
        return dbContext

    @staticmethod
    def createHistory():
        dbContext = DbContext(
            server="History", connectionStr="History connection string")
        return dbContext

    @staticmethod
    def createOnline():
        dbContext = DbContext(
            server="Online", connectionStr="Online connection string")
        return dbContext

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
#1. 由參數決定建立哪種連線
dmDbcontext = StcDbFactory.create(DbEnum.DataMart)
dmDbcontext.connect()

#2. 直接呼叫對應的方法
olDbcontext = StcDbFactory.createOnline()
olDbcontext.connect()
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
class AbsDbFactory(ABC):
    @abstractmethod
    def create(self):
        """Return DbContext"""
        pass

class DataMartDbFactory(AbsDbFactory):
    def create(self):
        return DbContext(server = "DataMart",connectionStr = "DataMart connection string")

class HistoryDbFactory(AbsDbFactory):
    def create(self):
        return DbContext(server = "History",connectionStr = "History connection string")

class OnlineDbFactory(AbsDbFactory):
    def create(self):
        return DbContext(server = "Online",connectionStr = "Online connection string")
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
dmFactory = DataMartDbFactory()
dmDbcontext =  dmFactory.create()
dmDbcontext.connect();
```


### Generic factory

我們可以利用C#的泛型(Generic)，搭配建立interface : `IDbContext`及實作它，由泛型工廠(Generic Factory)建立對應之類別。

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


使用方式：

```
var olDbcontext =  GenericDbFactory<OnlineDbContext>.Create();
olDbcontext.Connect();
```



## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Factory)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtFactory.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Factory)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Factory/UtFactory.py)





