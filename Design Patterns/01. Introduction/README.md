## 學習設計模式的方式

1. 買/借本好書
2. 初步了解設計模式 (先有概念)
3. 模仿及練習書上範例
4. 重新再讀一次
5. 以實務需求思考及實作
6. 參考別人經驗

設計模式最有趣的地方，在於每個人解決的方式不同。
同一個需求(情境)，你可能用Template+Strategy的方式，我可能用Adapter的方式處理；
我們三個月前解決的方式和現在可能又有不同。

不同的方式並無絕對好壞，重點在於解決現在及預防未來可能的問題。


## 買本好書

以下是小弟建議的書單，可以參考看看。

- [大話設計模式](https://www.tenlong.com.tw/products/9789866761799)
- [設計模式的解析與活用](https://www.tenlong.com.tw/products/9789862018200)
- [物件導向設計模式－可再利用物件導向軟體之要素](https://www.tenlong.com.tw/products/9789572054116)
- [無瑕的程式碼─物件導向原則、設計模式與C#實踐](https://www.tenlong.com.tw/products/9789864342099)


## 初步了解設計模式 

1. GoF是誰？

   > [Gang of Four](http://wiki.c2.com/?GangOfFour), "[Design Patterns: Elements of Reusable Object-Oriented Software](https://en.wikipedia.org/wiki/Design_Patterns)"的四個作者。

2. 六大原則是指哪些？

   | <center>Principle</center> |  <center>aka</center>  |
   |:---------------------------------------------------|:----|
   | Single responsibility principle                    | [SRP](https://en.wikipedia.org/wiki/Single_responsibility_principle) |
   | Liskov Substitution Principle                      | [LSP](https://en.wikipedia.org/wiki/Liskov_substitution_principle) |
   | Dependency inversion principle                     | [DIP](https://en.wikipedia.org/wiki/Dependency_inversion_principle) |
   | Interface Segregation Principle                    | [ISP](https://en.wikipedia.org/wiki/Interface_segregation_principle) |
   | The Law of Demeter (The least knowledge principle) | [LoD](https://en.wikipedia.org/wiki/Law_of_Demeter) |
   | The open closed principle                          | [OCP](https://en.wikipedia.org/wiki/Open/closed_principle) |

3. GoF設計模式

   * Creational design patterns

     | Abstract Factory | Builder | Factory Method | Prototype | Singleton |
      
   * Structural design patterns

     | Adapter | Bridge | Composite | Decorator | Facade | Flyweight | Proxy |

   * Behavioral design patterns

     | Chain of responsibility | Command | Interpreter | Iterator | Mediator | Memento | Observer | State | Strategy | Template | Visitor |
  

## 參考別人經驗

   每個軟體開發人在從規劃架構到寫一個小函式的風格和方式都或多或少會有不同。
   這也是此系列文的初衷，拋磚引玉、和大家一起切磋進步。
   所以希望您多多提供回饋和建議，讓你我他一同成長。


## 實作的語言

1. C#
2. Python 3.6.2


## 文章編排方式

1. 描述需求
2. 思考如何解決問題
3. 程式碼範例及說明
4. 程式碼參考位置(Github)

