# Decorator 裝飾者模式

## 需求描述

Amy(PO):
> As a 物流部秘書<br>
> I want 報價單系統可以在標準運費上加上其他服務費：加點/假日運送/延遲費"並費用最大化<br>
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
- 加點：加收總價*10%
- 假日運送：總價*20%
- 延遲：N(小時)*NTD$500

我們必須抽象化標準和附加的費用類別，如果用繼承的方式，附加服務費用類別便會相依於標準運費類別。
想想看，所有的費用計算類別都有相同的行為嗎？

Hachi:<br>
當然是的，他們的行為就是計費(微笑)。
我想你指的是讓所有費用計算類別繼承相同的抽象類別來實作計費方法，對嗎？

Lily:<br>
是的，接下來我們來看看我們計算附加服務費用需要哪些資訊？

Hachi:<br>
加點服務和假日運送需要知道總價...延遲費需要知道延遲了幾小時...
我懂了! 我們必須將標準計費類別作為一個參數傳到加收的服務計費類別，讓總價可以被計算出來再算其他額外費用。

Lily:<br>
沒錯! 使用既有類別讓他們有新的能力是裝飾者模式(Decorator)的特性。 讓我們來看怎麼實做吧!


## 定義

> 裝飾者模式可在不繼承原有類別情況下，對原類別加強或新增功能。

在這個計費模組的需求，我們先建立一個存放計費相關欄位的Model:

* C#
```
public class Transport
{
    /// 運送點
    public string Place { get; set; }
    /// 里程
    public int Miles { get; set; }
    /// 加點數
    public int ExtraPlaceCnt { get; set; }
    /// 假日運送
    public bool IsHoliday { get; set; }
    /// 延誤時數
    public int DelayHours { get; set; } = 0;
}
```

* Python
```
class Transport:
    def __init__(self, place="", miles=0, extraPlaceCnt=0, isHoliday=False, delayHours =0 ):
        self.place = place #運送點
        self.miles = miles #里程
        self.extraPlaceCnt = extraPlaceCnt #加點數
        self.isHoliday = isHoliday #假日運送
        self.delayHours = delayHours #延誤時數
```


我們建立標準的計費類別如下。

## 被裝飾者(既有類別)

* C#
```
public interface IPricer
{
    string Customer { get; set; }
    string Receiver { get; set; }
    string Freight { get; set; }
    
    decimal Price(Transport transport);
}

//里程計費
public class MilePricer : IPricer
{
    public string Customer { get; set; }
    public string Receiver { get; set; }
    public string Freight { get; set; }

    public decimal Price(Transport transport)
    {
        //以里程計算：一公里NTD$30

        var price = transport.Miles*30;
        Trace.WriteLine($"以里程計算(一公里NTD$30) = {price}");
        return price;
    }
}
//運送點計費
public class PlacePricer : IPricer
{
    public string Customer { get; set; }
    public string Receiver { get; set; }
    public string Freight { get; set; }

    public decimal Price(Transport transport)
    {
        //以運送點計算(如台南NTD$5,000、新竹NTD$1,000)
        var price = 0;
        switch (transport.Place)
        {
            case "台南":
                price = 5000;
                break;
            case "新竹":
                price = 1000;
                break;
            default:
                price = 2500;
                break;
        };

        Trace.WriteLine($"以運送點計算 = {price}");
        return price;
    }
}
```

* Python
```
from abc import ABC, abstractmethod
from Models import Transport

class Pricer(ABC):
    def __init__(self, customer="", receiver="", freight=""):
        self.customer = customer
        self.receiver = receiver
        self.freight = freight

    @abstractmethod
    def price(self, transport=Transport):
        """Return Total Price"""
        pass


class MilePricer(Pricer):
    """以里程計費
    """
    def price(self, transport=Transport):
        """Return Total Price
        以里程計算：一公里NTD$30
        """
        price = transport.miles * 30
        print("以里程計算(一公里NTD$30) = {0}".format(price))
        return price


class PlacePricer(Pricer):
    """運送點計費
    """
    def price(self, transport=Transport):
        """Return Total Price
        以里程計算：一公里NTD$30
        """
        price = 2500
        price = {
            '台南': 5000,
            '新竹': 1000,
        }[transport.place]
        print("以運送點計算 = {0}".format(price))
        return price
```

接著我們定義一個Decorator抽象類別，目標：
- 將計費介面(或抽象類別)作為建構子參數傳入Decorator
- 讓下一個步驟的裝飾類別可以實作抽象方法：`Price`(計價)，並在這個方法運用上面傳進來的物件

 C#
```
public abstract class Decorator : IPricer
{
    public string Customer { get; set; }
    public string Receiver { get; set; }
    public string Freight { get; set; }
    public abstract decimal Price(Transport transport);
    protected IPricer stdPricer { get; set; }

    public Decorator(IPricer pricer)
    {
        this.stdPricer = pricer;
        this.Customer = pricer.Customer;
        this.Receiver = pricer.Receiver;
    }
}
```

* Pyhton
```
from abc import ABC, abstractmethod

class Decorator(ABC):
    def __init__(self, stdPricer=Pricer):
        self.customer = stdPricer.customer
        self.receiver = stdPricer.receiver
        self.freight = stdPricer.freight
        self.stdPricer = stdPricer

    @abstractmethod
    def price(self, transport=Transport):
        """Return Total Price"""
        pass
```

有了Decorator的抽象類別，我們可以開始實作其他服務加收的計費類別。

* C#
```
/// 加點服務計費
public class ExtraPlacePricer : Decorator
{
    public ExtraPlacePricer(IPricer pricer) : base(pricer)
    {
    }

    public override decimal Price(Transport transport)
    {
        decimal totalPrice = this.stdPricer.Price(transport);
        decimal servicePrice = 0;
        if (transport.ExtraPlaceCnt > 0)
        {
            servicePrice = totalPrice * (decimal)0.1;
            totalPrice = totalPrice + Math.Floor(servicePrice);
        }
        Trace.WriteLine($"加點服務費用 = {servicePrice}，總費用={totalPrice}");
        return totalPrice;

    }
}

/// 假日運送服務計費
public class HolidayPricer : Decorator
{
    public HolidayPricer(IPricer pricer) : base(pricer)
    {
    }

    public override decimal Price(Transport transport)
    {
        var defaultPrice = this.stdPricer.Price(transport);
        var servicePrice = defaultPrice * (decimal)0.2;
        var totalPrice = defaultPrice + Math.Floor(servicePrice);
        Trace.WriteLine($"假日運送服務費用 = {servicePrice}，總費用={totalPrice}");
        return totalPrice;

    }
}

/// 延遲計費
public class DelayPricer : Decorator
{
    public DelayPricer(IPricer pricer) : base(pricer)
    {
    }

    public override decimal Price(Transport transport)
    {
        var totalPrice = this.stdPricer.Price(transport);
        var servicePrice = transport.DelayHours * 500;
        totalPrice +=  (decimal)servicePrice;
        Trace.WriteLine($"延遲費用 = {servicePrice}，總費用={totalPrice}");
        return totalPrice;

    }
}
```

* Python
```
class ExtraPlacePricer(Decorator):
    """加點服務計費
    """

    def __init__(self, stdPricer=Pricer):
        super().__init__(stdPricer)

    def price(self, transport=Transport):
        """Return Total Price"""
        totalPrice = self.stdPricer.price(transport)
        servicePrice = 0
        if (transport.extraPlaceCnt > 0):
            servicePrice = Decimal(totalPrice * 0.1)
            totalPrice = totalPrice + math.floor(servicePrice)

        print("加點服務費用 = {0}，總費用={1}".format(servicePrice, totalPrice))
        return totalPrice


class HolidayPricer(Decorator):
    """假日運送計費
    """

    def __init__(self, stdPricer=Pricer):
        super().__init__(stdPricer)

    def price(self, transport=Transport):
        """Return Total Price"""
        defaultPrice = self.stdPricer.price(transport)
        servicePrice = Decimal(defaultPrice * 0.2)
        totalPrice = defaultPrice + math.floor(servicePrice)
        print("假日運送服務費用 = {0}，總費用={1}".format(servicePrice, totalPrice))
        return totalPrice


class DelayPricer(Decorator):
    """延遲計費
    """

    def __init__(self, stdPricer=Pricer):
        super().__init__(stdPricer)

    def price(self, transport=Transport):
        """Return Total Price"""
        defaultPrice = self.stdPricer.price(transport)
        servicePrice = transport.delayHours * 500
        totalPrice = defaultPrice + math.floor(servicePrice)
        print("延遲費用 = {0}，總費用={1}".format(servicePrice, totalPrice))
        return totalPrice
```


我們來看主程式怎麼使用裝飾者模式來在標準運費下，多收其他服務費。

* C#
```
/*
* 標準運費：以里程計
* 其他費用：加點和延遲費
*/

var transport = new Transport
{
    Miles = 200,
    Place = "台南",
    ExtraPlaceCnt = 1,
    IsHoliday = false,
    DelayHours = 3
};

IPricer stdPricer = new MilePricer()
{
    Customer = "莉亞公主",
    Receiver = "反抗軍",
    Freight = "死星建造圖"
};

IPricer extraPlacePricer = new ExtraPlacePricer(stdPricer);
IPricer delayPricer = new DelayPricer(extraPlacePricer);

delayPricer.Price(transport);
```

執行結果：
*以里程計算(一公里NTD$30) = 6000*
*加點服務費用 = 600.0，總費用=6600*
*延遲費用 = 1500，總費用=8100*



* Python
```
"""
標準運費：以地點計
其他費用：加點和假日運送
"""

transport = Transport(
    miles=50,
    place="新竹",
    extraPlaceCnt=1,
    isHoliday=True,
    delayHours=0
)

stdPricer = PlacePricer(
    customer="莉亞公主",
    receiver="老路克天行者",
    freight="藍色光劍"
)

extraPlacePricer = ExtraPlacePricer(stdPricer)
holidayPricer = HolidayPricer(extraPlacePricer)

holidayPricer.price(transport)
```

執行結果：
*以運送點計算 = 1000*
*加點服務費用 = 100，總費用=1100*
*假日運送服務費用 = 220，總費用=1320*



更多範例可以在以下Sample Codes的單元測試找到唷! 


## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Decorator)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtDecorator.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Decorator)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Decorator/UtDecorator.py)
