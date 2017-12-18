## Before we practice Desgin Patterns

### Knowledge

We should know,

1. [Gang of Four](http://wiki.c2.com/?GangOfFour), the four authors of the book, "[Design Patterns: Elements of Reusable Object-Oriented Software](https://en.wikipedia.org/wiki/Design_Patterns)"

2. Six principles of design patterns

   | <center>Principle</center> |  <center>aka</center>  |
   |:---------------------------------------------------|:----|
   | Single responsibility principle                    | [SRP](https://en.wikipedia.org/wiki/Single_responsibility_principle) |
   | Liskov Substitution Principle                      | [LSP](https://en.wikipedia.org/wiki/Liskov_substitution_principle) |
   | Dependency inversion principle                     | [DIP](https://en.wikipedia.org/wiki/Dependency_inversion_principle) |
   | Interface Segregation Principle                    | [ISP](https://en.wikipedia.org/wiki/Interface_segregation_principle) |
   | The Law of Demeter (The least knowledge principle) | [LoD](https://en.wikipedia.org/wiki/Law_of_Demeter) |
   | The open closed principle                          | [OCP](https://en.wikipedia.org/wiki/Open/closed_principle) |

3. Patterns

   * Creational design patterns

     | Abstract Factory | Builder | Factory Method | Prototype | Singleton |
      
   * Structural design patterns

     | Adapter | Bridge | Composite | Decorator | Facade | Flyweight | Proxy |

   * Behavioral design patterns

     | Chain of responsibility | Command | Interpreter | Iterator | Mediator | Memento | Observer | State | Strategy | Template | Visitor |


### Practice language

1. C# (.NET Core 2.0)
2. Python 3.6.2


Okay, let's take a small practice on Design Pattern: `Strategy`.


<br>
## Day 1. Requirement

>>> The user is going to do a task and keep some logs within it.
>>> However, the user can choose to keep the log in a text file or Database. 

### C#

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

* MyTask.cs

  ```
  public class MyTask
  {
      private ILogger _logger = null;
      public MyTask(ILogger logger)
      {
          if (logger != null)
              this._logger = logger;
      }

      public void Run()
      {
          //Do something
          this._logger.Debug($"My task was done on {DateTime.Now.ToString()}");
      }
  }
  ```


* Main prgram

  ```
  ILogger txtLogger = new TextLogger();
  (new MyTask(txtLogger)).Run();
  
  ILogger dbLogger = new DatabaseLogger();
  (new MyTask(dbLogger)).Run();
  ```