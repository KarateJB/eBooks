# Decorator 裝飾者模式

## 需求描述

Amy(PO):
> As a 物流部秘書<br>
> I want 報價單系統可以在標準運費上加上其他服務費：加點/假日運送/延誤費"並費用最大化<br>
> So that 配合成本轉嫁客戶之策略，節首公司之支出<br>


## 思考設計

Hachi:<br> 
除了標準運費外，我們現在計費模組還需要支援計算其他費用。
我們來建立其他費用的計算類別，讓他們繼承原來的標準計費類別應該就可以了。

Lily:<br>
等等，我們先整理一下...標準運費計算方式有：
- 以里程計算：一公里NTD$30
- 以運送點計算(如台南NTD$5,000、新竹NTD$1,000)

附加服務費用：
- 加點：每多一個加收總價*10%
- 假日運送：總價*20%
- 延誤：N(小時)*NTD$500

我們必須抽象化標準和附加的費用類別，如果用繼承的方式，附加服務費用類別便會相依於標準運費類別。
想想看，所有的費用計算類別都有相同的行為嗎？

Hachi:
當然是的，他們的行為就是計費(微笑)。
我想你說的是讓所有費用計算類別繼承相同的抽象類別(或實作相同的介面)。

Lily:
很好，接下來我們來看看我們計算附加服務費用需要哪些資訊？

Hachi:
加點服務和假日運送需要知道總價...延誤費需要知道延誤了幾小時...
我懂了! 我們必須將抽象計費類別作為一個參數傳到另一個計費類別X，讓總價可以被計算出來再算X的費用。

Lily:
沒錯! 使用既有類別讓他們有新的能力是裝飾者模式(Decorator)的特性。 讓我們來看怎麼實做吧!





這次我來回答吧! 設計模式裡面有一個組合模式(Composite)最適合來表示樹狀結構了!

Lily:<br>
沒錯! Composite可以讓我們快速長出有階層關係的樹狀結構! 然後...我們可以提早結束跨年去囉! 



## 定義

> 組合模式可以表示單一和群體階層(Part-whole hierarchy)的關係，而群體為這單一物件的相同型別集合，他們有著相同的行為。

企業組織圖為適合使用組合模式的其中一個例子：

![](https://2.bp.blogspot.com/-ddFzGOjpqlc/WkgEaSPE6nI/AAAAAAAAFoA/NrUKQbhVW8ctsmR1xqSehEOZr8xssvFGwCLcBGAs/s1600/Composite.PNG)

每一個單位(node)底下可能還會有多種單位(nodes)，另外nodes裡面的每個單位雖然隸屬於同一單位底下，但其性質可能不同。
所以我們先抽像化node，並用組合模式來表示這種階層關係。

* C#
```
public abstract class Organization
{
    public string Title { get; set; }
    public string Head { get; set; }
    public List<Organization>  SubOrganizations { get; set; }
    public abstract void Add(Organization org);
    public abstract void Remove(string title); 

    public abstract void PrintVision(); 
}
```

* Python
```
from abc import ABC, abstractmethod

class Organization(ABC):

    @abstractmethod
    def add(self, org):
        pass

    @abstractmethod
    def remove(self, title):
        pass        

    @abstractmethod
    def printVision(self):
        pass
```

接著我們開始定義多個組織單位。

* C#
```
/// <summary>
/// 新產品開發部
/// </summary>
public class NewProdDev : Organization
{
    public NewProdDev(string title, string head)
    {
        this.Title = title;
        this.Head = head;
        this.SubOrganizations = new List<Organization>();
    }

    public override void Add(Organization org)
    {
        this.SubOrganizations.Add(org);
    }

    public override void Remove(string title)
    {
        var target = this.SubOrganizations.Where(x=>x.Title.Equals(title)).FirstOrDefault();
        this.SubOrganizations.Remove(target);
    }

    public override void PrintVision()
    {
        Trace.WriteLine("開發管理部Vision：讓人類生活更美好!");
    }
}

/// <summary>
/// 行動裝置部
/// </summary>
public class MobileProd : NewProdDev
{
    public MobileProd(string title, string head):base(title, head)
    {
    }

    public override void PrintVision()
    {
        Trace.WriteLine("行動裝置部Vision：讓人類二十四小時都離不開手機!");
    }
}

//...其餘單位請參考MobileProd建立
```

* Python
```
class NewProdDev(Organization):
    """開發管理部
    """
    
    def __init__(self, title="",head=""):
        self.title = title
        self.head = head
        self.subOrganizations=[]
    
    def add(self, org):
        self.subOrganizations.append(org)
        print("{0}下新增單位：{1}".format(self.title, org.title))

    def remove(self, title):
        for el in self.subOrganizations:
            if(el.title==title):
                self.subOrganizations.remove(el)
                print("{0}下移除單位：{1}".format(self.title, title))
    

    def printVision(self):
        print("開發管理部Vision：讓人類生活更美好!")



        
class MobileProd(NewProdDev):
    """行動裝置部
    """
    def __init__(self, title="", head=""):
        super().__init__(title, head)
        
    def printVision(self):
        print("行動裝置部Vision：讓人類二十四小時都離不開手機!")

class AppDev(NewProdDev):
    def __init__(self, title="", head=""):
        super().__init__(title, head)

    def printVision(self):
        print("APP開發課Vision：不要加班!要跨年!")

class NewBsDev(NewProdDev):
    """新商機開發課
    """
    def __init__(self, title="", head=""):
        super().__init__(title, head)
        
    def printVision(self):
        print("新商機開發課Vision：Show me the money!")
```


主程式使用Composite的範例：

* C#
```
Organization newProdDev = new NewProdDev(title: "XX銀行-產品管理部", head: "達斯西帝斯");
Organization mobileProd = new MobileProd(title: "XX銀行-行動裝置部", head: "達斯維達");
Organization appDev = new AppDev(title: "XX銀行-APP開發課", head: "弒星者");
Organization newBsDev = new NewBsDev(title: "XX銀行-新商機開發課", head: "白兵隊長");

mobileProd.Add(appDev);
mobileProd.Add(newBsDev);
newProdDev.Add(mobileProd);

this.printVision(newProdDev); //遞迴列印出所有單位的Vision
```

* Python
```
newProdDev = NewProdDev(title="XX銀行-產品管理部", head="達斯西帝斯")
mobileProd = MobileProd(title="XX銀行-行動裝置部", head="達斯維達")
appDev = AppDev(title="XX銀行-APP開發課", head="弒星者")
newBsDev = NewBsDev(title="XX銀行-新商機開發課", head="白兵隊長")

newProdDev.add(mobileProd)
mobileProd.add(appDev)
mobileProd.add(newBsDev)

self.printVisions(newProdDev) #遞迴列印出所有單位的Vision
```

顯示結果如下...

*XX銀行-產品管理部下新增單位：XX銀行-行動裝置部*
*XX銀行-行動裝置部下新增單位：XX銀行-APP開發課*
*XX銀行-行動裝置部下新增單位：XX銀行-新商機開發課*
*開發管理部Vision：讓人類生活更美好!*
*行動裝置部Vision：讓人類二十四小時都離不開手機!*
*APP開發課Vision：不要加班!要跨年!*
*新商機開發課Vision：Show me the money!*

## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Composite)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtComposite.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Composite)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Composite/UtComposite.py)
