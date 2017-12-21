# Strategy 策略模式

## 需求描述

Amy(PO):
> As a 資料分析者<br>
> I want 使用者在執行任一系統功能時，系統可以記錄使用記錄在文字檔<br>
> So that 我們可以知道使用者何時使用了該功能和次數



## 思考設計

JB:<br> 
這個User Story希望可以在系統將使用者行為記錄在文字檔，這是個很簡單的需求，我們開始來加入這項功能吧!

Lily: <br>
記錄在文字檔不利於分析吧？ 我覺得應該寫入到資料庫。

JB: <br>
事實上，我們在iteration planning會議有提到這個問題，Amy說文字檔就足夠了。況且我們的資料庫設計的backlog還沒排進來，我想我們先在這個功能上保留一些彈性，你覺得如何設計比較好呢？

Lily:<br>
我們可以建立兩個具體策略類別(Concrete strategy)，分別實作文字檔和資料庫的記錄功能，在這個iteration先放上文字檔記錄的Strategy!



## Definition of Strategy

> 定義多個演算法，各別封裝這些演算法，並讓它們可以互換 ([Wiki](https://en.wikipedia.org/wiki/Strategy_pattern))



### C#

- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Strategy)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtStrategy.cs)

定義策略的介面(也可建立為抽象類別):`ILogger`， 並分別建立兩個實作的具體策略類別：`TextLogger`和`DbLogger`。

* ILogger.cs

  ```
  public interface ILogger
  {
      void Debug(string msg);
      void Warn(string msg);
      void Error(string msg);
  }
  ```

* TextLogger.cs

  ```
  public class TextLogger:ILogger
  {
      public void Debug(string msg) => System.Diagnostics.Trace.WriteLine($"(Text)Debug: {msg}");
      public void Warn(string msg) => System.Diagnostics.Trace.WriteLine($"(Text)Warn: : {msg}");
      public void Error(string msg) => System.Diagnostics.Trace.WriteLine($"(Text)Error: : {msg}");
  }
  ```

* DbLogger.cs

  ```
  public class DbLogger:ILogger
  {
      public void Debug(string msg) => System.Diagnostics.Trace.WriteLine($"(Database)Debug: {msg}");
      public void Warn(string msg) => System.Diagnostics.Trace.WriteLine($"(Database)Warn: : {msg}");
      public void Error(string msg) => System.Diagnostics.Trace.WriteLine($"(Database)Error: : {msg}");
  }
  ```

將`ILogger`作為其他類別的建構參數，如此我們可以在該類別進行記錄的動作。
但是實體化，亦即決定要記錄在文字檔或者資料庫則由建立`MyTask`的主程式決定，以利於隨時抽換。

* MyTask.cs

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


* 主程式

  ```
  //For current iteration
  ILogger txtLogger = new TextLogger();
  (new MyTask(txtLogger)).Run();
  
  //Refine in next iteration
  ILogger dbLogger = new DatabaseLogger();
  (new MyTask(dbLogger)).Run();
  ```



### Python

- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Strategy
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Strategy/UtStrategy.py)


* BaseLogger.py

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
  ```

* TextLogger.py

  ```
  from BaseLogger import BaseLogger

  class TextLogger(BaseLogger):
      def debug(self,msg):
          print("(Text)Debug: " + msg)

      def warn(self,msg):
          print("(Text)Warn: " + msg)

      def error(self,msg):
          print("(Text)Error: " + msg)
          
  ```

* DbLogger.py

  ```
  from BaseLogger import BaseLogger

  class DbLogger(BaseLogger):
      def debug(self,msg):
          print("(Database)Debug: " + msg)

      def warn(self,msg):
          print("(Database)Warn: " + msg)

      def error(self,msg):
          print("(Database)Error: " + msg)
  ```  

* MyTask.py

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

* Usage

  ```
  logger = TextLogger() #Current iteration
  #logger = DbLogger() #Refine in next iteration
  task = MyTask(logger)
  task.run()
  ```