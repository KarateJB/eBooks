## Introduction

In ASP.NET Core, [Html.Action](https://msdn.microsoft.com/en-us/library/system.web.mvc.html.childactionextensions.action(v=vs.118).aspx) has been replace by [View Components](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/view-components).
In my opinion, View Components is very similar to Partial View in rendering them to the HTML. However, View Components executes the `InvokeAsync` function before passing a model to the View. (We will talk about this later.)  

> Here are somethings that we should know about View Components,
> 1. Not reachable directly as an HTTP endpoint, they are invoked from your code (usually in a view). A view component never handles a request.
> 2. View component classes can be contained in any folder in the project.
> 3. It can uses dependency injection.
> 4. `InvokeAsync` exposes a method which can be called from a view, and it can take an arbitrary number of arguments.
> (From [ASP.NET Core Documents](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/view-components))

Let us take a look and learn how to use [View Components](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/view-components).

## Environment

* Visual Studio 2015 Update 3
* NPM: 3.10.3                                    
* Microsoft.AspNetCore.Mvc 1.0.0

## Implement


#### Create controller/view

Before we deep into View Components, create the controller and view as following.

![](https://2.bp.blogspot.com/-D0a0i6gfy48/WG459j9YOBI/AAAAAAAAEHs/-EQP7YS6ArsEcmm86To-3BU0g0MZGAGAACLcB/s1600/image001.png)

* CustomerVcController

```

[Area("Basic")]
[Route("Basic/[controller]/[action]")]
public class CustomerVcController : Controller
{
        public IActionResult Index()
        {
            return View();
        }
}
```

We will implement View later.

#### ViewComplonent : Default view

We could create the Default view in either
`Views\CustomerVc\Components\[View Component name]\Default.cshtml`
or
`Views\Shared\Components\[View Component name]\Default.cshtml`

The View Component will return the `Default.cshtml` as View in default.

![](https://3.bp.blogspot.com/-SXyLDSQbJC0/WG46LZuh6qI/AAAAAAAAEHw/qDK_JOCGs9gopv3_9WqsUvjvsKSNjSryACLcB/s1600/image002.png)

* Default.cshtml

```
@model List<Angular2.Mvc.Core.Models.ViewModel.VmCustomer>


<div class="alert alert-info" role="alert">
    @{
        var title = "Hi, " + ViewBag.Description;
    }
    @title
</div>

<table class="table table-bordered table-hover">
    <thead>
        <tr>
            <th>
                @Html.DisplayNameFor(model => model.First().Name)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.First().Age)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.First().Phone)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.First().Description)
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        @if (Model != null)
        {
            foreach (var item in Model)
            {
                <tr>
                    <td class="col-sm-2">
                        @(new Microsoft.AspNetCore.Html.HtmlString(item.Name))
                    </td>
                    <td class="col-sm-2">
                        @Html.DisplayFor(modelItem => item.Age)
                    </td>
                    <td class="col-sm-1">
                        @Html.DisplayFor(modelItem => item.Phone)
                    </td>
                    <td class="col-sm-2">
                        @Html.DisplayFor(modelItem => item.Description)
                    </td>
                </tr>
            }
        }
    </tbody>
</table>
```

#### ViewComplonent : class

Notice that `ViewComponent` class can be put in any folder in the project.
I put it in the path just like controllers and views.

![](https://3.bp.blogspot.com/-nu6qNsCb37g/WG46bCmSRZI/AAAAAAAAEH0/ERvZtvtSalU6msdd9he1UuXVOrm2F3PqACLcB/s1600/image003.png)

* CustomerViewComponent.cs

The ViewComponent should inherit `ViewComponent` and implement `InvokeAsync` function.

```
[ViewComponent(Name = "CustomerVc")]
public class CustomerViewComponent : ViewComponent
{
        public async Task<IViewComponentResult> InvokeAsync(int? id, string name)
        {
            var items = await this.getCustomersAsync(id, name);
            ViewBag.Description = "this view is from ViewComponent.";
            return View(items); //Return Default.cshtml
        }

        private async Task<List<VmCustomer>> getCustomersAsync(int? id, string name)
        {
               //return something
        }
}
```

> The ViewComponent's name is "Customer" with the suffix “ViewComponent” of "CustomerViewComponent" being removed.
>
> We can specify the ViewComponent name by the Attribute:
`[ViewComponent(Name = "")]`


Okay, we had implemented the ViewComponent, let us see how to use it in View or Controller.

#### Use ViewComponent in View

* index.cshtml

```
@{
    Layout = "~/Views/Shared/_Layout.cshtml";
}
<div>
    @await Component.InvokeAsync("CustomerVc", new { name = "JB" })
</div>
```

![](https://3.bp.blogspot.com/-KF_fvqv8jXE/WG46pKnEhEI/AAAAAAAAEH4/j7eVBdZRdkw02eStIPmWVID1xJd0QiAewCLcB/s1600/image004.png)

Notice that View Components are still RENDERED ON SERVER SIDE, we will later use another way to render it in ajax way.


#### OR use ViewComponent in Controller

```
public IActionResult IndexVc()
{
   return ViewComponent("CustomerVc", new { name = "JB" });
}
```

### Result

![](https://3.bp.blogspot.com/-b20EtQNBtP4/WG47FySY08I/AAAAAAAAEIA/xLBKhVhL2V4cYeVgG8cW9_oaPnWfNelGQCLcB/s1600/image005.jpg)


#### ViewComplonent : Return different view

Before the ViewComponent returns a view, we invoke the `InvokeAsync()` function.
So we could implement some logics inside the ViewComponent.
Here is a simple example, we will let ViewComponent **return different view** which depending on the parameter value.


First we should create another view for our ViewComponent.

![](https://1.bp.blogspot.com/-5RCdrtEtfL8/WG47XL85EzI/AAAAAAAAEIE/paWJOQyZ4wsgGVELOEqM5x04R7I7lCJYwCLcB/s1600/image006.png)

And then update ViewComponent class.

* CustomerVcController.cs (Update)

```
public async Task<IViewComponentResult> InvokeAsync(string display, int? id, string name)
{
      var items = await this.getCustomersAsync(id, name);
      ViewBag.Description = "this view is from ViewComponent.";

      if (!string.IsNullOrEmpty(display) && display.ToLower().Equals("card"))
                return View("Card", items);
      else
                return View("Default", items);
}
```

* Index.cshtml (Update)

```
@{
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<div>
    @await Component.InvokeAsync("CustomerVc", new {display="Card",  name = "JB" })
</div>
```

### Result

![](https://1.bp.blogspot.com/-PvRBSH0QkhA/WG47ku9nltI/AAAAAAAAEIM/hAdhJvFzMWwkAVORbhWF2tJls6lpmci3ACLcB/s1600/image007.jpg)


### Ajax rendering

We can create a Http method in Controller and just return the view (HTML) thru ViewComponent. (Just like returning PartialView!)

* Controller

```
[HttpGet]
public IActionResult GetView([FromQuery] string name)
{
   return ViewComponent("CustomerVc", new { name = "JB" });
}
```

* Index.cshtml

```
<div id="ajaxCust"></div>
```

* javascript (jquery)

```
$(function () {
    renderViewComponent();

    function renderViewComponent() {
        $("#ajaxCust").html("");
        $.ajax({
            dataType: "html",
            url: getUri + "?name=Leia",
            success: function (cust) {
                $("#ajaxCust").append(cust);
            }
        })
    }
})
```

### Result

![](https://3.bp.blogspot.com/-3NgQrLoW24M/WG47wX6jSjI/AAAAAAAAEIQ/oo6asXQtMq0T-ijYu3U-zEK8-YnO81EZACLcB/s1600/image008.png)


## Reference

1. [ASP.NET Core Documents](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/view-components)
2. [.Net Core - Putting views into a tabs](http://stackoverflow.com/questions/40341386/net-core-putting-views-into-a-tabs/40342752#40342752)







