# 在ASP.NET MVC利用狀態模式來製造View Model

## Scenario

我們在[Day26](https://ithelp.ithome.com.tw/articles/10197179)時，利用了建造者模式來製造View Model。
在這個例子，我們要改用狀態模式(State)來達成相同需求。

## Why use State pattern?

在狀態模式下，我們可以透過已經定義好的State來執行不同狀態下的行為(策略)。
其實它也可以解決累贅的多重判斷程式碼(例如IF..ELSE IF..ELSE):

1. 在State類別裡面可以判斷Context內容決定下一個狀態
2. 改變狀態後會執行裡面的邏輯


在這個範例中，我們將每個建立View Model裡面的子Model資料(父母、小孩、寵物...etc)各自做為一個狀態類別，並在Context類別裡偷塞一個View Model物件，以在每一個狀態改變的時候，逐步建立整個View Model。

## Sample Codes

- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Website)



### 建立View Models

以下Model延用[Day26](https://ithelp.ithome.com.tw/articles/10197179)的程式碼。

* \Models\Builder\
```
public class Home
{
    public string Address { get; set; }
    public List<Parent> Parents { get; set; }
    public List<Child> Children { get; set; }
    public List<Pet> Pets { get; set; }
}
public class Parent
{
    public string Id { get; set; }

    [DisplayName("父母姓名")]
    public string Name { get; set; }
}
public class Child
{
    public string Id { get; set; }

    [DisplayName("小孩姓名")]
    public string Name {get;set;}

    [DisplayName("生日")]
    public string Birthday { get; set; }
}
public class Pet
{
    public string Id { get; set; }

    [DisplayName("名字")] 
    public string Name { get; set; }

    [DisplayName("寵物")]
    public string PetType { get; set; }
}
```

### 實做狀態模式的States


* \Domain\State\
```
public abstract class State
{
    public abstract void Action(HomeContext context);
}

public class StateSkywalkerParent : State
{
    public override void Action(HomeContext context)
    {
 
        context.Home.Parents = new List<Parent>{
            new Parent() { Name = "Anakin Skywalker"},
            new Parent() { Name = "Princess Amidala"},
        };

        //Set next state
        context.CurrentState = new StateSkywalkerChild();
    }
}

public class StateSkywalkerChild : State
{
    public override void Action(HomeContext context)
    {
        context.Home.Children = new List<Child>{
            new Child(){Name="Luke Skywalker", Birthday="2099/5/4"},
            new Child(){Name="Luke Skywalker", Birthday="2099/5/4"}
        };

        //Set next state
        context.CurrentState = new StateSkywalkerPet();
    }
}

public class StateSkywalkerPet : State
{
    public override void Action(HomeContext context)
    {
        context.Home.Pets = new List<Pet>{
            new Pet(){Name="Jar Jar Binks", PetType="Gungan"}    
        };

        //Set next state
        context.CurrentState = null;
    }
}
```


### 實做狀態模式的Context

```
public class HomeContext
{
    public Home Home { get; set; }

    private State _state { get; set; }
    public State CurrentState
    {
        get { return this._state; }
        set { this._state = value; }
    }

    public HomeContext(HomeEnum homeEnum)
    {
        this.Home = new Home();

        //Set default state
        switch (homeEnum)
        {
            case HomeEnum.Skywalker:
                this._state = new StateSkywalkerParent();
                break;
            case HomeEnum.Solo:
                this._state = new StateSoloParent();
                break;
            default:
                throw new System.Exception($"No mapping states with HomeEnum: {homeEnum.ToString()}");
        }
    }

    public void Action()
    {
        this._state.Action(this);
    }
}
```



### 主程式

最後我們回到Controller，並把狀態模式更新到產生View Model的程式碼：

* \Controllers\HomeController.cs
```
 public IActionResult State()
{
    var context = new HomeContext(HomeEnum.Skywalker);
    while (context.CurrentState!=null)
    {
        context.Action();
    }

    Home viewModel = context.Home;
    return View(viewModel);
}
```


執行畫面如下：

![](https://1.bp.blogspot.com/-z4wt0mn0jDA/WlnR04f_TfI/AAAAAAAAFsM/D3_sNf6s4CgvtsX6l_kVOQ_t7xdVM7MqACLcBGAs/s1600/skywalker.png)


當我們改變預設的`HomeEnum`列舉時：
`var context = new HomeContext(HomeEnum.Solo);`

![](https://3.bp.blogspot.com/-dqJgO-OP3tU/WlnR0zhaztI/AAAAAAAAFsQ/lVXYqC7ReZY3stBIsakfNDcvYMJEkpMugCLcBGAs/s1600/solo.png)



## Reference
- [以State Pattern取代巢狀迴圈](http://karatejb.blogspot.tw/2015/06/state-pattern.html)
