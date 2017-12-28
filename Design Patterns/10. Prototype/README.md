# Prototype 原型模式

## 需求描述

Amy(PO):
> As a 系統使用者<br>
> I want 降低查詢線上交易報表的回應時間<br>
> So that 提高作業效率<br>


## 思考設計

JB:
我們有個不算小的麻煩，PO在昨天的Iteration review提到我們的交易報表非常的慢，老闆希望我們盡快改善。
所以我們得優先處理這個Backlog!

Lily:
DoD(Definition of Done)有提到驗收的標準嗎？恩，我沒看到，我得知道要在幾秒內顯示資料才能提出我們的限制和假設條件。
你可以幫忙去找PO refine這個User Story嗎？ 在那之前... 我們有什麼已經知道的資訊嗎？

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


接下來我們要建立要作為原型的類別，並且實作`IPrototype`(C#)或`Prototype`(Python)，我們在這些類別名稱前面加上Prototype以方便辨識， 另外額外建立一個基礎類別`BaseStore`來存放特店的基本屬性。

C#
```
public class BaseStore
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
}
public class PrototypeFatbook : BaseStore, IPrototype
{
    public string Ads { get; set; }

    public object Clone()
    {
        Trace.WriteLine("Cloning PrototypeFatbook");
        return Utility.DeepClone(this);
    }
}
public class PrototypeGoople : BaseStore, IPrototype
{
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
class BaseStore:
    def __init__(self, id, name, phone):
        self.id = id
        self.name = name
        self.phone = phone


class PrototypeFatbook(BaseStore, Prototype):
    def __init__(self, id, name, phone, ads):
        super().__init__(id, name, phone)
        self.ads = ads

    def clone(self):
        print("Cloning PrototypeFatbook")
        return copy.deepcopy(self)


class PrototypeGoople(BaseStore, Prototype):
    def __init__(self, id, name, phone, searchEngine):
        super().__init__(id, name, phone)
        self.searchEngine = searchEngine

    def clone(self):
        print("Cloning PrototypeGoople")
        return copy.deepcopy(self)
```

注意上面我省略列出了`Clone`方法裡面的複製方法和一些細節，可在文章最底下瀏覽原始程式碼。

接下來，我們要實作一個原型儲存庫(Prototype Store)來存放建立好的原型實體物件。








## Reference
1. [copy — Shallow and deep copy operations](https://docs.python.org/3.6/library/copy.html)
2. [How to Compare Object Instances in your Unit Tests Quickly and Easily](https://buildplease.com/pages/testing-deep-equalilty/)
3. [Compare Datatype, Value in C#](https://www.codeproject.com/Questions/998515/Compare-Datatype-Value-in-Csharp)