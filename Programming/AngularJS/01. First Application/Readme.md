## Introduction
---
Some basis practice with AngularJS.

## Environment
---
* Bootstrap v3.3.4
* AngularJS v1.5.2


## 實作：基本Model Binding及控制

#### 基本Model Binding及控制

* HTML

```
<html ng-app="app">
<head>
    <title>Bootstrap Demo</title>
    <script src="~/Scripts/angular.min.js"></script>
</head>
<body>
  <p>Hello, {{myName || 'everyone'}}!</p>
  <input type="text" ng-model="myName" />
</body>
</html>
```

> 1.  需要在<html>標籤上加入 ng-app=”XXX” 的關鍵字。
> 2.  <input type="text" ng-model="myName" /> 表示在此控制項，綁定一個model名稱為 myName。 
> 3.  {{myName || 'everyone'}} 表示使用頁面上的model 值，如果Model值沒有值，則顯示’everyone’。 



## 實作：加入Controller及Filter功能實作一「可動態新增/刪除待做事項」

#### 預期結果

1. 按下新增按鈕後，可加入待做事項，點選待做事項的Checkbox後，可將其移至完成清單。

![](assets/001.jpg) 

#### Step1.先建立可新增/查看待做事項的UI，僅列出Controller定義的Model(待做事項)資料

* HTML
1. 加入ng-app的宣告
2. 加入`controllers.js`的引用路徑宣告（可先新增實體檔案，或到下一步驟說明時再新增）
3. 在需引用Controller的範圍內，宣告 `ng-controller=[Controller Name]`的宣告。 此例為`<div ng-controller="TodoCtrl">`
4. 以`ng-repeat`將Controller中定義的物件集合：todoList ，以`<tr></tr>`為單位重複（repeat）列印出來。

```
<html ng-app="app">
<head>
    <script src="~/Scripts/angular.min.js"></script>
    <script src="~/Scripts/AngularJsController/controllers.js"></script>
</head>
<body>
    <div ng-controller="TodoCtrl">
<form >
Name :
<input type="text" name="newName" /><br />
Action :
<input type="text" name="newAction" />
<input type="submit" id="submit" value="新增" />
</form>
<br />
TODO List :
<hr />
            <table data-toggle="table" class="table">
                <tr>
                    <td></td>
                    <td>Name</td>
                    <td>Action</td>
                </tr>
                <tr ng-repeat="item in todoList">
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>{{item.MyName}}</td>
                    <td>{{item.MyAction}}</td>
                </tr>
            </table>
    </div>
</body>
</html>
```

* Controllers.js

在Controllers.js宣告一個'TodoCtrl'的Controller，定義$scope (For two-way binding)的元素目前僅有$scope.todoList. 

```
var app = angular.module(‘app’, []).controller(‘TodoCtrl', function ($scope) {
    var newName = "";
    var newAction = "";
    var newIsFinish = false;

    $scope.todoList = [{ MyName: "JB", MyAction: "Buy Milk", IsFinish: false }, { MyName: "JB", MyAction: "See Movie", IsFinish: false }];

});
```

* 執行結果

目前僅可在頁面查看Binding自 TodoCtrl的`$scope.todoList`資料。 

![](assets/002.jpg) 


#### Step2.加入可動態新增待做事項的功能

* HTML (僅列出有調整的部分)

在<form>上加入關鍵字 ng-submit=[指定的Controller function] ，並在兩個textbox上做 ng-model binding。

```
<div ng-controller=”TodoCtrl">
@*… 略*@
<form ng-submit="addItem()">
    Name :
    <input type="text" name="newName" ng-model="newName" /><br />
    Action :
    <input type="text" name="newAction" ng-model="newAction" />
    <input type="submit" id="submit" value="新增" />
</form>
@*… 略*@
</div>
```

* Controllers 

```
var app = angular.module('app', []).controller('TodoCtrl', function ($scope) {
    $scope.newName = "";
    $scope.newAction = "";
    $scope.newIsFinish = false;

    $scope.todoList = [
        { MyName: "JB", MyAction: "Buy Milk", IsFinish: false },
        { MyName: "JB", MyAction: "See Movie", IsFinish: false }];

    $scope.addItem = function () {
        if (this.newName && this.newAction) {
            this.todoList.push({ MyName: this.newName, MyAction: this.newAction, IsFinish: this.newIsFinish });
            this.newName = "";
            this.newAction = "";
        }
    }
});
```

* Step2 執行結果

 ![](assets/003.jpg)

 ![](assets/004.jpg)


#### Step3.以Filter建立已完成項目

* HTML

1. 在ng-repeat裡面加入Filter : `"item in todoList | filter:{IsFinish:false}"`
表示只取得IsFinish為false的元素。
2. 在待作事項的Checkbox加入 `ng-click="removeItem(item)"`， 等下需要在Controller裡面宣告此函數。

```
<html ng-app="app">
<head>
    <script src="~/Scripts/angular.min.js"></script>
    <script src="~/Scripts/AngularJsController/controllers.js"></script>
</head>
<body>
    <div ng-controller="TodoCtrl">
            <form ng-submit="addItem()">
                Name :
                <input type="text" name="newName" ng-model="newName" /><br />
                Action :
                <input type="text" name="newAction" ng-model="newAction" />
                <input type="submit" id="submit" value="新增" />
            </form>
            <br />
            TODO List :
            <hr />
            <table data-toggle="table" class="table">
                <tr>
                    <td></td>
                    <td>Name</td>
                    <td>Action</td>
                </tr>
                <tr ng-repeat="item in todoList | filter:{IsFinish:false}">
                    <td>
                        <input type="checkbox" ng-click="removeItem(item)" />
                    </td>
                    <td>{{item.MyName}}</td>
                    <td>{{item.MyAction}}</td>
                </tr>
            </table>
            <br />
            Finished TODO List :
            <hr />
            <table data-toggle="table" class="table">
                <tr>
                    <td>Name</td>
                    <td>Action</td>
                </tr>
                <tr ng-repeat="item in todoList | filter:{IsFinish:true}">
                    <td>{{item.MyName}}</td>
                    <td>{{item.MyAction}}</td>
                </tr>
            </table>
        </div>
</body>
</html>
```

* Controllers

```
var app = angular.module('app', [])
.controller('TodoCtrl', function ($scope) {
    $scope.newName = "";
    $scope.newAction = "";
    $scope.newIsFinish = false;


    $scope.todoList = [
        { MyName: "JB", MyAction: "Buy Milk", IsFinish: false },
        { MyName: "JB", MyAction: "See Movie", IsFinish: false }];

    $scope.addItem = function () {
        if (this.newName && this.newAction) {
            this.todoList.push({ MyName: this.newName, MyAction: this.newAction, IsFinish: this.newIsFinish });
            this.newName = "";
            this.newAction = "";
        }
    }

    $scope.removeItem = function (item) {
        item.IsFinish = true;
    }
});
```


* Step3 執行結果

![](assets/005.jpg)
 


