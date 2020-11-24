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

View Model的定義仍延用[Day26](https://ithelp.ithome.com.tw/articles/10197179)的程式碼。 

另外新增一個`HomeEnum`做為狀態模式裡Context的建構子參數，以決定第一個狀態。

* \Domain\State\HomeEnum.cs
```
public enum HomeEnum
{
    Skywalker=1,
    Solo
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

PS. 仿造上面程式碼分別建立`StateSoloParent`、`StateSoloChild`、`StateSoloPet`。


### 實做狀態模式的Context

並在Context中定義一個View Model: Home 的屬性，即`public Home Home { get; set; }`。

另多重判斷的邏輯，我們也可以藉由狀態模式來拆解。
例如底下在初始化目前的狀態物件時，依據不同的條件(`HomeEnum`)來決定第一個狀態要指定`StateSkywalkerParent`或`StateSoloParent`。


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


當我們改變預設的`HomeEnum`列舉值時：
`var context = new HomeContext(HomeEnum.Solo);`

![](https://3.bp.blogspot.com/-dqJgO-OP3tU/WlnR0zhaztI/AAAAAAAAFsQ/lVXYqC7ReZY3stBIsakfNDcvYMJEkpMugCLcBGAs/s1600/solo.png)

實際上與[Day26.在ASP.NET MVC利用建造者模式來製造View Model](https://ithelp.ithome.com.tw/articles/10197179)的執行結果是一致的。


> 你用了兩個設計模式來實作同一個需求，實務上要如何選擇呢？

運用你的~~原力~~直覺和經驗! 沒有最好的設計，只有當下最適合的設計。
每個設計模式有它主要解決的問題，但是如果變化、組合、打破可以解決問題，那麼它們就是你的Best Practice!


## Reference
- [以State Pattern取代巢狀迴圈](http://karatejb.blogspot.tw/2015/06/state-pattern.html)
