# Bridge 橋接模式

## 需求描述

Amy(PO):
> As a 建立訂單的秘書<br>
> I want 可以在同一介面上依據各供應商、產品和是否急件列印不同格式的訂單<br>
> So that 秘書可以不必因為上述之差異而到處KEY重複的資料<br>


## 思考設計

JB:<br> 
這個User Story我們分成兩個Task了，分別是"前端輸入"和"列印訂單"；我們負責的是後者，至於訂單的來源都已經在資料庫了。
你有什麼看法? 或許可以用策略模式(Strategy)把不同列印的邏輯丟到主程式即可·

Lily: <br>
的確是可行，不過依據需求，訂單除了各家不同還區分產品且還至少分成"一般"和"急件"，
我想可以使用橋接模式(Bridge)來實做這個需求。

JB: <br>
我看過Bridge的定義和說明，它和Strategy的差異在哪裡呢？

Lily:<br>
Strategy屬於行為模式(Behavioral design patterns)。
Bridge屬於結構型模式(Structural design patterns)，它將抽象和實做解耦合，使兩者可獨立的變化。
喔，我們還是來Pair Programming實際用Bridge來作為解決這個問題的結構，然後再加上Strategy處理列印的細節。



## 定義

> 1. 分離Abstraction及Implementor，使兩者可獨立變化。<br>
> 2. 在run time設定Abstraction裡的Implementor<br>
> 3. [WIKI](https://en.wikipedia.org/wiki/Bridge_pattern)


![](https://2.bp.blogspot.com/-mBvP1yuuR_4/WkBoZwHUZlI/AAAAAAAAFnU/esA7xMCFEVQIMXejyemMwVfRS71t1BZsACLcBGAs/s1600/Bridge.png)


以我們這個使用者案例來看，最後執行的結果是：`列印訂單`。
所以依據以下條件對照Bridge：

| <center>抽象化的目標</center> |  <center>對應Bridge的角色</center>  |
|:-----------------------------|:-----------------------------------|
| 哪家供應商 | Abstraction |
| 如何列印 (一般還是急件，哪種產品) | Implementor |


我們先來寫列印(Implementor)的部分，並且先假設每家供應商相同的訂單格式是相同的，只有區分一般/急件。
後面我們再加上策略模式來調整 不同供應商商-相同產品-但格式不同的需求。


* C#
```
public interface IPrinter
{
    void OrderA();
    void OrderB();
}

public class PrinterUsual : IPrinter
{
    public void OrderA()
    {
        System.Diagnostics.Trace.WriteLine("Order A (Take your time, bro)");
    }
    public void OrderB()
    {
        System.Diagnostics.Trace.WriteLine("Order B (Take your time, bro)");
    }
}

public class PrinterEmergency : IPrinter
{
    public void OrderA()
    {
        System.Diagnostics.Trace.WriteLine("Order A : Emergency!");
    }
    public void OrderB()
    {
        System.Diagnostics.Trace.WriteLine("Order B : Emergency!");
    }
}
```

* Python
```
from abc import ABC, abstractmethod

class Printer(ABC):
    @abstractmethod
    def orderA(self):
        pass

    @abstractmethod
    def orderB(self):
        pass


class PrinterUsual(Printer):
    def orderA(self):
        print("Order A (Take your time, bro)")

    def orderB(self):
        print("Order B (Take your time, bro)")


class PrinterEmergency(Printer):
    def orderA(self):
        print("Order A : Emergency!")

    def orderB(self):
        print("Order B : Emergency!")
```


我們接下來會實做供應商處理訂單的 Abstraction。
注意為了區別兩家供應商，我們假設第二家供應商(Goople)並沒有提供產品B的服務，所以在要求列印產品B的時候會回覆錯誤訊息。


* C#
```
public interface IOrder
{
        void PrintOrderA();
        void PrintOrderB();
}

public class FatbookOrder : IOrder
{
    private IPrinter _printer = null;
    public FatbookOrder(IPrinter printer)
    {
        this._printer = printer;
    }
    public void PrintOrderA()
    {
        this._printer.OrderA();
    }

    public void PrintOrderB()
    {
        this._printer.OrderB();
    }
}

public class GoopleOrder : IOrder
{
    private IPrinter _printer = null;
    public GoopleOrder(IPrinter printer)
    {
        this._printer = printer;
    }
    public void PrintOrderA()
    {
        this._printer.OrderA();
    }

    public void PrintOrderB()
    {
        string err = "Goople does't have product B!";
        System.Diagnostics.Trace.WriteLine(err);
        // throw new Exception(err);
    }
}
```

* Python
```
from abc import ABC, abstractmethod

class Order(ABC):
    @abstractmethod
    def printOrderA(self):
        pass

    @abstractmethod
    def printOrderB(self):
        pass


class FatbookOrder(Order):
    _printer = None

    def __init__(self, printer=Printer):
        if printer is None:
            raise TypeError
        else:     
            self._printer = printer

    def printOrderA(self):
        self._printer.orderA()

    def printOrderB(self):
        self._printer.orderB()


class GoopleOrder(Order):
    _printer = None

    def __init__(self, printer=Printer):
        if printer is None:
            raise TypeError
        else:     
            self._printer = printer

    def printOrderA(self):
        self._printer.orderA()

    def printOrderB(self):
        err = "Goople does't have product B!"
        print(err)
        # raise ValueError(err)
```


主程式如下：

* C#
```
//列印第一家廠商:產品B的訂單
IOrder order1 = new FatbookOrder(new PrinterUsual());
order1.PrintOrderB();

//列印第二家廠商:產品A的急單
IOrder order2 = new GoopleOrder(new PrinterEmergency());
order2.PrintOrderA();

//列印第二家廠商:產品B的訂單=>但該廠商並無產品B
IOrder order3 = new GoopleOrder(new PrinterUsual());
order3.PrintOrderB();
```

* Python
```
# 列印第一家廠商:產品B的訂單
order1 = FatbookOrder(PrinterUsual())
order1.printOrderB()

# 列印第二家廠商:產品A的急單
order2 = GoopleOrder(PrinterEmergency())
order2.printOrderA()

# 列印第二家廠商:產品B的訂單=>但該廠商並無產品B
order3 = GoopleOrder(PrinterUsual())
order3.printOrderB()

```

結果為：
*Order B (Take your time, bro)*<br>
*Order A : Emergency!*<br>
*Goople does't have product B!*


由以上程式碼我們可以藉由抽換Abstraction以及Implementor來改變不同供應商不同列印的細節。
另外如果需要再達到相同產品但是各供應商訂單不同的需求，則可再加上Strategy的組合。

開始建立Strategy介面(或抽象類別)和實做類別。

* C#
```
public interface IPrintStg
{
    void PrintA();
    void PrintB();
}

public class FatbookPrintStg : IPrintStg
{
    public void PrintA()
    {
        System.Diagnostics.Trace.WriteLine("Use FatbookPrintStg to Print A's oreder");
    }

    public void PrintB()
    {
        System.Diagnostics.Trace.WriteLine("Use FatbookPrintStg to Print B's oreder");
    }
}
```

* Python
```
from abc import ABC, abstractmethod

class PrintStg(ABC):
    @abstractmethod
    def printA(self):
        pass

    @abstractmethod
    def printB(self):
        pass


class FatbookPrintStg(PrintStg):
    def printA(self):
        print("Use FatbookPrintStg to Print A's order")

    def printB(self):
        print("Use FatbookPrintStg to Print B's order")

```

更新實做`Iprinter`的類別：`PrinterUsual`和`PrinterEmergency`，或者如下建立一個新的類別。
注意該類別裡面的邏輯已經抽換成`IPrintStg`所定義的方法。

* C#
```
public class PrinterCostom : IPrinter
{
    private IPrintStg _printStg = null;
    public PrinterCostom(IPrintStg printStg)
    {
        this._printStg = printStg;
    }

    public void OrderA()
    {
        this._printStg.PrintA();
    }

    public void OrderB()
    {
        this._printStg.PrintB();
    }
}
```

* Python
```
class PrinterCustom(Printer):
    _printStg=None

    def __init__(self, printStg=PrintStg):
        if printStg is None:
            raise TypeError
        else:     
            self._printStg = printStg
    
    def orderA(self):
        self._printStg.printA()

    def orderB(self):
        self._printStg.printB()
```

來看一下主程式如何應用Bridge和Strategy的組合：

* C#
```
var stg = new FatbookPrintStg();
IOrder order = new FatbookOrder(new PrinterCostom(stg));
order.PrintOrderA();
order.PrintOrderB();
```

* Python
```
stg = FatbookPrintStg();
order = FatbookOrder(PrinterCustom(stg))
order.printOrderA()
order.printOrderB()
```

輸出結果為：

*Use FatbookPrintStg to Print A's order*<br>
*Use FatbookPrintStg to Print B's order*


## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Bridge)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtBridge.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Bridge)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Bridge/UtBridge.py)



