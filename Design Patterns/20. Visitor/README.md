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
1. 既有的優惠條件會不會改變?
2. 會不會未來再新增其他商品的優惠？ 

Lily:<br>
你說的沒錯，唯一不變的就是"變"。 
所以我們得把這些優惠的條件和算法轉換成[策略模式(Strategy)](https://ithelp.ithome.com.tw/articles/10192935)；這個可以解決第一個問題。
第二個問題，我們得把相同優惠策略的商品放在一個抽象的集合(或容器)，結帳時，把在相同集合的不同商品採用一樣的優惠策略計算最後的價錢!

JB:<br>
聽起來好像將某一個集合裡面的元素，讓他們跑同一個策略？

Lily:<br>
沒錯! 這種行為(Behavioral design patterns)叫做**Visitor訪問者模式**!

## 定義

> 表示要在結構裡面的元素執行的操作。訪問者(Visitor)可以讓你定義一個新的操作讓這些元素使用，而不用改變元素類別。 


### UML

![](https://1.bp.blogspot.com/--tdoVkMr2fA/WlF3dnHTYqI/AAAAAAAAFqg/mQkOQrR5RRMHbxT1Q75xahHcCA1mE0WAwCLcBGAs/s1600/Visitor.png)


## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Visitor)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtChainOfResposibility.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Visitor)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Visitor/UtVisitor.py)


