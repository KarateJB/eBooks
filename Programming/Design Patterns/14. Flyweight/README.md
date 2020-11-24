# Flyweight 享元模式

## 需求描述

Amy(PO):
> As a 公司官網管理者<br>
> I want 產品頁面可以更快速的顯示(<=2.0Sec)<br>
> So that 瀏覽者有好的使用者體驗<br>


## 思考設計

JB<br>:
休假回來第一天好累阿! 恩，這個User Story拆成幾項工作了，我們負責的是哪一部分？

Hachi:<br> 
在後端提供Cache的機制，除了回傳暫存的資料也要能建立及管理這些暫存。

JB<br>:
好的，那我們來建造一個類別可以儲存和提供共用的Cache資料... 疑? 我們在[Day3.Prototype 原型模式](https://ithelp.ithome.com.tw/articles/10194600)有用Prototype Store做一樣的事情耶!  

Lily<br>:
沒錯! 概念是相同的：目的都在於建立一個可存取資料的倉庫。 
我們這次要使用享元模式(Flyweight)，這一次的需求不需要去複製任何資料，我們只要單純提供一個Cache Store就可以了!


## 定義

> 享元模式可在儲存和取出共用的物件、狀態等資訊。目的在於減少頻繁建立物件所消耗的資源。([WIKI](https://en.wikipedia.org/wiki/Flyweight_pattern))


享元模式使用的時機如下：
1. 共享對像會頻繁的建立，而且每次建立需耗費可觀的資源
2. 共享對像適合為獨立且輕量的的小元素，且不會由本身來改變其狀態和資料
3. 提供介面讓外部程式改變其狀態和資料


網站的暫存資料很適合將其作為Flyweight物件存放並共享給整個網站使用，因為暫存資料一般有以下特性：
1. 變動性小
2. 因資料共用性，一般習慣將暫存以小範圍管理之方式建立

注意享元模式(Flyweight)為Structural design pattern而非Creational design pattern，
它通常會搭配工廠模式(Factory)，由工廠提供資料，而Flyweight提供一個共享的結構。


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
