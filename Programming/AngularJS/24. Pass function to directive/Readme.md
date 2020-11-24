## Introduction

Since we had learned how to create directive, we can pass parameters from **parent scope** to **directive**. 
The parameters could be *values*, *ngModels* or *functions*. 
**This article will show how to pass parent's function to directive, which results in the possibility for using the parent's function in directive.**



## Implement

### What we will do

We are going to initialize an integer array and create a totaling function in parent scope. Then we will pass the array and function to a directive and the directive will list the integers and calculate the totaling number with the totaling function.



* JS

```
angular.module('app', [])
.controller('MainCtrl', function ($scope) {
    $scope.numbers = [10, 20, 30, 40, 50];
    $scope.calculate = function (numbers) {
        var total = 0;
        angular.forEach(numbers, function (num) {
            total += num;
        });
        return total;
    }

})
```


* Html

```
<div ng-app="app" ng-controller="MainCtrl">
    <div my-directive
         title="Math calculator"
         data="numbers"
         calculate-func="calculate"></div>
</div>
```



* Directive

```
angular.directive('myDirective', function(){
    var template = '<h3>{{title}}</h3><hr />' +
         '<table class="table"><thead><tr>'+
                   '<td>SN</td><td>Number</td>' +
                   '</tr></thead>'+
                   '<tbody>'+
                   '<tr ng-repeat="num in data"><td>{{$index}}</td><td>{{num}}</td></tr>' +
                   '<tr><td>Total</td><td>{{total}}</td></tr>'
    '</tbody>'+
    '</table>';
    return {
   
        scope: {
            title: "@",
            data: "=",
            calculateFunc: "&"
            //calculateFunc: "="
        },
        template : template,
        link: function($scope, $element, $attr){
            $scope.total = 0;
            $scope.total = $scope.calculateFunc()($scope.data);
            //$scope.total = $scope.calculateFunc($scope.data);
        },
        controller: function($scope, $element){
        }
    }
})
```

There are two ways for passing the parent's function:


| SN   | Parameter    |    Usage     |
| :--- |:-------------|:-------------|
| 1 | `calculateFunc: "&"` | `$scope.calculateFunc()(inputData);` |
| 2 | `calculateFunc: "="` | `$scope.calculateFunc(inputData);` |


([See sample codes on CodePen](http://codepen.io/KarateJB/pen/ORJjpR))


## Reference
1. [Creating custom angularjs directives part-3-isolate scope and function parameters](http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-3-isolate-scope-and-function-parameters)
2. [AngularJS - pass function to directive](http://stackoverflow.com/questions/18378520/angularjs-pass-function-to-directive)