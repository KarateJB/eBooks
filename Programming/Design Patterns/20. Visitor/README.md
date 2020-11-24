# Visitor 訪問者模式

## 需求描述

Amy(PO):
> As a 電商老闆<br>
> I want 舉辦行銷活動，購物車結帳時：<br>
> 1. 書籍雜誌：會員相同類別10本以上八折優惠
> 2. 生活用品：會員相同品項$1,000以上九折優惠<br> 
> So that 提高網站轉換率及營收<br>


## 思考設計

JB:<br> 
這個需求看起來很簡單，但是仔細想了一下，發現要寫好程式很困難耶! 我們得考慮：
- 既有的優惠條件會不會改變?
- 會不會未來再新增其他商品的優惠？ 

Lily:<br>
你說的沒錯，唯一不變的就是"變"。 
所以我們得把這些折扣的算法轉換成[策略模式(Strategy)](https://ithelp.ithome.com.tw/articles/10192935)；這個可以解決第一個問題。
第二個問題，我們得把相同優惠策略的商品放在一個抽象的容器，結帳時，把在相同集合的不同商品採用一樣的優惠策略計算最後的價錢，未來如果有其他商品需要用到現成的優惠，就可以把它也丟到這個抽象的容器即可!

JB:<br>
聽起來好像將某一個容器裡面的所有元素，讓他們跑同一個策略？

Lily:<br>
沒錯! 這種行為(Behavioral design patterns)叫做**Visitor訪問者模式**!

## 定義

> 表示要在結構裡面的元素執行的操作。訪問者(Visitor)可以讓你定義一個新的操作讓這些元素使用，而不用改變元素類別。 ([WIKI](https://en.wikipedia.org/wiki/Visitor_pattern))


簡單的來說! 訪問者模式(Visitor)是策略模式(Strategy)的延伸。
在策略模式中，我們只讓**一個對象**執行注入的策略。
但在訪問者模式，我們可以讓**很多對象**依序執行注入的策略。
先有這個概念之後，我們來看例子，最後再討論兩者使用的時機。


### UML

![](https://1.bp.blogspot.com/--tdoVkMr2fA/WlF3dnHTYqI/AAAAAAAAFqg/mQkOQrR5RRMHbxT1Q75xahHcCA1mE0WAwCLcBGAs/s1600/Visitor.png)


1. Element : 可存放要處理的物件或參數，再由外部帶入一個Visitor。 處理的方法是實作在Visitor。
2. ObjectStructure：存放Element集合，提供新增、刪除元素，以及讓Client呼叫處理元素的方法。
3. Visitor：提供方法注入於Element中做處理。


### Visitor

1. Visitor(訪問者)須提供一個訪問的方法。
2. Visitor其實就是策略(Strategy)，我們稍後在Element就會帶入這個Visitor(抽象的策略類別)。

我們在這個行銷活動，要建立兩個商品計算折扣後價格的策略，分別為：
- 該項商品數量10以上八折優惠
- 該項商品總價$1,000以上九折優惠

PS. 建立Visitor時只考慮**計算的公式**，而先不考慮它適用於哪些商品。


* C#
```
public abstract class Visitor
{
        public abstract void Visit(IElement element);
}

/// 該項商品數量10以上八折優惠
public class VisitorDiscount4Count : Visitor
{
    public override void Visit(IElement elm)
    {
        if(elm.Amount>=10)
        {
            elm.TotalPrice = elm.UnitPrice * elm.Amount * 0.8M;
            Trace.WriteLine($"(折扣!){elm.Name}: 單價${elm.UnitPrice}, 數量{elm.Amount}, 20% off, 總價格={elm.TotalPrice} ");
        }
        else
        {
            elm.TotalPrice = elm.UnitPrice * elm.Amount;
            Trace.WriteLine($"{elm.Name}: 單價${elm.UnitPrice}, 數量{elm.Amount}, 總價格={elm.TotalPrice} ");
        }
    }
}

/// 該項商品總價$1,000以上九折優惠
public class VisitorDiscount4TotalPrice : Visitor
{
    public override void Visit(IElement elm)
    {
        var totalPrice =elm.UnitPrice * (decimal)elm.Amount;
        if(totalPrice>1000)
        {
            elm.TotalPrice = totalPrice * 0.9M;
            Trace.WriteLine($"(折扣!){elm.Name}: 單價${elm.UnitPrice}, 數量{elm.Amount}, 10% off, 總價格={elm.TotalPrice} ");
        }
        else
        {
            elm.TotalPrice = totalPrice;
            Trace.WriteLine($"{elm.Name}: 單價${elm.UnitPrice}, 數量{elm.Amount}, 總價格={elm.TotalPrice} ");
        }
    }
}
```

* Python
```
from abc import ABC, abstractmethod
from decimal import Decimal

class Visitor(ABC):
    @abstractmethod
    def visit(self, element=Elements.Element):
        pass

class VisitorDiscount4Count(Visitor):
    """該項商品數量10以上八折優惠"""

    def visit(self, elm=Elements.Element):
        if(elm.amount >= 10):
            elm.totalPrice = elm.unitPrice * Decimal(elm.amount) * Decimal(0.8)
            print("(折扣!){0}: 單價${1}, 數量{2}, 20% off, 總價格={3}".format(
                elm.name, elm.unitPrice, elm.amount, "{0:.2f}".format(elm.totalPrice)))
        else:
            elm.totalPrice = elm.unitPrice * Decimal(elm.amount)
            print("{0}: 單價${1}, 數量{2}, 總價格={3}".format(
                elm.name, elm.unitPrice, elm.amount, "{0:.2f}".format(elm.totalPrice)))


class VisitorDiscount4TotalPrice(Visitor):
    """該項商品總價$1,000以上九折優惠"""

    def visit(self, elm=Elements.Element):

        totalPrice = elm.unitPrice * Decimal(elm.amount)
        if(totalPrice > 1000):
            elm.totalPrice = Decimal(totalPrice) * Decimal(0.9)
            print("(折扣!){0}: 單價${1}, 數量{2}, 10% off, 總價格={3}".format(
                elm.name, elm.unitPrice, elm.amount, "{0:.2f}".format(elm.totalPrice)))
        else:
            elm.totalPrice = totalPrice
            print("{0}: 單價${1}, 數量{2}, 總價格={3}".format(
                elm.name, elm.unitPrice, elm.amount, "{0:.2f}".format(elm.totalPrice)))

```



### Element

在這個例子，Element很明顯的就是我們放在購物車的商品，
其屬性應包含商品名稱、種類、單價、數量以及我們要計算的總價格，以及一個可以讓Visitor執行訪問的方法：`Accept`。

* C#
```
public enum ProductTypeEnum
{
    Book = 1, //書
    Living, //生活用品
    Electronic //電子用品
}

public interface IElement
{
    ProductTypeEnum ProductType { get; set; }
    string Name { get; set; }
    decimal UnitPrice { get; set; } //單價
    int Amount { get; set; } //購買總數
    decimal TotalPrice { get; set; }
    void Accept(Visitor visitor);
}

public class Product : IElement
{
    public ProductTypeEnum ProductType { get; set; }
    public string Name {get;set;} 
    public decimal UnitPrice { get;set; }
    public int Amount { get; set; }
    public decimal TotalPrice {get;set;}
    

    public void Accept(Visitor visitor)
    {
        visitor.Visit(this);
    }
}   
```

* Python
```
from abc import ABC, abstractmethod
from enum import Enum
from decimal import Decimal

class ProductTypeEnum(Enum):
    Book = 1,  # 書
    Living = 2,  # 生活用品
    Electronic = 3  # 電子用品


class Element(ABC):
    def __init__(self, productType:ProductTypeEnum, name="", unitPrice=0, amount=0):
        self.productType = productType
        self.name = name
        self.unitPrice = Decimal(unitPrice)
        self.amount = amount
        self.totalPrice=Decimal(0)

    @abstractmethod
    def accept(self, visitor):
        pass


class Product(Element):
    def __init__(self, productType=ProductTypeEnum, name="", unitPrice=0, amount=0):
        super().__init__(productType, name, unitPrice, amount)

    def accept(self, visitor):
        visitor.visit(self)
```

到這邊已經完成了策略模式! 我們可以在主程式這樣使用它：(以C#為例)

```
IElement elm = new Product { 
     ProductType=ProductTypeEnum.Book, Name="設計模式的解析與活用", UnitPrice=480, Amount=20 };
elm.Accept(new VisitorDiscount4Count());     
```

但是在訪問者模式，我們要利用ObjectStructure這個角色協助一次訪問多個元素。


### ObjectStructure

ObjectStructure的作用：
1. 提供存取Element的介面
2. 接受訪問者，讓訪問者可以訪問多個Element 

* C#
```
public interface IObjectStructure
{
    List<IElement> Elements { get; set; }
    void Attach(IElement element);
    void Detach(IElement element);
    void Accept(Visitor visitor);
}

public class ObjectStructure : IObjectStructure
{
    public List<IElement> Elements { get; set; }

    public ObjectStructure()
    {
        this.Elements = new List<IElement>();
    }
    public void Attach(IElement element)
    {
        this.Elements.Add(element);
    }
    public void Detach(IElement element)
    {
        this.Elements.Remove(element);
    }
    public void Accept(Visitor visitor)
    {
        this.Elements.ForEach(x => x.Accept(visitor));
    }
}
```

* Pyhton
```
import Elements
import Visitors


class ObjectStructure:
    def __init__(self):
        self.elements = []

    def attach(self,element: Elements.Element):
        self.elements.append(element)

    def detach(self,element: Elements.Element):
        self.elements.remove(element)

    def accept(self,visitor: Visitors.Visitor):
        for elm in self.elements:
            elm.accept(visitor)

```

我們來看這個購物車如何透過訪問者模式結帳：

* C#
```
private List<IElement> Shopcart = null;
this.Shopcart = new List<IElement>(){
    new Product { ProductType=ProductTypeEnum.Book, Name="設計模式的解析與活用", UnitPrice=480, Amount=20 },
    new Product { ProductType=ProductTypeEnum.Book, Name="使用者故事對照", UnitPrice=580, Amount=5 }
};

IObjectStructure checkout = new ObjectStructure();

//Attach the elements into ObjectStructure
this.Shopcart.Where(item=>item.ProductType.Equals(ProductTypeEnum.Book)).ToList().ForEach(item => {
    checkout.Attach(item);
});

//Accept all the elements and execute the strategy from certain Visitor 
checkout.Accept(new VisitorDiscount4Count());
```

以上針對購物車裡面的書籍，將其放入ObjectStructure，再統一使用`VisitorDiscount4Count`(該項商品數量10以上八折優惠)訪問。 執行結果：

*(折扣!)設計模式的解析與活用: 單價$480, 數量20, 20% off, 總價格=7680.0*
*使用者故事對照: 單價$580, 數量5, 總價格=2900*


* Python
```
_shopcart = [
            Elements.Product(productType=Elements.ProductTypeEnum.Living,
                             name="吸塵器", unitPrice=2000, amount=2),
            Elements.Product(productType=Elements.ProductTypeEnum.Living,
                             name="毛巾", unitPrice=50, amount=10)
        ]

checkout = ObjectStructure()

# Attach the elements into ObjectStructure
targetProds = [
    x for x in self._shopcart if x.productType == Elements.ProductTypeEnum.Living]
for item in targetProds:
    checkout.attach(item)

# Accept all the elements and execute the strategy from certain Visitor
checkout.accept(VisitorDiscount4TotalPrice())
```

以上針對購物車裡面的生活用品，將其放入ObjectStructure，再統一使用`VisitorDiscount4TotalPrice`(該項商品數該項商品總價$1,000以上九折優惠)訪問。 執行結果：

*(折扣!)吸塵器: 單價$2000, 數量2, 10% off, 總價格=3600.00*
*毛巾: 單價$50, 數量10, 總價格=500.00*


### Visitor vs. Strategy

我們來看了解一下兩者的使用時機：
1. Strategy 是設計來對一個物件 注入不同處理邏輯。
2. Visitor 是設計來對多個物件 注入處理邏輯， 當然也可以對單一個物件注入不同處理邏輯。
3. Strategy 簡單，適用於多數場合。
4. Visitor 本身使用了 Strategy的概念。
5. Visitor 適用於有多個實作類別或是子類別，而且每個類別需要特別的處理邏輯。



## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Visitor)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtVisitor.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Visitor)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Visitor/UtVisitor.py)


## Reference
- [What is the difference between Strategy pattern and Visitor Pattern?](https://stackoverflow.com/questions/8665295/what-is-the-difference-between-strategy-pattern-and-visitor-pattern)
