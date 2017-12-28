# Prototype 原型模式

## 需求描述

Amy(PO):
> As a 系統使用者<br>
> I want 降低查詢線上交易報表的回應時間<br>
> So that 提高作業效率<br>


## 思考設計

JB:
我們有個不算小的麻煩，PO在昨天的Review meeting提到我們的交易報表跑的非常慢，老闆希望我們盡快改善。
所以我們得優先處理這個Backlog!

Lily:
恩，我們得知道要在幾秒內顯示資料才能被驗收或是討論我們的限制和假設條件。
你可以幫忙去找PO確認嗎？ 在那之前... 我們有什麼已經知道的資訊？

Hachi:
有的，我正在查詢報表模組是否支援部分資料顯示(Partial Rendering)。
另外交易系統查詢出來的每一筆資料都要回主檔資料庫查詢店家資訊，我想這是查詢緩慢的原因。

Lily:
不同交易但是店家的資訊是一樣的，幾萬筆查詢應該可以減少到十幾筆，畢竟我們的特店只有十幾家。
讓我們使用Prototype模式來複製這些重複的資訊吧!


## 定義

> Prototype屬於為Creational design patterns， 可使用已建立好的Prototype將資訊直接複製到新物件上

原型模式在C#可實作`IClonable`、在Python可透過`copy.copy(x)`及`copy.deepcopy(x)`兩個操作方法來達成。
但是原型模式有更深層的意義在於
1. 儲存原型
2. 方便的調用原型複製(Clone)功能

我們以下的範例除了建立原型，也會將原型儲存到原型儲存庫(Prototype Store)裡面以隨時調用。

我們先建立Prototype的interface(或抽象類別)。
在C#也可以選擇不要實作`IClonable`，而自行加入一個`Clone`函式

* C#
```
public interface IPrototype:ICloneable
{
}
```

* Python
```
from abc import ABC, abstractmethod

class Prototype(ABC):

    @abstractmethod
    def clone(self):
        pass

```


接下來我們要建立要作為原型的類別，並且實作`IPrototype`(C#)或`Prototype`(Python)，我們在這些類別名稱前面加上Prototype以方便辨識， 

C#
```
public class PrototypeFatbook : BaseStore, IPrototype
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public string Ads { get; set; }

    public object Clone()
    {
        Trace.WriteLine("Cloning PrototypeFatbook");
        return Utility.DeepClone(this);
    }
}
public class PrototypeGoople : BaseStore, IPrototype
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public string SearchEngine { get; set; }

    public object Clone()
    {
        Trace.WriteLine("Cloning PrototypeGoople");
        return Utility.DeepClone(this);
    }
}
```

* Python
```
class PrototypeFatbook(Prototype):
    def __init__(self, id, name, phone, ads):
        self.id = id
        self.name = name
        self.phone = phone
        self.ads = ads

    def clone(self):
        print("Cloning PrototypeFatbook")
        return copy.deepcopy(self)


class PrototypeGoople(Prototype):
    def __init__(self, id, name, phone, searchEngine):
        self.id = id
        self.name = name
        self.phone = phone
        self.searchEngine = searchEngine

    def clone(self):
        print("Cloning PrototypeGoople")
        return copy.deepcopy(self)
```

注意上面我省略列出了`Clone`方法裡面的複製方法和一些細節，可在文章最底下Github連結查看完整的原始程式碼。
> `Clone`的實作需要了解**Shallow copy**和**Deep copy**的差異和如何實作。

接下來，我們要實作一個原型儲存庫(Prototype Store)來存放建立好的原型實體物件。
Prototype Store至少必須支援儲存原型：`Add()`和調用原型：`Get()`。<br>


* C#
```
public class PrototypeStore
{
    private Dictionary<StoreEnum, IPrototype> prototypes = null;

    public PrototypeStore()
    {
        prototypes = new Dictionary<StoreEnum, IPrototype>();
    }

    /// 加入新的Prototype
    public void Add(StoreEnum store, IPrototype prototype)
    {
        prototypes.Add(store, prototype);
    }
    /// 取得特定Prototype
    public IPrototype Get(StoreEnum store)
    {
        var prototype = (IPrototype)this.prototypes[store].Clone();
        return prototype;
    }
}

public enum StoreEnum
{
    Fatbook,
    Goople,
    Amozoo
}
```

* Python
```
class StoreEnum(Enum):
    Goople = 1,
    Fatbook = 2,
    Amozoo = 3


class PrototypeStore:

    _prototypes = {}

    def add(self, store=StoreEnum, prototype=Prototype):
        self._prototypes[store] = prototype

    def get(self, store=StoreEnum):
        return self._prototypes[store].clone()
```

讓我們來看看在主程式如何使用Prototype pattern!

* C#
```
var fatbookP = new PrototypeFatbook()
{
    Id = 2001,
    Name = "Fatbook",
    Phone = "09ZZZZZZZZ",
    Ads = "Many"
};

#region Initialize PrototypeStore
var prototypeStore = new PrototypeStore();
prototypeStore.Add(StoreEnum.Fatbook, fatbookP);
#endregion

#region Get a new instance from Prototype store
var newFatbook = prototypeStore.Get(StoreEnum.Fatbook) as PrototypeFatbook;
#endregion
```

* Python
```
goopleP = PrototypeGoople(
    id=1001,
    name="Goople",
    phone="09XXXXXXX",
    searchEngine="Awesome"
)


# Initialize PrototypeStore
prototypeStore = PrototypeStore()
prototypeStore.add(StoreEnum.Goople, goopleP)

# Get a new instance from Prototype store
newGoople = prototypeStore.get(StoreEnum.Goople)
```


## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Prototype)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtPrototype.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Prototype)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Prototype/UtPrototype.py)









## Reference
1. [copy — Shallow and deep copy operations](https://docs.python.org/3.6/library/copy.html)
2. [How to Compare Object Instances in your Unit Tests Quickly and Easily](https://buildplease.com/pages/testing-deep-equalilty/)
3. [Compare Datatype, Value in C#](https://www.codeproject.com/Questions/998515/Compare-Datatype-Value-in-Csharp)