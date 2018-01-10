# Observer 觀察者模式

## 定義

> 定義對象之間的一對多依賴關係，當一個對象更改狀態時，會自動通知並更新其所有依賴的對象。([WIKI](https://en.wikipedia.org/wiki/Observer_pattern))


### UML

![](http://1.bp.blogspot.com/-kx7SaZN98hA/UpR85aVpGII/AAAAAAAAA1M/Vcg8FWPT754/s1600/Observer002.jpg)

1. Observer : 觀察者，必須有讓Subject可以Notify的方法。
2. Subject：可以訂閱、取消訂閱Observer，並有Notify所有訂閱的Observer的方法。

![](http://4.bp.blogspot.com/-VueWxCtOJoo/UpR85QjQ9XI/AAAAAAAAA1Q/_JmqpZmqjMQ/s1600/Observer001.jpg)


我們在
[Day20.Visitor訪問者模式](https://ithelp.ithome.com.tw/articles/10196407)的**ObjectStructure**
以及
[Day22.Command命令模式](https://ithelp.ithome.com.tw/articles/10196669)的**Invoker**
皆使用了觀察者模式的特性。


底下的範例，是在使用者申請一張請假單時，電子表單系統於請假日當天
1. 通知交換機自動指定轉接給代理人員
2. 通知Mail Server將收到的eMail副本給代理人員

### Observer

* C#
```
public interface IObserver
{
        void Update(string absence, string designee);
}
public class ObserverPbx : IObserver
{
    public void Update(string absence, string designee)
    {
        Trace.WriteLine($"[PBX] 已指定轉接{absence}的來電給{designee}!");
    }
}
public class ObserverMailServer : IObserver
{
    public void Update(string absence, string designee)
    {
        Trace.WriteLine($"[Mail Server] 已設定將{absence}的信副本給{designee}!");
    }
}
```

* Python
```
from abc import ABC, abstractmethod

class Observer(ABC):

    @abstractmethod
    def update(self,absence:str, designee:str):
        pass

class ObserverPbx(Observer):

    def update(self,absence:str, designee:str):
        print("[PBX] 已指定轉接{0}的來電給{1}!".format(absence, designee))

class ObserverMailServer(Observer):

    def update(self,absence:str, designee:str):
        print("[Mail Server] 已設定將{0}的信副本給{1}!".format(absence, designee))

```

### Subject

* C#
```
public interface ISubject
{
    List<IObserver> Observers { get; set; }
    void Attach(IObserver observer);
    void Detach(IObserver observer);
    void Notify(string absence, string designee);
}

public class SubjectEflow:ISubject
{
    public List<IObserver> Observers { get; set; }
    public SubjectEflow()
    {
        this.Observers = new List<IObserver>();
    }
    public void Attach(IObserver observer)
    {
        if (!this.Observers.Contains(observer))
            this.Observers.Add(observer);
    }
    public void Detach(IObserver observer)
    {
        if (this.Observers.Contains(observer))
            this.Observers.Remove(observer);
    }
    public void Notify(string absence, string designee)
    {
        foreach (IObserver observer in this.Observers)
        {
            observer.Update(absence, designee);
        }
    }
}
```

* Python
```
from abc import ABC, abstractmethod
from Observers import Observer

class Subject(ABC):

    def __init__(self):
        self.observers=[]

    @abstractmethod
    def attach(self,observer: Observer): 
        pass

    def detach(self,observer: Observer):
        pass

    def notify(self, absence:str, designee:str):
        pass

class SubjectEflow(Subject):

    def __init__(self):
        super().__init__()

    def attach(self,observer: Observer): 
        self.observers.append(observer)

    def detach(self,observer: Observer):
        self.observers.remove(observer)

    def notify(self, absence:str, designee:str):
        for observer in self.observers:
            observer.update(absence, designee)
```


主程式如下。

* C#
```
//Create observers
IObserver pbx = new ObserverPbx();
IObserver ms = new ObserverMailServer();

//Create subject
ISubject subject = new SubjectEflow();
subject.Attach(pbx);
subject.Attach(ms);

//Notify when JB is leave of absence
subject.Notify("JB", "Hachi");
```

* Python
```
# Create observers
pbx = ObserverPbx()
ms = ObserverMailServer()
    
# Create subject
subject = SubjectEflow()
subject.attach(pbx)
subject.attach(ms)

# Notify when JB is leave of absence
subject.notify("JB", "Hachi")
```


輸出結果：

*[PBX] 已指定轉接JB的來電給Hachi*
*[Mail Server] 已設定將JB的信副本給Hachi!*


## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/Observer)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtObserver.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/Observer)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/Observer/UtObserver.py)


