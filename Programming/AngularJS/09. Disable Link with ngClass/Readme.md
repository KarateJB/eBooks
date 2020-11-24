## Introduction
We cannot directly disable a link (`< a href >`) by `ngDisabled`.
However, we can change the CSS by `ngClass` to disable it.


## Implement

* CSS

```
.linkdisabled {
  color: darkgrey;
  cursor: default;
  pointer-events: none;
}
```


* HTML

```
<div ng-app="app" ng-controller="MyCtrl">
  <a href="#" ng-class='LinkStyle'>My Link</a>
  <br><br>
  <input type="button" value="Enable Link" ng-click="EnableLink()" />
  <input type="button" value="Disable Link" ng-click="DisableLink()" />
</div>
```


* JS

```
var app = angular.module('app', [])
  .controller('MyCtrl', function($scope) {

    $scope.EnableLink = function() {
      $scope.LinkStyle = "";
    }
    $scope.DisableLink = function() {
      $scope.LinkStyle = "linkdisabled";
    }
});
```



 ([See sample codes HERE](http://codepen.io/KarateJB/pen/bEBYOE))



## Reference
1. [AngularJS - ng-disabled not working for Anchor tag](http://stackoverflow.com/questions/30479105/angularjs-ng-disabled-not-working-for-anchor-tag)
