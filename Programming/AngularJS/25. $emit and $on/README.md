## Introduction

Similar to `$broadcast`, `$emit` is using for broadcasting an event. 
The difference between them is that `$broadcast` broadcasts parent's event to all child scopes, 
however, `$emit` does the opposite way and broadcasts the child's event to all of its parent scopes.

In this sample, I am going to modify the original sample codes of `$broadcast` and make the
Parent's checkboxes be checked while the ones are checked in directive.


## Implement

* Html

```
<div ng-app="app" ng-controller="AppCtrl">
    <div>
        <table class="list">
            <tr ng-repeat="item in Customers" ng-class="item.customClass">
                <td><input type="checkbox" ng-checked="item.IsChecked" ng-click="setChecked(item)"></td>
                <td><label class="control-label">{{item.Name}}</label></td>
            </tr>
        </table>
    </div>
    <hr />
    <div ng-repeat="item in Customers">
        <angu-customer ng-model="item" id="{{item.Id}}" />
    </div>
</div>
```


* Directive

```
angular.module('app', [])
  .directive('anguCustomer', function ($http, $q) {

      var templatehtml = '<table class="table">' +
        '<tr><td><input type="checkbox" ng-checked="Customer.IsChecked" ng-click="setChecked(Customer)"/></td><td>' +
        '<input type="text" ng-model="Customer.Name" value="{{Customer.Name}}" />' +
        '</td><td>' +
        '<input type="text" ng-model="Customer.Phone" value="{{Customer.Phone}}" />' +
        '</td></tr></table>';

      return {
          //restrict: "A",
          scope: {
              Customer: "=ngModel",
              id: "@"
          },
          template: templatehtml,
          link: function ($scope, $element) {

              $scope.setChecked = function (customer) {
                  customer.IsChecked = !customer.IsChecked;
                  $scope.$emit('customer:setChecked', $scope.id, $scope.Customer.IsChecked);

              }

          },
          controller: function ($scope, $element) {

          }
      }
  })
```

> We will use `$emit` to broadcast an event : `customer:setChecked`.



* JS (Parent scope)

```
angular.module('app', [])
.controller('AppCtrl', function ($scope) {

      var scope = $scope;

      scope.Customers = [{
          'Id': 'C1',
          'Name': 'JB',
          'Phone': '0933XXXXXX',
          'IsChecked': false
      }, {
          'Id': 'C2',
          'Name': 'Lily',
          'Phone': '0910YYYYYY',
          'IsChecked': false
      }]

      scope.$on('customer:setChecked', function (event, elementId, value) {
          angular.forEach(scope.Customers, function (cust) {
              if (cust.Id === elementId) {
                  if (value == true) {
                      cust.customClass = "highlight";
                      cust.IsChecked = true;
                  } else {
                      cust.customClass = "";
                      cust.IsChecked = false;
                  }
              }
          })
      });
})
```

> Use `$on` to listen for the event from child scope.



([See sample codes on CodePen](http://codepen.io/KarateJB/pen/WGQPjj?editors=1111))
 



## Reference
1. [Use $Broadcast(), $Emit() And $On() In AngularJS](http://www.binaryintellect.net/articles/5d8be0b6-e294-457e-82b0-ba7cc10cae0e.aspx)