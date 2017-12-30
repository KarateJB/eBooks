# Builder 建造者模式

## 需求描述

Amy(PO):
> As a 公司入口網站產品經理<br>
> I want 各BU在公司入口網站首頁看到屬於部門之資訊<br>
> So that 讓主管及同仁能迅速掌握資訊，並達到各部門之差異化。<br>


## 思考設計

Lily:<br> 
依據我們剛才重新評估的結果，這個User Story比首次預估的複雜多了!
每個BU單位要看到不同的資訊，這對我們來說是個不小的挑戰。  

JB:<br>
我們該怎麼來建造這個大工程?

Lily:<br>
恩，每個BU需要的資料好像東拿一塊藍色積木、西拿一塊紅色積木，再慢慢建造成一個屬於自己的房子。 我們來使用建造者模式來"建造"後端的資料吧!



## 定義

> 建造者模式(Builder)也是Creational design pattern，它支援多型(Polymorphism)，與Factory不同的地方在於，Builder模式一步一步建立實體物件的部分組成，最後再回傳一個完整的物件。([WIKI](https://en.wikipedia.org/wiki/Builder_pattern))

建造者模式包含了以下元素：
1. Builder(建造者) : 負責建造
2. Director(總監) : 請建造者依序執行建造的動作

假設入口網站包含了"報表"及"員工請假資訊"，而各BU看到的報表類型或哪些員工(介於多少職等)請假要列出來的條件皆不一樣。

我們先建立要Builder產生的Model如下。

* C#
```
public interface IMainData
{
    string TargetBU { get; set; }
    Report Report { get; set; }
    LeaveRecord LeaveRecord { get; set; }
}

public class MainData:IMainData
{
    public string TargetBU { get; set; }
    public Report Report { get; set; }
    public LeaveRecord LeaveRecord { get; set; }
}
```

* Python
```
class Report:
    def __init__(self, name="", data=""):
        self.name=name
        self.data=data


class LeaveRecord:
    def __init__(self, gradeFrom, gradeTo, weeks, data=""):
        self.gradeFrom=gradeFrom
        self.gradeTo=gradeTo
        self.weeks = weeks
        self.data=data

class MainData:
    def __init__(self, targetBU="", report=Report, leaveRecord=LeaveRecord):
        self.targetBU = targetBU
        self.report=report
        self.leaveRecord=leaveRecord

```



### Builder(建造者)

接下來我們針對IT(資訊部門)和FI(財務部門)建立各自的Builder，
而這些Builder裡面包含實體化(如`Init()`)和實作細節的函式(如`BuildReport()`)。

* C#
```
public interface IBuilder
{
    IMainData Init();
        void BuildReport(IMainData main);
        void BuildLeaveRecord(IMainData main);
        IMainData Create();
}

public class BuilderFI : IBuilder
{
    public IMainData Init()
    {
        Trace.WriteLine("Initializing from BuilderFI!");
        var main = new MainData(){ TargetBU="Financial Department" };
        return main;
    }

    public void BuildReport(IMainData main)
    {
        Trace.WriteLine("Building Report from BuilderFI!");
        
        main.Report = new Report()
        {
            Name = "ROI report"
        };
    }

    public void BuildLeaveRecord(IMainData main)
    {
        Trace.WriteLine("Building LeaveRecord from BuilderFI!");
        
        main.LeaveRecord = new LeaveRecord()
        {
            GradeFrom = 5,
            GradeTo = 10,
            Weeks = 2
        };
    }
}

public class BuilderIT : IBuilder
{
    public IMainData Init()
    {
        Trace.WriteLine("Initializing from BuilderIT!");
        var main = new MainData(){ TargetBU="IT" };
        return main;
    }

    public void BuildReport(IMainData main)
    {
        Trace.WriteLine("Building Report from BuilderIT!");
        main.Report = new Report()
        {
            Name = "Overtime report"
        };
    }

    public void BuildLeaveRecord(IMainData main)
    {
        Trace.WriteLine("Building LeaveRecord from BuilderIT!");
        main.LeaveRecord = new LeaveRecord()
        {
            GradeFrom = 1,
            GradeTo = 8,
            Weeks = 4
        };
    }
}
```

* Python
```
from abc import ABC, abstractmethod

class Builder(ABC):
    @abstractmethod
    def init(self):
        pass

    @abstractmethod
    def buildReport(self, main=MainData):
        pass

    @abstractmethod
    def buildLeaveRecord(self, main=MainData):
        pass


class BuilderFI(Builder):
    def init(self):
        print("Initializing from BuilderFI!")
        main = MainData(targetBU="Financial Department")
        return main;

    def buildReport(self, main=MainData):
        print("Building Report from BuilderFI!")
        main.report = Report(name="ROI report")

    def buildLeaveRecord(self, main=MainData):
        print("Building LeaveRecord from BuilderFI!")
        main.leaveRecord = LeaveRecord(
            gradeFrom = 5,
            gradeTo = 10,
            weeks = 2
        )


class BuilderIT(Builder):
    def init(self):
        print("Initializing from BuilderIT!")
        main = MainData(targetBU="IT")
        return main;

    def buildReport(self, main=MainData):
        print("Building Report from BuilderIT!")
        main.report = Report(name="Overtime report")

    def buildLeaveRecord(self, main=MainData):
        print("Building LeaveRecord from BuilderIT!")
        main.leaveRecord = LeaveRecord(
            gradeFrom = 1,
            gradeTo = 8,
            weeks = 4
        )
```


### Director(總監)

還記得Builder負責建造，Director負責計畫嗎？
但是**Director需要有Builder才能做事**，光喊計畫、計畫，但是沒有人去執行是沒用的。
所以我們必須至少傳入一個Builder作為建構子的參數，讓`Director`類別裡的`Construct()`方法可以依序使用Builder裡面的方法。

* C#
```
public class Director
{
    protected IBuilder _builder;
    public Director(IBuilder builder) 
    {
        this._builder = builder;
    }

    public virtual IMainData Construct()
    {
        var rtn = this._builder.Init();
        this._builder.BuildReport(rtn);
        this._builder.BuildLeaveRecord(rtn);
        return rtn;
    }
}
```

* Python
```
class Director():
    
    _builder = None

    def __init__(self, builder=Builder):
        self._builder = builder
        
    def construct(self):
        rtn = self._builder.init()
        self._builder.buildReport(rtn)
        self._builder.buildLeaveRecord(rtn)
        return rtn
```

### 開始建造!

我們來看看主程式如何利用建造者模式，產生一個給財務部使用的`BuilderFI`物件。

* C#
```
var builder = new BuilderFI();
var director = new Director(builder);
var mainData = director.Construct();
```

* Python
```
myBuilder = BuilderFI()
director = Director(builder=myBuilder)
mainData = director.construct()
```


執行結果OK：

*Initializing from BuilderFI!*<br>
*Building Report from BuilderFI!*<br>
*Building LeaveRecord from BuilderFI!*<br>



上面的`Director`已經可以依據我們傳入的`Builder`建立對應的物件。
剛才提到Director至少傳入一個Builder，那有沒有可能需要第二個Builder參數呢？
我們再建立一個給CXO專用的Director類別，但是CEO關心的就不僅是單一個BU的資訊，而可能是：
- 報表：看財務部 (CXO: 最近營收掉了喔...)
- 請假資訊：看資訊部 (CXO: 系統要上線了，哪個不長眼的還請假...)

這個需求我們得藉由傳入兩個Builder來完成。

* C#
```
public class DirectorCEO : Director
{
    private IBuilder _builder2;

    public DirectorCEO(IBuilder builder1, IBuilder builder2) : base(builder1)
    {
        this._builder2 = builder2;
    }

    public override IMainData Construct()
    {
        var rtn = base._builder.Init();
        rtn.TargetBU = "CEO";
        base._builder.BuildReport(rtn);
        this._builder2.BuildLeaveRecord(rtn); //Use another builder
        return rtn;
    }
}
```

* Python
```
class DirectorCEO(Director):
    
    _builderExtra = None
    def __init__(self, builder1=Builder, builder2=Builder):
        super(DirectorCEO, self).__init__(builder=builder1)
        self._builderExtra = builder2
        
    def construct(self):
        rtn = self._builder.init()
        rtn.targetBU = "CEO"
        self._builder.buildReport(rtn)
        self._builderExtra.buildLeaveRecord(rtn)
        return rtn
```

主程式

* C#
```
var builder1 = new BuilderFI();
var builder2 = new BuilderIT();

var director = new DirectorCEO(builder1, builder2);
var mainData = director.Construct();
```

* Pyhton
```
myBuilder1 = BuilderFI()
myBuilder2 = BuilderIT()
director = DirectorCEO(builder1=myBuilder1, builder2=myBuilder2)
mainData = director.construct()
```

跑程式的結果如下，可以看到請假資訊已改由`BuilderIT`建造出來。

*Initializing from BuilderFI!*<br>
*Building Report from BuilderFI!*<br>
*Building LeaveRecord from BuilderIT!*<br>


### 和Factory模式的差別

初看Builder(建造者模式)會很難抓到使用的時機，因為Factory(工廠模式)可以解決大部分的Creational需求。 

我們現在找一個Builder類別，加上`Create()`方法... (以C#舉例)

* C#
```
public class BuilderFI : IBuilder
{
    //Skip Init, BuildReport, BuildLeaveRecord methods...

    public IMainData Create()
    {
        var main = this.Init();
        this.BuildReport(main);
        this.BuildLeaveRecord(main);
        return main;
    }
}
```

我們在Create方法裡面，直接把實體物件建立出來了。
現在`BuilderFI`已經變成Abstract Factory(抽象工廠)!
我們可以直接 `var newInstance = (new BuilderFI()).Create()`，但是**如何建立**已被放在這個Builder的`Create()`方法。
如果採用建造者模式，我們就可以再抽象化**如何建立**這件事，甚至如第二個例子看到的，去組合各種Builder。  

> 我們一般人裝潢房屋時，直接請裝潢師傅的話，他會說交給我就好了(但是價錢、工料、工法對一般人來說都是黑箱作業)。
> 如果多請一個設計師，你可以只告訴他：我想要一個公主風的房間!
> 他就清楚知道哪些要做、哪些工可以省成本，也可以針對細節客製化，由他跟裝潢師傅談就可以了。
>
> 所以誰是Director? 誰是Builder呢? 相信您已經有答案了!



## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Builder)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtBuilder.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Builder)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Builder/UtBuilder.py)





