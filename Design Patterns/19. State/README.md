# State 狀態模式

## 需求描述

Amy(PO):
> As a 提需求單的使用者
> I want 需求單管理系統支援在某個需求的狀態改變時，記錄時間並以Email通知同仁
> So that 任何人可以輕易的識別目前需求的狀態


## 思考設計

JB:<br>
我想可以透過一個`switch`來判斷某個需求目前的狀態，然後執行對應的作業。

Hachi:<br>
恩，不過依照我們在[Day5.Chain of Responsibility 職責鍊模式](https://ithelp.ithome.com.tw/articles/10193451)的經驗，用`switch`可不是個好主意。
我們需要設定一個可以在每個狀態流動的模型，然後依照每個狀態去執行對應的動作。

Lily:<br>
我們可以使用狀態模式(State)來實作這個需求，避免多重判斷的程式碼。
而且還可以設定這些狀態的順序。

JB:<br>:
聽起來不錯! 不過職責鍊也提供了有順序的作業，他們有何不同呢？

Lily:<br>
我們先用狀態模式實作這個需求，然後我們討論這兩種模式的使用時機。



## 定義

> 實作每個狀態的對應類別，當對象的狀態改變時，透過這些狀態類別定義的方法來執行對應的策略。([WIKI](https://en.wikipedia.org/wiki/State_pattern))


實作狀態模式的方式：
1. 建立每一種狀態的類別，它們定義了該狀態下要做那些事，以及決定下一個狀態。
2. 建立存放狀態的對象(Context)，它具有執行作業的權力。


### State

我們假設需求管理系統裡面的一項需求，具有以下四種狀態：
1. TODO 
2. Working
3. Testing
4. Done

* C#
```
public abstract class State
{
    public abstract void Action(Context context);
}

//TODO
public class StateToDo : State
{
    public override void Action(Context context)
    {
        //Do something

        //Set next state
        context.CurrentState = new StateWorking();
        Trace.WriteLine("The requirement is on TODO list, send email to IT manager.");
    }
}

///Working
public class StateWorking : State
{
    public override void Action(Context context)
    {
        //Do something

        //Set next state
        context.CurrentState = new StateTesting();
        Trace.WriteLine("The requirement is completed, send email to users!");
    }
}

///Testing
public class StateTesting : State
{
    public override void Action(Context context)
    {
        //Do something

        //Set next state
        context.CurrentState = new StateDone();
        Trace.WriteLine("Test ok, send email to operation team!");
    }
}

///Done
public class StateDone : State
{
    public override void Action(Context context)
    {
        //Do something
        
        //No next state
        context.CurrentState = null;
        Trace.WriteLine("Close the requirement, send email to all stakeholders!");
    }
}
```

* Python
```
```


### Context

由State的程式碼，我們得知在每一次Context開始作業(`Action()`)時，必須把它自己作為參數丟給當下狀態對應的State類別，再由State類別去做事以及更新Context最新的狀態。


* C#
```
public class Context
{
    private State _state { get; set; }
    public State CurrentState
    {
        get { return this._state; }
        set { this._state = value; }
    }

    public Context()
    {
        //Set default state
        this._state = new StateToDo();
    }

    public void Action()
    {
        this._state.Action(this);
    }
}
```

* Python
```
```


我們來看一個標準的State使用範例：

* C#
```
var context = new Context();
while (context.CurrentState!=null)
{
    actualFinalState = context.CurrentState.ToString();
    context.Action();
}
```

* Python
```
```

 執行結果：
*The requirement is on TODO list, send email to IT manager.*
*The requirement is completed, send email to users!*
*Test ok, send email to operation team!*
*Close the requirement, send email to all stakeholders!*



假設在使用者測試(Testing)時發現Defect，必須回到上一狀態(Working)讓開發團隊處理。
我們可以額外定義一個`PreviousAction()`方法來回到上一個狀態：

* C#
```
public abstract class State
{
    public abstract void Action(Context context);
    public abstract void PreviousAction(Context context);
    
}

///僅列出測試狀態的類別
public class StateTesting : State
{
    //Skip...

    public override void PreviousAction(Context context)
    {
        //Do something

        //Set next state
        context.CurrentState = new StateWorking();
        Trace.WriteLine("Test NG, send email to development team!");
    }
}

public class Context
{
    //Skip...

    public void PreviousAction()
    {
        this._state.PreviousAction(this);
    }

}

///主程式(回到上一個狀態)
if (hasDefect)
{
    context.PreviousAction();
}
```

* Python
```
```

執行結果：
*The requirement is on TODO list, send email to IT manager.*
*The requirement is completed, send email to users!*
*Test NG, send email to development team!*  => 測試失敗，回到上一個狀態!
*The requirement is completed, send email to users!*
*Test ok, send email to operation team!*
*Close the requirement, send email to all stakeholders!*




### State vs Chain of Responsibility




## Sample Codes

1. C#
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Domain/Samples/ChainOfResponsibility)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.UnitTest/UtChainOfResposibility.cs)

2. Python
- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/Python/Samples/ChainOfResponsibility)
- [Unit Test](https://github.com/KarateJB/DesignPattern.Sample/blob/master/Python/Samples/ChainOfResponsibility/UtChainOfResponsibility.py)


## Reference

- [Design Pattern : Chain of Responsibility](http://karatejb.blogspot.tw/2013/10/design-pattern-chain-of-responsibility.html)
