# Chain of Responsibility 職責鍊模式

## 需求描述

Amy(PO):
> As a 產品經理
> I want 多國語系介面
> So that 顯示使用者對應的語系內容。


## 思考設計

Hachi:<br> 
我看了一下DoD(Definition of Done)，系統需要支援繁、簡中和英文。 所以只要前端能丟給我一個語系的參數，我就能從資料庫抓出對應的語系內容。 我只是對於這段Switch判斷有些疑問... (指了以下程式碼)

```
var content = new Content();
switch(localization)
{
    case "zh-TW":
       content.City = DataFactory.CityZh;
       content.Country = DataFactory.CountryZh;
       break;
    case "zh-CN":
       content.City = DataFactory.CityCn;
       content.Country = DataFactory.CountryCn;
       break;
    default:
       content.City = DataFactory.CityEn;
       content.Country = DataFactory.CountryEn;
       break;
}
```

JB:<br>
恩，我看不出來有什麼問題耶？

Hachi:<br>
程式碼太長了；而且未來如果我們需要支援更多語系，這個Switch會越來越龐大。

JB:<br>
我很想幫你，可是我現在得去開一個ERP的會議。天啊! 他們總是搞不清楚職責，ERP不是我們Team負責的，他們應該丟給...

Hachi:<br>
等等! 你提到了"職責"？ 感謝你! 我想可以用職責鍊模式來重構這段程式碼! 


## 定義

> 根據條件來定義一個有責任的接收者，以處理一個請求或將其轉發給鏈上的下一個接收者（如果有的話）([WIKI](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern))

Chain of Responsibility(職責鍊)大概是我們最容易理解的設計模式，因為我們每天都想盡辦法在實現它。
例如：


老闆交代了一件工作給PM =>
PM`判斷此事優先權極高`，立即跟資深工程師說有插件，做吧! =>
資深工程師`判斷此事不急且快下班了`，說我有事，菜鳥做吧! =>
菜鳥工程師`看了一下沒人可以往後丟了`，摸摸鼻子做事去了 => 結束


開玩笑地，相信大家的團隊應該是這樣：

老闆交代了一件工作給PM =>
PM`整理了一些資訊`，再交給資深工程師 =>
資深工程師`判斷此事極容易`所以直接`寫完程式碼並做單元測試` => 結束


也就是說在每個Chain上的接收者可以選擇直接丟給下一個適合的接收者，或是選擇**做事**再判斷適合的接收者後**往後丟**。
我們要練習的多國語系案例比較偏向**不符合我的職責就往後丟**的情況。
其實職責鍊的用法非常多，我們的範例算是相對簡單的用法。



建立`IHandler`介面和職責鍊的頭(大家有事先找PM處理的概念)：`Handler`。
注意PM的職責是什麼？把東西往後丟嘛，不過丟給誰我們等下再來決定。


* C#

```
public interface IHandler
{
    IHandler Next { get; }
    Content Action(string localization);
}

public class Handler : IHandler
{
    public virtual IHandler Next { get; set; }

    public virtual Content Action(string localization)
    {
        return this.Next.Action(localization);
    }
}
```



* Python

```
from abc import ABC, abstractmethod

class HandlerBase(ABC):    

    @property
    @abstractmethod
    def next(self):
        pass

    @next.setter
    @abstractmethod
    def next(self, val):
        pass

    @abstractmethod
    def action(self, localization):
        pass
        

class Handler(HandlerBase):
    _next = None
    
    @property
    def next(self):
        return self._next

    @next.setter
    def next(self, val):
        self._next = val

    def action(self, localization):
        if (self._next == None):
            self._next = ReceiverZh()

        return self._next.action(localization)

```


下一步開始定義實際作業的`Receiver`類別(苦命工程師?)，一樣是實作`IHandler`，當然你也可以選擇繼承`Handler`再覆寫。
注意我們要在每個`Receiver`裡面再宣告一個職責鍊的下一個`Receiver`，在目前作業完成後去呼叫下一個`Receiver`的作業。
這樣整個職責鍊就開始串起來了!

* C#
```
public class ReceiverZh : IHandler
{
        public IHandler Next { get; set; } //Next Receiver

        public Content Action(string localization)
        {
            if (localization.Equals("zh-TW"))
            {
                var content =  new Content{
                    Country=DataFactory.CountryZh,
                    City=DataFactory.CityZh
                };
                return content;
            }
            else
                System.Diagnostics.Trace.WriteLine($"Not zh-TW, go to next receiver...");
            
            #region Do next
            if (this.Next == null) //Set a default next receiver
                this.Next = new ReceiverCn();

            return this.Next.Action(localization);
            #endregion
        }
}
```

* Python
```
class ReceiverZh(HandlerBase):
    _next=None
    
    @property
    def next(self):
        return self._next

    @next.setter
    def next(self, val):
        self._next = val        

    def action(self, localization):
        #Action
        if (localization=="zh-TW"):
            content =  Content(DataFactory.countryZh(),DataFactory.cityZh())
            print("{0} {1}".format(content.country, content.city))
            return content
        else:
            print("Not zh-TW, go to next receiver...")

        #Go to next
        if (self._next == None):
            self._next = ReceiverCn()

        return self._next.action(localization)
```


接下來請依樣畫葫驢建立`ReceiverCn`,`ReceiverEn`類別，並且設定預設的職責鍊順序為：
[Handler](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.Domain/Samples/ChainOfResponsibility/Handler.cs) -> [ReceiverZh](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.Domain/Samples/ChainOfResponsibility/ReceiverZh.cs) -> [ReceiverCn](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.Domain/Samples/ChainOfResponsibility/ReceiverCn.cs) -> [ReceiverEn](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.Domain/Samples/ChainOfResponsibility/ReceiverEn.cs) -> [ReceiverException](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.Domain/Samples/ChainOfResponsibility/ReceiverException.cs)

1. 為什麼需要最後一個`ReceiverException`？ 
   因為老闆總是會隨便亂丟不屬於我們職責的工作進來>.<  我們職責鍊無法處理的事情，那就要說出來讓老闆知道：
   "你得多派一個專職的人來處理(多建立一個`Receiver`)，這事才能成!"

2. 職責鍊的順序是可以調整的，下面有一個範例說明。



我們來看主程式如何使用職責鍊。

* C#
```
string localization="zh-CN";
var handler = new Handler();
var content = handler.Action(localization);
```

* Python
```
localization="zh-CN"
handler = Handler()
content = handler.action(localization)
```

上面執行的結果會是

*Not zh-TW, go to next receiver...*
*台湾 台东市*

原本的`Switch`程式碼被重構成幾行解決，是不是開始感受設計模式的魅力了呢？
另外不使用預設的職責鍊順序，也可以自行指定。
例如以下的範例，其職責鍊順序我們調整為 `HandlerEn` -> `HandlerZh` -> `HandlerException`。
注意順序要指定好，避免無窮迴圈。

* C#
```
string localization="zh-TW";

var handlerEn = new ReceiverEn();
var handlerZh = new ReceiverZh();
var handlerFinal = new ReceiverException();

handlerEn.Next = handlerZh;
handlerZh.Next = handlerFinal;

var content = handlerEn.Action(localization);
```

* Python
```
localization="zh-TW"

handlerEn = ReceiverEn()
handlerZh = ReceiverZh()
handlerFinal = ReceiverException()

handlerEn.next = handlerZh
handlerZh.next = handlerFinal
    
content = handlerEn.action(localization)
```


## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/ChainOfResponsibility)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtChainOfResposibility.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/ChainOfResponsibility)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/ChainOfResponsibility/UtChainOfResponsibility.py)


## Reference

- [Design Pattern : Chain of Responsibility](http://karatejb.blogspot.tw/2013/10/design-pattern-chain-of-responsibility.html)
