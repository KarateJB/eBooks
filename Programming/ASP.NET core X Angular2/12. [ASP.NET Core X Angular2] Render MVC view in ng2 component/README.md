## Introduction

So far we had created components with `template` or `template url`. Now the question is, CAN we RENDER MVC VIEW with `razor tags` and `Html helpers` in angular COMPONENT? 
The answer is **YES**! 
Let's try and find it out!

## Environment

* Visual Studio 2015 Update 3  
* Microsoft.AspNetCore.Mvc 1.0.0
* Angular 2.1.0


## Implement


#### Create the following MVC controller and views

 ![MVC](https://1.bp.blogspot.com/-ZxRl4_Uek6k/WF87KTWQMQI/AAAAAAAAECI/Vbf5QKMsuTYyi8ti9ZmkvJFxWeE-pbcKgCLcB/s1600/image001.png)


#### Routing、 modules、components

Follow the steps in [Day 6 - Routing](http://ithelp.ithome.com.tw/articles/10186741), and create
1. `customermvc.main.ts`
2. `customermvc.app.comp.ts`
3. `customermvc.route.ts`

The routes will include "Index", "Create" and "Edit" routes.

```
const appRoutes: Routes = [
    { path: 'Basic/CustomerMvc/Index', component: CustomerMvcListComp },
    { path: 'Basic/CustomerMvc/Create', component: CustomerMvcCreateComp },
    { path: 'Basic/CustomerMvc/Edit/:id', component: CustomerMvcEditComp },
    { path: '', redirectTo: '/Basic/CustomerMvc/Index', pathMatch: 'full' }
];
```

We will implement the Index page for example.


#### Set MVC controller/view

Just create the MVC view like it used to be.

* CustomerMvcController.cs

```
[Route("[action]")]
public IActionResult Index()
{
    return View();
}
```

* Index.cshtml

```
@model List<Angular2.Mvc.Core.Models.ViewModel.VmCustomer>

<div>
    <input type="button" class="btn btn-primary" value="Create New" (click)="goToCreate()" />
</div>
<br />

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
                    <td class="col-sm-2">
                        <input type="button" class="btn btn-info" value="Edit" (click)="editCustomer(@item.Id)" />
                         
                        <input type="button" class="btn btn-danger" value="Delete" (click)="deleteCustomer(@item.Id)" />
                    </td>
                </tr>
            }
        }
    </tbody>
</table>
```

#### Angular: Component

Since we have the MVC view, lets create the component for it.

* customermvc.list.comp.ts

Notice that we should set the `templateUrl` to the *MVC routing path*.

```
import {Component, OnInit, Inject, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {Customer} from '../../../class/Customer';

@Component({
    selector: 'customermvc-list',
    templateUrl: '/Basic/CustomerMvc/List'
})

export class CustomerMvcListComp {
    constructor(
        private router: Router) {
        }

    //Get to edit page
    private goToCreate() {
        this.router.navigate(['Basic/CustomerMvc/Create']);
    }

    //Get to edit page
    private editCustomer(id: number) {
        this.router.navigate(['Basic/CustomerMvc/Edit', id]);
    }

          
    private deleteCustomer(id: number) {
        //Remove …
    }
}
```

#### Run the application

![Demo1](https://4.bp.blogspot.com/-LYYbKOkbDZI/WF87KaSLs4I/AAAAAAAAECM/b0I432_p-RIhLNAbdSLFJYvk6Zudq6kKgCLcB/s1600/image002.jpg)


### Event Listener

We could add event callback to a DOM in codes by [ElementRef](https://angular.io/docs/js/latest/api/core/index/ElementRef-class.html) class. 
For example, we want to let the message popup while user click an image.

* Create.cshtml

```
<img id='tipImg' style='width: 30px; height: 30px;' src='XXX' />
<!--Skip other html in Create page -->
```

* customermvc.create.comp.ts

```
import {Component, OnInit, ElementRef} from '@angular/core';


@Component({
    selector: 'customermvc-create',
    templateUrl: '/Basic/CustomerMvc/Create'
})

export class CustomerMvcCreateComp implements OnInit {

    constructor(
        private elementRef: ElementRef) {
        }

    ngOnInit() {
        this.addEventListner();
    }

    private addEventListner() {
        let el = this.elementRef.nativeElement.querySelector("#tipImg");
        if (el) {
            el.addEventListener('click', e => {
                e.preventDefault();
                this.showTip();
            });
        }
    }

    private showTip() {
        swal(
            'Tip',
            'Required information : Name, Phone.'
        ).then(function () {
        });
    }
    //...
}
```

#### Demo

![Demo2](https://2.bp.blogspot.com/-EJbZ6yUN3pI/WF87LQ-D_OI/AAAAAAAAECc/SJU7NIeC_tkM_VepJRgUpPDmFZ1Ow1PVACLcB/s1600/image003.gif)


## Issues

When I try to navigate to the Edit page with an ID in angular component, I found it's impossible to send the ID to MVC controller, so although the `edit component` could have the right html but there won't be any initial value.

![](https://4.bp.blogspot.com/-KPbb6p65stY/WF87K5RBcmI/AAAAAAAAECQ/wD5KzkgFuSkQ5a9Ari3-tjyhNWVWQcx8ACLcB/s1600/image004.png)

![](https://1.bp.blogspot.com/-PmzlDlk7zXg/WF87KzVlEYI/AAAAAAAAECU/EV95icaEWIgGFSHb0YET4N4jW-c-frMuACLcB/s1600/image005.png)


The solution to overcome this issue is using `ngModel` and load the initial value by ajax.

* edit.cshtml

```
<input type="text" asp-for="Name" [(ngModel)]="name" class="form-control"/>
```


* edit component

```
ngOnInit() {

    //Get route parameter
    this.route.params.subscribe(params => {
        let custIdValue = params['id'];
        let custId = +custIdValue; //Equales to parseInt

        this.custService.get(custId).then(cust => { //By ajax
            this.id = cust.Id;
            this.name = cust.Name;
            this.age = cust.Age;
            this.phone = cust.Phone;
            this.description = cust.Description;
        })
    });
}
```

#### Result

![](https://1.bp.blogspot.com/-l8BMMvxRD4g/WF87LGTRnCI/AAAAAAAAECY/Mutjgj9xWqgmClq2FjKFDJsQWNlpPFFGwCLcB/s1600/image006.png)


## Reference

N/A

