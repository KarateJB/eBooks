# Facade 外觀模式

> Facade 稱為外觀或表面模式，不過比較常聽到英文說法；請聽一下這個單字的[念法](https://translate.google.com.tw/?hl=zh-TW&tab=wT#en/zh-TW/Facade)吧!

## 需求描述

Amy(PO):
> As a 資料分析者<br>
> I want 使用者在執行任一系統功能時，系統可以同時記錄使用記錄在文字檔和資料庫<br>
> So that 我們可以知道使用者何時使用了該功能和次數


## 思考設計

JB:<br> 
哈! 果然這次Iteration Planning，他們決定把所有使用者行為記錄在文字檔和資料庫! 我們先前建立的`TextLogger`和`DbLogger`兩個策略類別可以派上用場了，讓我直接在主程式加上他們。

Lily: <br>
等等，你不該直接在每個功能呼叫兩個記錄的策略類別。

JB: <br>
喔喔! 你指的是先記錄的行為封裝在另一個類別，對吧!?

Lily:<br>
對，而且之後如果我們有其他記錄的策略或是新需求，我們可以直接修改這個新的類別即可。


## 定義

> 封裝商業邏輯並提供簡單介面，以達到**易使用**、**可讀性**、**減少依賴**的目的 ([WIKI](https://en.wikipedia.org/wiki/Facade_pattern))


由前面的設計討論，我們決定將Logger的行為封裝，避免依賴於`DbLogger`和`TextLogger`類別(請參考[Day3文章](https://ithelp.ithome.com.tw/articles/10192935))。

* C#
```
public class MyLogger
{
    public void Warn(string msg)
    {
            var textLogger = new TextLogger();
            var dbLogger = new DbLogger();
            textLogger.Warn(msg);
            dbLogger.Warn(msg);
    }

    public void Read()
    {
            System.Diagnostics.Trace.WriteLine($"(Database)Dump logs.");
            System.Diagnostics.Trace.WriteLine($"(Text)Dump logs.");
    }
}
```

* Python
```
class MyLogger:   
    def warn(self, msg):
        textLogger = TextLogger()
        dbLogger = DbLogger()
        textLogger.warn(msg)
        dbLogger.warn(msg)

    def read(self):
        print("(Database)Dump logs.")
        print("(Text)Dump logs.")

```


主程式：

* C#
```
var facade = new MyLogger();
facade.Warn("Facade works!");
facade.Read();
```

* Python
```
logger = MyLogger()
logger.warn("Facade works!")
logger.read()
```

## Reference

-[Design Pattern : Facade](http://karatejb.blogspot.tw/2013/10/design-pattern-facade.html)


