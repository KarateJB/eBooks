# Iterator 迭代器模式

## 需求描述

Amy(PO):
> As a 電商老闆<br>
> I want 舉辦行銷活動，購物車結帳時：<br>
> 1. 書籍雜誌：會員相同類別10本以上八折優惠
> 2. 生活用品：會員相同品項$1,000以上九折優惠<br> 
> So that 提高網站轉換率及營收<br>


## 思考設計

JB:<br>
疑!? 我以為這個Backlog已經在昨天: [Day20.Visitor 訪問者模式](https://ithelp.ithome.com.tw/articles/10196407)完成了? 

Lily:<br>
我們的確是完成了開發，而且Amy測試OK... 所以我們這個iteration的所有backlog都已經完成了! 在明天的iteration review會議之前還有一些時間可以藉由重構來學習Iterator(迭代器模式)這個設計模式。

JB:<br>
Iterator...我好像在哪裡看過...?

Lily:<br>
Iterator(迭代器)提供逐一訪問集合(容器)內部元素的方法。
我們在C#常使用的`System.Array`、`System.Collections`或是`System.Collections.Generic`命名空間下，無論是`Array`,`IDictionay`,`IList`...都有實作`IEnumerable`介面，所以可以透過`GetEnumerator()`這個方法來取得迭代器，讓我們可以搭配`foreach`來訪問這些集合(容器)的元素。

JB:<br>
那我們要如何利用Iterator(迭代器模式)來重構這個需求呢？

Lily:<br>
原本的主程式是從購物車篩選特定種類的商品(例如...書籍)，再放到訪問者模式的ObjectStructure：
```
IObjectStructure checkout = new ObjectStructure();
//Attach the elements into ObjectStructure
this.Shopcart.Where(item=>item.ProductType.Equals(ProductTypeEnum.Book)).ToList().ForEach(item => {
    checkout.Attach(item);
});
```

我們要自訂可以過濾商品種類的迭代器，將特定種類的商品放入ObjectStructure：
```
IObjectStructure checkout = new ObjectStructure();
var iterator = new ConcreteIterator(ProductTypeEnum.Book);
while (!iterator.IsFinal)
{
    var elm = this._iterator.Next();
    checkout.Add(elm);
}
```

另外，在迭代器模式中定義了封裝了Iterator的介面：Aggregate
所以我們最後的程式碼如下：
```
IObjectStructure checkout = new ObjectStructure();
Aggregate aggregate = new ConcreteAggregate(ProductTypeEnum.Book);
checkout.Elements = aggregate.GetAll();
```

JB:<br>
看來我們已經有單元測試程式碼了，
讓我們開始Red-Green-Refactor吧!



## 定義

> 迭代器提供一種方法來逐一訪問對象的元素，而不暴露其結構。 ([https://en.wikipedia.org/wiki/Iterator_pattern]())


### UML

![](http://1.bp.blogspot.com/-mqjKw8354ws/UpMiWO14EvI/AAAAAAAAA0Q/HdIMupnBDJo/s1600/Iterator001.jpg)

1. Iterator : 提供存放集合，以及操作、尋覽集合的方法
2. Aggregate：將Iterator封裝給Client使用的介面
3. ConcreteAggregate 依賴於 ConcreteIterator，ConcreteIterator則關聯ConcreteIterator


### Iterator

注意我們刻意在Iterator的建構子帶入參數：`ProductTypeEnum prodType`
目的在於尋覽內部元素時，跳過不屬於該商品種類的元素。

* C#
```csharp
public abstract class Iterator
{
    public abstract IElement Current();
    public abstract IElement First();
    public abstract IElement Next();
    public abstract bool IsFinal {get;}
    public abstract void Add(IElement elm); 
}

public class ConcreteIterator : Iterator
{
    private Aggregate _aggregate = null;
    private ProductTypeEnum _prodType;
    private int _pointer = 0;
    private List<IElement> _collection = new List<IElement>();

    public override bool IsFinal
    {
        get
        {
            if (this._pointer >= (this._collection.Count - 1))
                return true;
            else
                return false;
        }
    }

    public ConcreteIterator(Aggregate aggregate, ProductTypeEnum prodType)
    {
        this._aggregate = aggregate;
        this._prodType = prodType;
    }

    public override IElement Current()
    {
        if (this._pointer >= this._collection.Count)
        {
            throw new IndexOutOfRangeException();
        }
        else
        {
            var elm = this._collection[this._pointer];
            while (!elm.ProductType.Equals(this._prodType))
            {
                this._pointer++;
                if (this._pointer >= this._collection.Count)
                    return null;
                else
                    elm = this._collection[this._pointer];
            }

            return this._collection[this._pointer];
        }
    }

    public override IElement First()
    {
        this._pointer = 0;
        return this.Current();
    }

    public override IElement Next()
    {
        this._pointer++;
        return this.Current();
    }

    public override void Add(IElement elm)
    {
        this._collection.Add(elm);
    }
}
```

* Python
```python
from abc import ABC, abstractmethod
from Elements import Element, ProductTypeEnum
import Aggregate

class Iterator(ABC):
    @abstractmethod
    def current(self) -> Element:
        pass

    @abstractmethod
    def first(self) -> Element:
        pass
    
    @abstractmethod    
    def next(self) -> Element:
        pass

    @abstractmethod
    def isFinal(self) -> bool:
        pass

    @abstractmethod
    def add(self, elm:Element):
        pass



class ConcreteIterator(Iterator):

    def __init__(self, aggregate: Aggregate, prodType: ProductTypeEnum):
        self.aggregate = aggregate
        self.prodType = prodType
        self.pointer = 0
        self.collection = []

    def current(self) -> Element:
        if (self.pointer >= len(self.collection)):
                raise Exception("IndexOutOfRangeException:pointer")
        else:
            elm = self.collection[self.pointer]
            while (not elm.productType==self.prodType):
                self.pointer = self.pointer + 1
                if (self.pointer >= len(self.collection)):
                    return None
                else:
                    elm = self.collection[self.pointer]

            return self.collection[self.pointer]

    def first(self) -> Element:
        self.pointer = 0
        return self.current()
    
    def next(self) -> Element:
        self.pointer = self.pointer +1
        return self.current()
        
    def isFinal(self) -> bool:
        if (self.pointer >= (len(self.collection) - 1)):
            return True
        else:
            return False

    def add(self, elm:Element):
        self.collection.append(elm)
```


### Aggregate

* C#
```csharp
public abstract class Aggregate
{
    public abstract Iterator GetIterator();
    public abstract List<IElement> GetAll();
    public abstract void Add(IElement elm);
}

public class ConcreteAggregate : Aggregate
{
    private Iterator _iterator;

    public ConcreteAggregate(ProductTypeEnum prodType)
    {
        this._iterator = new ConcreteIterator(this, prodType);
    }
    public override void Add(IElement elm)
    {
        this._iterator.Add(elm);
    }

    public override Iterator GetIterator()
    {
        return this._iterator;
    }

    public override List<IElement> GetAll()
    {
        List<IElement> list = new List<IElement>();
        list.Add(this._iterator.First());

        while (!this._iterator.IsFinal)
        {
            var elm = this._iterator.Next();
            if (elm != null)
                list.Add(elm);
        }
        return list;
    }
}
```

* Python
```python
import Iterator
from abc import ABC, abstractmethod
from Elements import Element, ProductTypeEnum


class Aggregate(ABC):

    @abstractmethod
    def getIterator(self) -> Iterator.Iterator:
        pass

    @abstractmethod    
    def getAll(self):
        pass

    @abstractmethod
    def add(self, elm:Element):
        pass
        

class ConcreteAggregate(Aggregate):
    
    def __init__(self, prodType:ProductTypeEnum):
        self.iterator = Iterator.ConcreteIterator(self, prodType)

    def add(self,elm:Element):
        self.iterator.add(elm)

    def getIterator(self) -> Iterator.Iterator:
        return self.iterator

    def getAll(self):
        list = []
        list.append(self.iterator.first())

        while (not self.iterator.isFinal()):
            elm = self.iterator.next()
            if (elm != None):
                list.append(elm)

        return list
```


--

透過以上實作的迭代器，我們可以將[Day20.Visitor 訪問者模式](https://ithelp.ithome.com.tw/articles/10196407)的主程式改寫如下(執行結果不變)：

* C#
```csharp
private List<IElement> Shopcart = null;
this.Shopcart = new List<IElement>(){
    //Some products..
};

IObjectStructure checkout = new ObjectStructure();
checkout.Elements = aggregate.GetAll();

//Accept all the elements and execute the strategy from certain Visitor 
checkout.Accept(new VisitorDiscount4Count());
```



* Python
```python
_shopcart = [
    #Some products..
]

aggregate = ConcreteAggregate(Elements.ProductTypeEnum.Book)
for prod in _shopcart:
    aggregate.add(prod)

checkout = ObjectStructure()
# Attach the elements into ObjectStructure
for item in aggregate.getAll():
    checkout.attach(item)

# Accept all the elements and execute the strategy from certain Visitor
checkout.accept(VisitorDiscount4Count())
```




## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Iterator)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtIterator.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Iterator)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Iterator/UtIterator.py)

## Reference
- [如何：使用 foreach 存取集合類別 (C# 程式設計手冊)](https://docs.microsoft.com/zh-tw/dotnet/csharp/programming-guide/classes-and-structs/how-to-access-a-collection-class-with-foreach)
- [C# IEnumerator, IEnumerable, and Yield](http://dev.twsiyuan.com/2016/03/csharp-ienumerable-ienumerator-and-yield-return.html)
