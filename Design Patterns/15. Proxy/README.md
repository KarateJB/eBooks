# Proxy 代理模式

## 需求描述

Amy(PO):
> As a 物流部秘書<br>
> I want 報價單系統可以在其他服務費加上更多彈性：<br>
> - 加點: 若單趟載超過兩個點，改加收總價*15%
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
例如，需求之一，*加點: 若單趟載超過兩個點，改加收總價*15%*，只會擴充`ExtraPlacePricer`(加點計費類別)的計費能力。

JB:<br>
聽起來像是裝飾者模式(Decorator)採用了聚合(Aggregation)，而代理模式(Proxy)則是屬於組合(Composition)關係。

Lily<br>:
是的! 讓我們開始動工吧!


## 定義

> 提供一個代理類別，透過這個代理去操作原有的類別。([WIKI](https://en.wikipedia.org/wiki/Proxy_pattern))


* C#
```
public  class CacheFlyweights
{
    private  IDictionary<string, object> _store = null;

    public CacheFlyweights()
    {
        this._store = new Dictionary<string, object>();
        this.init(); //Initialize with Factory
    }

    private void init()
    {
        var team = ContentFactory.CreateTeam();
        var crews = ContentFactory.CreateCrews();

        this._store.Add("Team", team);
        this._store.Add("Crews", crews);
    }

    public void Add<T>(string key, T value)
    {
        this._store.Add(key, value);
    }
    public void Update<T>(string key, T value)
    {
        this._store[key] = value;
    }
    public void Remove(string key)
    {
        this._store.Remove(key);
    }
    public T Get<T>(string key)
    {
        var value = this._store[key];
        return (T)value;
    }
}
```

* Python
```
class CacheFlyweights:    
    def __init__(self):
        self.store = {}
        self.store["Team"] = ContentFactory.CreateTeam()
        self.store["Crews"] = ContentFactory.CreateCrews()
        
    def add(self, key, value):
        self.store[key]=value
    
    def update(self, key, value):
        self.store[key]=value


    def remove(self, key=""):
        self.store.pop(key)

    def get(self, key=""):
        return self.store[key]    

```

上面我們在Flyweight管理類別的建構子就利用了工廠來負責提供資料，我們來看主程式如何加入及使用這些Flyweight物件。

* C#
```
//Initialize flyweight objects into CacheFlyweight 
var cacheFw = new CacheFlyweights();
var newCache = ContentFactory.CreateProducts();
cacheFw.Add("Products", newCache);

//Get the cached data
var crews = cacheFw.Get<List<Content>>("Crews");
crews.ForEach( c => Trace.WriteLine($"{c.Id} : {c.Value}"));            
var products = cacheFw.Get<List<Content>>("Products");
products.ForEach( c => Trace.WriteLine($"{c.Id} : {c.Value}"));
```

* Python
```
#Initialize flyweight objects into CacheFlyweight 
cacheFw = CacheFlyweights()
newCache = ContentFactory.CreateProducts()
cacheFw.add("Products", newCache)

#Get the cached data
crews = cacheFw.get("Crews")
for item in crews:
    print("{0} : {1}".format(item.id, item.value))

prods = cacheFw.get("Products")
for item in prods:
    print("{0} : {1}".format(item.id, item.value))
```

執行結果：

*Product Owner : Amy*
*Scrum master : JB*
*Principle developer : Lily*
*Senior developer : Hachi*
*1 : iThome AI智能服務應用大賽 (2017)*
*2 : iT邦幫忙鐵人賽完賽-Learning ASP.NET core + Angular2 (2017)*

## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Flyweight)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtFlyweight.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Flyweight)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Flyweight/UtFlyweight.py)
