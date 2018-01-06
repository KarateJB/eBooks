# Memento 備忘錄模式

## 需求描述

Amy(PO):
> As a 電子表單使用者<br>
> I want 系統可以在我填寫表單時，提供記錄草稿的功能，儲存該張表單後，即刪除該單所有草稿，但若未儲存，則須保留草稿<br>
> So that 避免臨時無法完成表單而造成已填寫之資料遺失情況<br>


## 思考設計

JB:<br>
(打哈欠)這個User Story有點長，我總是記不住，我得重頭再看一次...

Lily:<br>
你得有充足的睡眠! 避免像個鐵人一樣在半夜寫程式或寫文章! 好了，我建議用備忘錄解決這件事。

JB:<br>
你說的沒錯，把一些重要的東西記在備忘錄，需要的時候就拿出來看... 

Lily:<br>
喔，我是指用設計模式:Memento，來解決這個Backlog，它提供了可以隨時儲存現在的狀態，和回復之前的狀態的行為模式。


## 定義

> 在不違反封裝的原則下，取得一個物件的內部狀態並保留在外部，並提供對象恢復到其以前的狀態的能力 ([WIKI](https://en.wikipedia.org/wiki/Memento_pattern))

在Memento中，定義了以下角色：
1. Originator: 擁有要被儲存的資料
2. Memento: State(可以是物件、標記、或其他內容)
3. Caretaker(管理人): 管理與儲存Memento(由Originator提供)，提供存取的介面


### UML
![](https://1.bp.blogspot.com/-E7-3ELvBHt0/Wk_4DOlAuGI/AAAAAAAAFqA/AdxPisQI7f4sgysrPCr_LQ1LtYvPBc3yACLcBGAs/s1600/Memento.png)


### Memento

在這個例子，我們要放在備忘錄的目標是：電子表單，所以先建立如下之Model:

* C#
```
public class Eflow : ICloneable
{
    public DateTime CreateOn { get; set; }
    public string FormData { get; set; }

    public object Clone()
    {
        //Implement deep clone here
    }
}
```

* Python
```
import datetime

class Eflow:
    def __init__(self, createOn=datetime.datetime, formData=""):
        self.createOn = createOn 
        self.formData = formData

```


Memento即代表一份備忘錄，我們在這個備忘錄記錄我們想留存的東西；
以這個例子來看，我們要留存的是**電子表單**物件；為了區別每一份備忘錄，我們在備忘錄上也記錄一個唯一的序號(Id)。

* C#
```
public interface IMemento
{
    string Id {get;set;}
}
public class EflowMemento:IMemento
{
    public string Id {get;set;}
    public Eflow Eflow {get;set;}
}
```

* Python
```
from abc import ABC, abstractmethod
from Models import Eflow

class Memento(ABC):
    def __init__(self, id=""):
        self.id = id

class EflowMemento(Memento):
    def __init__(self, id="", eflow=Eflow):
        self.id = id
        self.eflow = eflow
```


### Caretaker

Caretaker的職責就是提供一個可供存取備忘錄的容器和介面。

* C#
```
public class Caretaker
{
    private IDictionary<string, IMemento> _store = null;
    public Caretaker()
    {
        this._store = new Dictionary<string, IMemento>();
    }
    public void Add(string key, IMemento memento)
    {
        this._store.Add(key, memento);
    }

    public IMemento Get(string key)
    {
        if (this._store.ContainsKey(key))
        {
            return this._store[key];
        }
        else
        {
            return null;
        }
    }
}
```

* Python
```
class Caretaker:
    def __init__(self):
        self.store = {}

    def add(self, key="", memento=Memento):
        self.store[key] = memento
        print("儲存一張表單! 建立日期{0}，內容: {1}".format(
            memento.eflow.createOn, memento.eflow.formData))

    def get(self, key=""):
        restoredMemento = self.store[key]
        print("回存一張表單! 建立日期{0}，內容: {1}".format(
            restoredMemento.eflow.createOn, restoredMemento.eflow.formData))
        return restoredMemento
```


### Originator

Originator是主程式操作的對像，它擁有需要被記錄的資料，並且提供以下功能
1. 建立備忘錄(不是儲存喔!)
2. 將目前資料回復成任何一張備忘錄裡的狀態


* C#
```
public interface IOriginator
{
        IMemento CreateMemento();
        void RestoreMemento(IMemento memento);
}

public class EflowOriginator : IOriginator
{
    private Eflow _eflow = null;

    public Eflow Eflow
    {
        get { return this._eflow; }
        set { this._eflow = value; }
    }

    /// 記錄目前狀態
    public IMemento CreateMemento()
    {
        IMemento memento = new EflowMemento()
        { 
            Id = System.Guid.NewGuid().ToString(),
            Eflow = (Eflow)this._eflow.Clone()
        };
        return memento;
    }

    /// 回存舊的狀態
    public void RestoreMemento(IMemento memento)
    {
        this._eflow = (memento as EflowMemento).Eflow;
    }
}
```

* Python
```
import uuid
import copy
from abc import ABC, abstractmethod

class Originator(ABC):
    @abstractmethod
    def createMemento(self):
        pass

    @abstractmethod
    def restoreMemento(self, memento= Memento):
        pass

class EflowOriginator(Originator):
    def __init__(self):
        self.eflow = None
    
    def createMemento(self):
        uid = str(uuid.uuid4())
        memento = EflowMemento(uid, copy.deepcopy(self.eflow))
        return memento

    def restoreMemento(self,memento=Memento):
        self.eflow = memento.eflow
```


我以一張示意圖來表示以上的程式碼：

![](https://2.bp.blogspot.com/-ujCKEff2U2U/WlAJe9ptLTI/AAAAAAAAFqQ/RsBxptxsjj4bSeK5kTKsqQl7Q7YXwqTUwCLcBGAs/s1600/Memento_pic.png)


我們來看主程式的部分。

* C#
```
var caretaker = new Caretaker();
            
var originator = new EflowOriginator();
originator.Eflow = new Eflow{
    CreateOn = DateTime.Now, 
    FormData = "簽呈：工程師Hachi申請加薪$3,000!"
};

//建立備忘
var memento = originator.CreateMemento(); 
//儲存備忘
caretaker.Add("Hachi的新年新希望" , memento);

//老闆收到電子表單，找Hachi約談並施展三寸不爛之舌，只同意加薪$30
originator.Eflow.CreateOn = DateTime.Now.AddMinutes(2); 
originator.Eflow.FormData = "簽呈：工程師Hachi申請加薪$30!"; 

//建立備忘
memento = originator.CreateMemento();
//儲存備忘
caretaker.Add("Hachi的新年新希望v2" , memento);

//有新公司找Hachi過去，Hachi準備提離職，老闆趕緊同意先前條件
//Hachi調出之前該單的備忘回存
var mementoOld = caretaker.Get("Hachi的新年新希望");
originator.RestoreMemento(mementoOld);
```

* Python
```
caretaker = Caretaker()
            
        originator = EflowOriginator()
        originator.eflow = Eflow(
                createOn = datetime.datetime.now(), 
                formData = "簽呈：工程師Hachi申請加薪$3,000!")

        # 第一次建立備忘
        memento = originator.createMemento() 
        # 第一次儲存備忘
        caretaker.add("Hachi的新年新希望" , memento)
            
        # 老闆收到表單，找Hachi約談並施展三寸不爛之舌，只同意加薪$30
        originator.eflow.createOn = originator.eflow.createOn + datetime.timedelta(0,2)
        originator.eflow.formData = "簽呈：工程師Hachi申請加薪$30!" 

        # 第二次建立備忘
        memento = originator.createMemento()
        # 第二次儲存備忘
        caretaker.add("Hachi的新年新希望v2" , memento)

        # 有新公司找Hachi過去，Hachi準備提離職，老闆趕緊同意先前條件
        # Hachi調出之前該單的備忘回存
        mementoOld = caretaker.get("Hachi的新年新希望")
        originator.restoreMemento(mementoOld)
```

執行結果：

*儲存一張表單! 建立日期2018/01/06 18:46:55，內容: 簽呈：工程師Hachi申請加薪$3,000!*
*儲存一張表單! 建立日期2018/01/06 18:48:55，內容: 簽呈：工程師Hachi申請加薪$30!*
*回存一張表單! 建立日期2018/01/06 18:46:55，內容: 簽呈：工程師Hachi申請加薪$3,000!*


## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Memento)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtMemento.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Memento)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Memento/UtMemento.py)
