# 在ASP.NET MVC利用建造者模式來製造View Model

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


## Scenario

專案中需要在MVC同一個VIEW上動態依照後端提供的每種產品規格(View Model)做隱藏/顯示欄位(選項)。 
本範例將使用建造者模式(Builder)來達到此目的。

## Why use Builder pattern?

我們先抓出這個需求相對複雜的地方：
1. View Model的屬性怎麼建立 => **要包含所有可能的資料，並切成更小的View Models**
2. 有了這些View Models，如何將資料組出最後要給View用的View Model => **一部分一部分組出來，但我們不希望Controller太笨重**
3. 未來可能再新增一個新產品 => **組出資料的邏輯需要可以被抽換**

建造者模式(Builder)可以在不需要知道細節的情況下建立一個完整的物件，並隨時抽換細節。
所以我們採用建造者模式來完成這個需求。


> 程式碼用比較好舉例的方式撰寫。 假設我們要成立一個小家庭(產品)，而每個小家庭有不同的規格(父母、小孩、寵物...etc)。<br>
> 在產出一筆小家庭的資料時，我們利用建造者模式來逐步建立"父母"、"小孩"、"寵物"的資料。


## Sample Codes

- [Source code](https://github.com/KarateJB/DesignPattern.Sample/tree/master/CSharp/DP.Website)


### 建立ASP.NET Core MVC專案

```
dotnet new mvc --name DP.Website
dotnet sln DP.sln add DP.Website/DP.Website.csproj
cd DP.Website
dotnet restore
dotnet build  
```


### 建立View Models

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

### MVC: Controller

有了ViewModel，我們先不管怎麼塞資料，先加上一個Action如下。

* \Controllers\HomeController.cs
```
public IActionResult Builder()
{
    Home viewModel = new Home();
    return View(viewModel);
}
```

### MVC : View

再分別建立對應的View和Partial Views

* \Views\Shared\_ParentPartial.cshtml
```
@model DP.Website.Models.Parent

<table class="table">
    <tr>
        <th>
            @Html.DisplayNameFor(model => model.Name)
        </th>
    </tr>

    @if (Model != null)
    {
        <tr>
            <td>
                @Html.DisplayFor(modelItem => Model.Name)
            </td>
        </tr>
    }
</table>
```

小孩(_ChildPartial.cshtml)和寵物的部分可以參考連結，就不佔篇幅。
* [\Views\Shared\_ChildPartial.cshtml](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.Website/Views/Shared/_ChildPartial.cshtml)
* [\Views\Shared\_PetPartial.cshtml](https://github.com/KarateJB/DesignPattern.Sample/blob/master/CSharp/DP.Website/Views/Shared/_PetPartial.cshtml)

接下來建立主要的View: 

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
