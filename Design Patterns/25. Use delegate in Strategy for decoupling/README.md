# 在策略模式使用委派解耦合

我們在先前的文章已用實例來說明GOF的
- Creational design patterns
- Structural design patterns
- Behavioral design patterns

這時候請您再回頭看看六大原則，相信會有更請清楚的領悟!

| <center>Principle</center> |  <center>aka</center> |
|:---------------------------------------------------|:----|
| Single responsibility principle                    | [SRP](https://en.wikipedia.org/wiki/Single_responsibility_principle) |
| Liskov Substitution Principle                      | [LSP](https://en.wikipedia.org/wiki/Liskov_substitution_principle) |
| Dependency inversion principle                     | [DIP](https://en.wikipedia.org/wiki/Dependency_inversion_principle) |
| Interface Segregation Principle                    | [ISP](https://en.wikipedia.org/wiki/Interface_segregation_principle) |
| The Law of Demeter (The least knowledge principle) | [LoD](https://en.wikipedia.org/wiki/Law_of_Demeter) |
| The open closed principle                          | [OCP](https://en.wikipedia.org/wiki/Open/closed_principle) |


接下來的幾天，我會用幾個案例來說明如何應用設計模式在實際上碰過的需求。
程式碼實作的部分則會以C#跟ASP.NET Core MVC為主； 
ASP.NET Core的學習和細節可以參考[John Wu](https://ithelp.ithome.com.tw/users/20107461/profile)大大精彩的系列文章：[ASP.NET Core 從入門到實用](https://ithelp.ithome.com.tw/users/20107461/ironman/1372)。


在設計程式時，我們通常會不希望業務邏輯相依於實際UI元件、外部資料存取或任何業務邏輯以外的資源。
BUT... 如果我們確實會在邏輯裡面用到這些我們定義和邏輯無關的程式碼怎麼辦？

例如以下的例子...

## Scenario

設計上傳檔案並在Server side讀取後轉入資料庫的功能；
但依據上傳檔案種類的不同，在更新資料庫前，讀取已存在資料庫裡面資料的欄位與上傳檔案新的資料做計算後，再更新。

我們會將**用不同檔案，更新資料庫"這一件事用策略模式來設計，因為每一種檔案代表必須執行不同的策略來計算新的欄位值。
但是策略裡面如何讀取和更新資料庫不該是這個策略關心的點，也不應該依賴於資料存取的細節。

所以我們加入[委派(delegate)](https://docs.microsoft.com/zh-tw/dotnet/csharp/programming-guide/delegates/using-delegates)到策略模式中來解耦合。

## Why use delegate in Strategy?

我們透過在建立策略實體時，一併提供包裝好的方法給策略裡面的委派，讓策略模式裡面只需要使用這些委派的方法來存取資料，不需要知道細節。


## Sample Codes

- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Website)


### MVC : View

先建立以下Demo用的View


* \Views\Home\Builder.cshtml
```
@model DP.Website.Models.Home

<div style="background-color:lightblue">
    @if (Model.Parents != null)
    {
        for (int i = 0; i < Model.Parents.Count(); i++)
        {
            @Html.Partial("_ParentPartial", Model.Parents.ToList()[i])
        }
    }
</div>


<div style="background-color:lightcyan">
    @if (Model.Children != null)
    {
        for (int i = 0; i < Model.Children.Count(); i++)
        {
            @Html.Partial("_ChildPartial", Model.Children.ToList()[i])
        }
    }
</div>

<div style="background-color:lightgreen">
    @if (Model.Pets != null)
    {
        for (int i = 0; i < Model.Pets.Count(); i++)
        {
            @Html.Partial("_PetPartial", Model.Pets.ToList()[i])
        }
    }
</div>
```


有了View和Controller，我們下面開始實作用建造者模式塞資料到View Model物件裡面。

### Builder

* \Domain\Builder\Builder.cs 
```
public abstract class Builder
{
        /// 建立物件
    abstract public Home Init();

    abstract public void BuildParent(Home home);
    abstract public void BuildChild(Home home);
    abstract public void BuildPet(Home home);
}
```

### Director

讓Director來負責處理"如何建造"。

* \Domain\Builder\Director.cs 
```
public class Director
{
    private Builder _builder;

    public Director(Builder builder)
    {
        this._builder = builder;
    }

    public Home Construct()
    {
        var home = this._builder.Init();
        this._builder.BuildParent(home);
        this._builder.BuildChild(home);
        this._builder.BuildPet(home);
        return home;
    }
}
```

### Concrete Builders

現在我們可以專心實作"建造"的細節。
假設我們需要建造兩個不同的星際大戰小家庭：
1. 天行者家庭 (以安納金天行者及艾米達拉為首)
2. 索羅家庭 (以韓索羅及莉亞天行者為首)

所以我們建立兩個ConcreteBuilder如下：

* \Domain\Builder\
```
public class Builder4Skywlker : Builder
{
    public override Home Init()
    {
        return new Home
        {
            Address = "Naboo"
        };
    }
    public override void BuildParent(Home home)
    {
        home.Parents = new List<Parent>{
            new Parent() { Name = "Anakin Skywalker"},
            new Parent() { Name = "Princess Amidala"},

        };
    }

    public override void BuildChild(Home home)
    {
        home.Children = new List<Child>{
            new Child(){Name="Luke Skywalker", Birthday="2099/5/4"},
            new Child(){Name="Luke Skywalker", Birthday="2099/5/4"}
        };
    }

    public override void BuildPet(Home home)
    {
        home.Pets = new List<Pet>{
            new Pet(){Name="Jar Jar Binks", PetType="Gungan"}    
        };
    }
}

public class Builder4Solo : Builder
{
    public override Home Init()
    {
        return new Home
        {
            Address = "Milian falcon"
        };
    }
    public override void BuildParent(Home home)
    {
        home.Parents = new List<Parent>{
            new Parent() { Name = "Han Solo"},
            new Parent() { Name = "Leia Skywalker"},

        };
    }

    public override void BuildChild(Home home)
    {
        home.Children = new List<Child>{
            new Child(){Name="Ben Solo", Birthday="2123/5/4"}
        };
    }

    public override void BuildPet(Home home)
    { 
        //Not a good idea of putting Chewbacca here...
    }
}
```

由上面程式碼可以看到`Builder4Solo`(索羅家庭)並沒有寵物(如果以產品來看，就是不提供這個規格)。


### 主程式

最後我們回到Controller，並把建造者模式更新到產生View Model的程式碼：

* \Controllers\HomeController.cs
```
public IActionResult Builder()
{
    Builder builder = new Builder4Skywlker();
    var director = new Director(builder);
    //Build it!
    Home viewModel = director.Construct();
    return View(viewModel);
}
```


執行畫面如下：

![](https://1.bp.blogspot.com/-z4wt0mn0jDA/WlnR04f_TfI/AAAAAAAAFsM/D3_sNf6s4CgvtsX6l_kVOQ_t7xdVM7MqACLcBGAs/s1600/skywalker.png)


當我們抽換ConcreteBuilder時：
`Builder builder = new Builder4Solo();`

![](https://3.bp.blogspot.com/-dqJgO-OP3tU/WlnR0zhaztI/AAAAAAAAFsQ/lVXYqC7ReZY3stBIsakfNDcvYMJEkpMugCLcBGAs/s1600/solo.png)



## Reference
- [Render PartialView dynamically with Builder patten](http://karatejb.blogspot.tw/2014/11/rendor-partialview-dynamically-with.html)
