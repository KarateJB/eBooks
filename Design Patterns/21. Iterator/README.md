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
我們的確是完成了開發，而且Amy測試OK... 所以我們這個iteration的所有backlog都已經完成了! 所以我們在明天的iteration review會議之前還有一些時間可以藉由重構來學習Iterator(迭代器模式)這個設計模式。

JB:<br>
Iterator...我好像在哪裡看過...?

Lily:<br>
Iterator(迭代器)提供逐一訪問集合(容器)內部元素的方法。
我們在C#常使用的`System.Array`、`System.Collections`或是`System.Collections.Generic`命名空間下，無論是`Array`,`IDictionay`,`IList`...都有實作`IEnumerable`介面，所以可以透過`GetEnumerator()`這個方法來取得迭代器，讓我們可以透過`foreach`來訪問這些集合(容器)的元素。

JB:<br>
那我們要如何利用Iterator(迭代器模式)來重構這個需求呢？

Lily:<br>

```
IObjectStructure checkout = new ObjectStructure();
//Attach the elements into ObjectStructure
this.Shopcart.Where(item=>item.ProductType.Equals(ProductTypeEnum.Book)).ToList().ForEach(item => {
    checkout.Attach(item);
});
```

我們要自訂可以過濾商品種類的迭代器，將特定種類的商品(例如...書)放入ObjectStructure：
```
IObjectStructure checkout = new ObjectStructure();
var iterator = new ConcreteIterator(ProductTypeEnum.Book);
while (!iterator.IsFinal)
{
    var elm = this._iterator.Next();
    checkout.Add(elm);
}
```


現在，無論是List或Set，無論真正的實作是ArrayList、LinkedList、HashSet...，都可以使用這個foreach方法來 顯示內部所收集的物件。

這 是Iterator模式的實現，不同的物件內部在組織資料方式並不相同（陣列？鏈結？雜湊？），所提供的公開存取介面也不一樣，為了有一致的方式來逐一取 得物件內部的資料，您可以讓一個Iterator於物件內部進行收集，之後傳回Iterator物件，透過該Iterator來逐一取得物件內部資料。


## 定義

> 迭代器提供一種方法來逐一訪問對象的元素，而不暴露其結構。




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
