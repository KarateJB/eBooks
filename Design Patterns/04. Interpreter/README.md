# Interpreter 解譯器模式

> Interpreter的中文也被稱為`翻譯者`或`解釋器`。


## 需求描述

Amy(PO):
> As a 資料分析者
> I want 系統可以介接店家傳回來的EDI並整理資料後存放在資料庫
> So that 我們可以在資料庫做進一步客戶分析



## 思考設計

JB:<br> 
我們目前手上有三家特店，他們的EDI格式都不相同。Amy嘗試說服他們使用相同的格式但是沒有成功；這會造成我們的系統複雜而且很難維護! 真是一場災難!

Lily: <br>
我想透過Interpreter應該可以簡化這個問題。

JB: <br>
Interpreter? 一台翻譯機? 翻譯員?

Lily: <br>
喔，都不是，當然我是指軟體的部分。不過作用很像，我來舉一個簡單的例子。`



## Definition of Interpreter

> 定義一個表示法，使用表示法來解釋(翻譯)語言中的句子([Wiki](https://en.wikipedia.org/wiki/Interpreter_pattern)




建立`Context`類別以存放翻譯前(`String`)及翻譯後(`PayData`物件)的資料。

* C#

  ```
  public class Context
  {
        public string Input { get; set; }

        public PayData Output { get; set; }

        public Context(string value)
        {
            this.Input = value;
            this.Output = new PayData();
        }
  }
  ```

* Python
  
  ```
  class Context:
    def __init__(self, input):
       if input is None:
            raise TypeError
       else:     
            self.input=input
            self.output=PayData() 
  ```


定義翻譯後的Models

* C#

  ```
  public class PayData
  {
        public Store Store {get;set;}
        public string Customer { get; set; }
        public decimal PayAmout { get; set; }
        public DateTime PayOn { get; set; }
        public Vip  Vip { get; set; }

        public PayData()
        {
            this.Store = new Store();
            this.Vip = new Vip();
        }
  }
  public class Store
  {
        public string Id { get; set; }
        public string Name { get; set; }
  }
  public class Vip
  {
        public string CardNo { get; set; }      
        public int BonusPoints { get; set; }
  }
  ``` 

* Python

```
import datetime


class Store:
    def __init__(self, id="", name=""):
        self.id = id
        self.name = name


class Vip:
    def __init__(self, cardNo="", bonusPoints=0):
        self.cardNo = cardNo
        self.bonusPoints = bonusPoints


class PayData:
    def __init__(self, store=Store, vip=Vip, customer="", payAmt=0, payOn=None):
        self.store = store
        self.vip = vip
        self.customer = customer
        self.payAmt = payAmt
        if(payOn is None):
            self.payOn = datetime.date.today()
        else:
            self.payOn = payOn
```

至於如何將原本複雜的資料翻譯成我們看的懂的資料(這邊指物件`PayData`/`Store`/`Vip`)，我們建立各自的語法對應式(grammar expression)來進行翻譯(interpret)。
而且這些expression是針對不同的來源資料做組合和重複利用。

先建立一個介面(或抽象類別)，讓各種語法對應式來實做它。
注意我們要把要翻譯的內容(`Context`物件)做為翻譯函式的參數。

* C#

```
public interface IExpression
{
    void Interpret(Context context);
}
```

* Python

```
from abc import ABC, abstractmethod
class Expression(ABC):
    @abstractmethod
    def interpret(self, context=Context):
        pass
```


再來實做各種Expressions~

* C#

```
public class PayExpression : IExpression
{
    public void Interpret(Context context)
    {
        //context.Output = ...
    }
}

public class StoreExpression : IExpression
{
    public void Interpret(Context context)
    {
        //context.Output.Store = ...
    }
}

public class VipExpression : IExpression
{
    public void Interpret(Context context)
    {
        //context.Output.Vip = ...
    }
}
```

* Python

```
class PayExpression(Expression):
     def interpret(self,context=Context):
         #context.output=...

class StoreExpression(Expression):
     def interpret(self,context=Context):
         #context.output.store=...

class VipExpression(Expression):
     def interpret(self,context=Context):
         #context.output.vip=...
```

為了不模糊焦點，我把一些實做的邏輯拿掉，完整的程式碼請參考
1. [C#](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Interpreter)。
2. [Python](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Interpreter)


主程式...

* C#

```
var context = new Context("EDI string blabla....");

var expressions = new List<IExpression>(){
    new PayExpression(),
    new VipExpression(),
    new StoreExpression()
};

expressions.ForEach(exp=>{
    exp.Interpret(context);
});
```

* Python

```
context = Context('EDI string blabla....')

expressions = [PayExpression(),VipExpression(), StoreExpression()]
for exp in expressions:
    exp.interpret(context)
```


> 1. 以我自己的理解，Interpreter並非單單用在語句或語言的轉換上，而是用在任何可以組合和重複利用的邏輯。 例如在ASP.NET MVC裡，將DAO轉換成ViewModel的情景也是可以使用的。
> 2. 本篇這個需求也可以使用Strategy來完成，想一想Expression類別其實跟Strategy類別的概念是相通的。



## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Interpreter)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtInterpreter.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Interpreter)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Interpreter/UtInterpreter.py)

