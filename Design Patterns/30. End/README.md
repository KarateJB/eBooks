# Retrospective 回顧

JB:<br> 
呼! 這個iteration終於到尾聲啦!
可是...我們這個iteration原本預期是要完成30個User Story，可是我們最後只完成了26個吧!

Lily: <br>
沒有事情是完美的，孩子! 我們來看看問題發生在哪裡？ 

Hachi: <br>
我想想...我們不應該用User Story來作為我們Velocity的單位，而該用Story point! 畢竟每個User Story的需求難度和大小不一樣!
看看我們在[Day28]()和[Day29]()只完成了一個User Story。

Lily:<br>
你說的沒錯! 我們下個iteration可以改進這點!
那麼大家覺得之後我們可以加強哪一方面的技能和實作呢？

JB:<br>
UML和單元測試!



### UML(Unified Modeling Language)



何時以及如何繪製圖示(無瑕的程式碼(敏捷完整篇)─物件導向原則、設計模式與C#實踐，P203)

- 當有幾個人需要理解設計中某個特定部分結構時
- 團隊達成一致的共識
- 你想要嘗試一個設計想法，而圖示有助於你進行思考

那麼，文件呢？(無瑕的程式碼(敏捷完整篇)─物件導向原則、設計模式與C#實踐，P205)
- 好的文件對於任何專案來說，都是不可或缺的。缺少它們，團隊就會迷失在程式碼的海洋之中。
- 知道哪些東西不需要文件化，和知道哪些需要文件化，同等重要。



OCUP UML 初級認證攻略(邱郁惠)

年輕的優勢在體力和勇氣，年長的優勢在腦力和經驗，而我們每個人都擁有過這些年輕的優勢，也都將轉型到年長的優勢。(P1-49)




函式 p37

1. 簡短!
2. 只做一件事情
3. 要無副作用  

羽化-Kent Beck簡單設計原則(P189)
1. 執行完所有測試
2. 重構：禁止重複
3. 重構：具表達力
4. 重構：最小化類別及方法的數量
   即便是消除程式碼，或讓程式具有表達力及SRP，可能做過頭產生不必要的類別及方法。


程式碼的氣味和啟發 P315
1.廢棄 多餘的註解
2. 被遺棄的程式碼
3. 模糊的意圖
4. 魔術數字








## Definition of Strategy

> 定義多個演算法，各別封裝這些演算法，並讓它們可以互換 ([Wiki](https://en.wikipedia.org/wiki/Strategy_pattern))




定義策略的介面(也可建立為抽象類別):`ILogger`， 並分別建立兩個實作的具體策略類別：`TextLogger`和`DbLogger`。

* C#

```
public interface ILogger
{
    void Debug(string msg);
    void Warn(string msg);
    void Error(string msg);
}

public class TextLogger:ILogger
{
    public void Debug(string msg) => System.Diagnostics.Trace.WriteLine($"(Text)Debug: {msg}");
    public void Warn(string msg) => System.Diagnostics.Trace.WriteLine($"(Text)Warn: : {msg}");
    public void Error(string msg) => System.Diagnostics.Trace.WriteLine($"(Text)Error: : {msg}");
}

public class DbLogger:ILogger
{
    public void Debug(string msg) => System.Diagnostics.Trace.WriteLine($"(Database)Debug: {msg}");
    public void Warn(string msg) => System.Diagnostics.Trace.WriteLine($"(Database)Warn: : {msg}");
    public void Error(string msg) => System.Diagnostics.Trace.WriteLine($"(Database)Error: : {msg}");
}
```



* Python

```
from abc import ABC, abstractmethod
class BaseLogger(ABC):
    @abstractmethod
    def debug(self):
        pass

    @abstractmethod
    def warn(self):
        pass

    @abstractmethod
    def error(self):
        pass

class TextLogger(BaseLogger):
    def debug(self,msg):
        print("(Text)Debug: " + msg)

    def warn(self,msg):
        print("(Text)Warn: " + msg)

    def error(self,msg):
        print("(Text)Error: " + msg)
          

class DbLogger(BaseLogger):
    def debug(self,msg):
        print("(Database)Debug: " + msg)

    def warn(self,msg):
        print("(Database)Warn: " + msg)

    def error(self,msg):
        print("(Database)Error: " + msg)
```



將`ILogger`作為其他類別的建構參數，如此我們可以在該類別進行記錄的動作。
但是實體化，亦即決定要記錄在文字檔或者資料庫則由建立`MyTask`的主程式決定，以利於隨時抽換。

* C#

```
public class MyTask
{
    private ILogger _logger = null;
    public MyTask(ILogger logger)
    {
        if (logger != null)
            this._logger = logger;
        else
            throw new ArgumentNullException("logger");
    }

    public void Run()
    {
        //Do something
        this._logger.Debug($"My task was done on {DateTime.Now.ToString()}");
    }
}
```


* Python

```
from BaseLogger import BaseLogger
from time import gmtime, strftime

class MyTask:
    def __init__(self,logger=BaseLogger):
        if logger is None:
            raise TypeError
        else:     
            self._logger = logger

    def run(self):
        self._logger.warn("My task was done on " + strftime("%Y-%m-%d %H:%M:%S", gmtime()));
```


主程式...

* C#

```
//For current iteration
ILogger txtLogger = new TextLogger();
(new MyTask(txtLogger)).Run();

//Refine in next iteration
ILogger dbLogger = new DatabaseLogger();
(new MyTask(dbLogger)).Run();
```


* Python

```
logger = TextLogger() #Current iteration
#logger = DbLogger() #Refine in next iteration
task = MyTask(logger)
task.run()
```


## Source code

1. C#

- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Strategy)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtStrategy.cs)

2. Python

- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Strategy)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Strategy/UtStrategy.py)

