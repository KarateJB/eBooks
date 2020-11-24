# Template Method 樣板方法

> 中文也稱之為範本方法

## 需求描述

Amy(PO):
> As a 銀行交易員<br>
> I want 在衍生性金融商品管理系統可以自動比價<br>
> So that 提供獲利及損失模型，讓客戶理解投資風險<br>


## 思考設計

JB:<br>
我們的系統目前支援TARF、DKO和Synthetic Forward，我和交易員談過，他們的比價流程是一樣的，但是邏輯不一樣。
問題是...我們怎麼開始？

Lily:<br>
恩，我們可以先從建立一個標準的比價流程開始! 我們來用樣板方法(Template Method)設計一套比價範本給這些產品。 
再來設計每種產品的類別並實作裡面的方法!


## 定義

> 定義一個包含方法和執行流程的抽象樣板，讓實作類別透過繼承的方式實作方法的細節，最後透過樣板已經定義好的流程執行任務。([WIKI]())

我們建立一個抽象的Template，裡面包含了比價流程每個步驟會用到的方法，以及如何利用這些方法進行比價的流程。


* C#
```
public abstract class ProductFixingTemplate
{
    /// <summary>
    /// 找出Working Option Leg
    /// </summary>
    protected abstract void FindWorkOptionLeg();
    /// <summary>
    /// 檢查是否已經觸及生效/失效障礙
    /// </summary>
    protected abstract void CheckBarriers();
    /// <summary>
    /// 由檢核障礙結果做Rebate process
    /// </summary>
    /// <returns>是否繼續比價</returns>
    protected abstract bool RebateBarriers();
    /// <summary>
    /// 計算每個部位的PayOff及交割結果
    /// </summary>
    protected abstract void FixingOptionLeg();
    /// <summary>
    /// 檢核Triggers
    /// </summary>
    protected abstract void CheckTriggers();

    /// <summary>
    /// 開始比價
    /// </summary>
    public void Fixing()
    {
        //Find the work option leg
        this.FindWorkOptionLeg();
        
        //Check Barriers
        this.CheckBarriers();

        //Rebate Barriers
        if(this.RebateBarriers())
        {
            //Fixing working Option Leg
            this.FixingOptionLeg();

            //Check Triggers
            this.CheckTriggers();
        }
        else
        {
            //Check Triggers
            this.CheckTriggers();
        }
    }
}
```

* Python
```
from abc import ABC, abstractmethod

class ProductFixingTemplate(ABC):
    @abstractmethod
    def findWorkOptionLeg(self):
        """找出Working Option Leg"""
        pass

    @abstractmethod
    def checkBarriers(self):
        """檢查是否已經觸及生效/失效障礙"""
        pass
    
    @abstractmethod
    def rebateBarriers(self):
        """Return 是否繼續比價
        由檢核障礙結果做Rebate process
        """
        pass

    @abstractmethod
    def fixingOptionLeg(self):
        """計算每個部位的PayOff及交割結果"""
        pass

    @abstractmethod
    def checkTriggers(self):
        """檢核Triggers"""
        pass

    def fixing(self):
        """開始比價"""
        #Find the work option leg
        self.findWorkOptionLeg()
            
        #Check Barriers
        self.checkBarriers()

        #Rebate Barriers
        if(self.rebateBarriers()):
            self.fixingOptionLeg()
            self.checkTriggers()
        else:
            self.checkTriggers()
```

接下來實作各種產品的比價方法。 
PS. 以下僅列出TRF。

* C#
```
public class TrfFixing : ProductFixingTemplate
{
    protected override void FindWorkOptionLeg()
    {
        Trace.WriteLine("TRF: Find Working Option Leg!");
    }
    protected override void CheckBarriers()
    {
        Trace.WriteLine("TRF: Check barries!");
    }
    protected override bool RebateBarriers()
    {
        Trace.WriteLine("TRF: Rebate barries!");
        return true;
    }

    protected override void FixingOptionLeg()
    {
        Trace.WriteLine("TRF: Fixing Option leg!");
    }

    protected override void CheckTriggers()
    {
        Trace.WriteLine("TRF: Check trigger!");
    }
}
```

* Python
```
class TrfFixing(ProductFixingTemplate):
    def findWorkOptionLeg(self):
        print("TRF: Find Working Option Leg!")

    def checkBarriers(self):
        print("TRF: Check barries!")

    def rebateBarriers(self):
        print("TRF: Rebate barries!")

    def fixingOptionLeg(self):
        print("TRF: Fixing Option leg!")

    def checkTriggers(self):
        print("TRF: Check Trigger!")

```


主程式：

* C#
```
var trfFixing = new TrfFixing();
trfFixing.Fixing();

var dkoFixing = new DkoFixing();
dkoFixing.Fixing();
```

* Pyhton
```
trfFixing = TrfFixing()
trfFixing.fixing()

dkoFixing = DkoFixing()
dkoFixing.fixing()
```

執行結果：

*TRF: Find Working Option Leg!*
*TRF: Check barries!*
*TRF: Rebate barries!*
*TRF: Check Trigger!*

*DKO: Find Working Option Leg!*
*DKO: Check barries!*
*DKO: Rebate barries!*
*DKO: No trigger...*


> 樣板方法的優缺點如下：<br>
>
> 1. 優點：符合OCP，易於維護<br>
> 2. 缺點：流程(步驟)寫在父類別，但是邏輯寫在子類別，造成程式碼不易閱讀<br>



## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Template)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtTemplate.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Template)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Template/UtTemplate.py)

