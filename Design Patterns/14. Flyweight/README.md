# Flyweight 享元模式

## 需求描述

Amy(PO):
> As a 公司官網管理者<br>
> I want 產品頁面可以更快速的顯示(<=2.0Sec>)<br>
> So that 瀏覽者有好的使用者體驗<br>


## 思考設計

JB<br>:
休假回來第一天好累阿! 恩，這個User Story拆成幾項工作了，我們負責的是哪一部分？

Hachi:<br> 
在後端提供Cache的機制，當我們收到Http request的時候就判斷要回傳哪種已暫存的資料。

JB<br>:
好的，那我們來建造一個類別可以儲存和提供共用的Cache資料... 疑? 我們在[Day3.Prototype 原型模式](https://ithelp.ithome.com.tw/articles/10194600)有用Prototype Store做一樣的事情耶!  

Lily<br>:
沒錯! 概念是相同的：目的都在於共享資料。 在設計模式稱為享元模式(Flyweight)。
只是這一次的需求不需要去複製任何資料，我們只要單純提供一個Cache Store就可以了!


## 定義

> 享元模式可在儲存和取出共用的物件、狀態等資訊。目的在於減少頻繁建立物件所消耗的資源。


* C#
```
public class CacheFlyweight
{
}
```

* Python
```
```



## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Decorator)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtDecorator.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Decorator)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Decorator/UtDecorator.py)
