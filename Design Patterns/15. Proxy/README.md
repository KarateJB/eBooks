# Proxy 代理模式

## 需求描述

Amy(PO):
> As a 物流部秘書<br>
> I want 報價單系統可以在其他服務費加上更多彈性：<br>
> - 加點: 若單趟載超過兩個點，第三個點開始每加一點加收總價*15%
> - 延遲費: 超過兩小時後的時間，改為每小時NTD$1,000<br>
> So that 業務可在大單採原來之計價，但小單則採新制<br>


## 思考設計

JB:<br>
延續[Day13.Decorator 裝飾者模式](https://ithelp.ithome.com.tw/articles/10195207)的需求，
我們只要再建立幾個實作`Decorator`的計費類別就可以了吧!?

Lily:<br>
等等，再思考一下。我們在裝飾者模式中使用這幾個其他服務費的類別時，動態注入了什麼？

JB:<br> 
計費抽象類別(`IPricer`)! 通常是指定哪一個標準計費和其他服務計費。

Lily:<br>
是的，因為我們要動態裝飾，或者說加強這些注入類別的計費能力。
但是這個新需求並不需要注入一個`IPricer`類別，因為我們要加強的是某個**特定類別**的計費能力。
例如，需求之一，*加點: 若單趟載超過兩個點，第三個點開始每加一點加收總價*15%*，只會擴充`ExtraPlacePricer`(加點計費類別)的計費能力。

JB:<br>
聽起來像是裝飾者模式(Decorator)採用了聚合(Aggregation)，而代理模式(Proxy)則是屬於組合(Composition)關係。

Lily<br>:
是的! 讓我們開始動工吧!


## 定義

> 提供一個代理類別，透過這個代理去操作原有的類別。([WIKI](https://en.wikipedia.org/wiki/Proxy_pattern))


我們延續[Day13.Decorator 裝飾者模式](https://ithelp.ithome.com.tw/articles/10195207)的程式碼，
依需求先建立兩個Proxy類別：

* C#
```
///加點服務計費代理類別
public class ExtraPlacePricerProxy : IPricer
{
    public string Customer { get; set; }
    public string Receiver { get; set; }
    public string Freight { get; set; }

    private IPricer _extraPlacePricer = null;

    public ExtraPlacePricerProxy()
    {
        this._extraPlacePricer = new ExtraPlacePricer();
    }
    public decimal Price(Transport transport)
    {
        /* Pseudo codes 
        if(...)
          this._extraPlacePricer.Price();
        else
          do other pricing logics.
        */
    }
}

///延遲計費代理類別
public class DelayPricerProxy : IPricer
{
    public string Customer { get; set; }
    public string Receiver { get; set; }
    public string Freight { get; set; }
    private IPricer _delayPricer = null;

    public DelayPricerProxy()
    {
        this._delayPricer = new DelayPricer();
    }
    public decimal Price(Transport transport)
    {
        /* Pseudo codes 
        if(...)
          this._delayPricer.Price();
        else
          do other pricing logics.
        */
    }
}
```

* Python
```
```

以上是Proxy的標準用法，但是因為我們延續了[Day13.Decorator 裝飾者模式](https://ithelp.ithome.com.tw/articles/10195207)的需求和程式碼，
而不管是組合`ExtraPlacePricer`或是`DelayPricer`，這些原有的類別建構子都需要傳入`IPricer`(C#)或`Pricer`(Python)。

所以實際上我們的程式碼會更新如下 (僅列出延遲計費代理類別)。

> 再次強調以下代理類別建構子的參數是為了[Decorator](https://ithelp.ithome.com.tw/articles/10195207)，不要搞混囉!

* C#
 ```
 public class DelayPricerProxy : IPricer
{
    public string Customer { get; set; }
    public string Receiver { get; set; }
    public string Freight { get; set; }
    private IPricer _delayPricer = null;
    private readonly int MAX_DELAY_HOURS = 2;

    public DelayPricerProxy(IPricer pricer)
    {
        this._delayPricer = new DelayPricer(pricer);
    }
    public decimal Price(Transport transport)
    {
        decimal totalPrice = 0;
        decimal servicePrice = 0;
        var exceedMaxDelayHours = 0;
        
        if(transport.DelayHours<=MAX_DELAY_HOURS) //未超過
        {
            totalPrice = this._delayPricer.Price(transport);
        }
        else
        {
            exceedMaxDelayHours = transport.DelayHours - MAX_DELAY_HOURS;//計算超過的小時
            transport.DelayHours = MAX_DELAY_HOURS;
            totalPrice = this._delayPricer.Price(transport);
        }
        
        servicePrice = exceedMaxDelayHours * 1000;
        totalPrice += servicePrice;
        Trace.WriteLine($"延遲(超過兩小時)服務費用 = {servicePrice}，總費用={totalPrice}");
        return totalPrice;
    }
}
 ```

 * Python
 ```
 ```

當我們完成了Proxy(代理)類別，
還記得我們原本在[Day13.Decorator 裝飾者模式](https://ithelp.ithome.com.tw/articles/10195207)的主程式可以撰寫如下來計算加上延遲費的總運費。

* C#
```
var transport = new Transport
{
    Miles = 200,
    Place = "死星",
    ExtraPlaceCnt = 0,
    IsHoliday = false,
    DelayHours = 5
};

IPricer stdPricer = new MilePricer()
{
    Customer = "達斯維達",
    Receiver = "白布丁",
    Freight = "路克天行者"
};

IPricer delayPricer = new DelayPricer(stdPricer);
var totalPrice = delayPricer.Price(transport);
```

* Python
```
```

現在我們可以利用上面建立的代理直接抽換，來對某客戶的託運單採用超過兩點即收取額外費用的計費方式。

* C#
```
IPricer delayPricer = new DelayPricerProxy(stdPricer);
var totalPrice = delayPricer.Price(transport);
```

* Python
```
```

- 原本的運費計算方式結果：
*以里程計算(一公里NTD$30) = 6000*
*延遲費用 = 2500，總費用=8500*

- 新的運費計算方式結果：
*以里程計算(一公里NTD$30) = 6000*
*延遲費用 = 1000，總費用=7000*
*延遲(超過兩小時)服務費用 = 3000，總費用=10000*



接下來我們要討論Proxy和Adapter(Object way)的不同點和使用時機，我們先看一下UML。

* Adapter (Object adapter)
![](https://4.bp.blogspot.com/-eogt1tuBZwM/WkxJORFkgrI/AAAAAAAAFoc/4M-FUL3YdTYwnc6I9ysgUJavOKQG7A7IACLcBGAs/s1600/Object%2BAdapter.png)

1. 特性：
   - 提供不同的介面，而主程式依賴於實體Adapter類別
   - 當套用適配器模式(Adapter)時，主程式使用的介面會改變

2. 使用時機：
   - 在不改變原始介面下，提供不同的介面讓主程式可以使用原介面的功能
   - 目的在於適應，不改變原功能的目的

* Proxy
![](https://2.bp.blogspot.com/-GzNQedrOXpo/WkxJPzmdr6I/AAAAAAAAFog/qsAyDce6a08vp6_GpBFDmUUFEie3MHrQACLcBGAs/s1600/Proxy.png)

1. 特性：
   - 提供相同的介面，讓主程式依賴於抽象
   - 主程式使用的介面和方法不會改變

2. 使用時機：
   - 在不改變主程式的行為下，讓代理完成其它實作類別的功能
   - 目的在於控制，可加強或改變原功能的目的



## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Flyweight)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtFlyweight.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Flyweight)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Flyweight/UtFlyweight.py)
