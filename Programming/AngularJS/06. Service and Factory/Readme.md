## Introduction

When things become complicated in the front end, we will try to organize our javascripts for reusing, sharing and maintainability.

In AngularJS, we can use [$rootScope](https://docs.angularjs.org/api/ng/service/$rootScope) or [Services](https://docs.angularjs.org/guide/services) , such like `Service` and `factory`, to achieve the above goals.


## Samples

### $rootScope

> Explanation from AngularJS Documents :
> 
> Every application has a single root scope. All other scopes are descendant scopes of the root scope.


Sample Codes

* root-scope.js

```
var app = angular.module('app')
.run(function ($rootScope) {

    $rootScope.WebSiteName = "MyWebSite";

});
```

* my-controller.js

```
var app = angular.module('app', [])
.controller('RegisterCtrl', function ($scope,$rootScope) {
    var redirectUrl = window.location.origin + "/" + $rootScope.WebSiteName + "/Authentication/User";

});
```


### Service

* customer-service.js

```
var contactapp = angular.module('customerapp', []).
service('CustomerService', function ($http) {

    var GetAllCustomers = function () {

        return $http.get(getUri).error(function (status, headers, config) {
            console.log(status, headers, config);
        }).then(function (response) {
            return response;
        }).catch(function (e) {
            throw e;
        });
    };

    return GetAllCustomers;
});
```

* my-controller.js

```
var app =
angular.module('app', ['customerapp'])
.controller('CustomerCreateCtrl', function ($scope, CustomerService) {
   
    var getPromise = CustomerService(); //For service
    getPromise.then(function (response) {

            angular.forEach(response.data, function (item) {
                var option = {};
                option.CustomerId = item.CustomerId;
                option.isEnabled = true;
                $scope.CustomerOptions.push(option);
            });

        }).catch(function (e) {
            swal("無法查詢所有客戶資訊，請稍後嘗試!", "", "error");
        })
});
```



### Factory

```
var contactapp = angular.module('customerapp',[])
.factory('CustomerFactory', function ($http) {

    var factory = {};

    factory.KeyWords = 'Key words';

    factory.GetAllAvailableCustomer =
        function () {
              //return somthing
        };

    //Get
    factory.GetCustomer =
        function (inChargeId) {
             //return somthing
        };

    //Create
    factory.CreateCustomer =
        function (entity) {
             //return somthing
        };
    return factory;
});
```

```
var app =
angular.module('app', ['customerapp'])
.controller('CustomerCreateCtrl', function ($scope, CustomerFacory) {
     CustomerFactory.GetAllAvailableCustomer(); //For factory
     $scope.KeyWords = CustomerFactory.KeyWords;
});
```



## Reference
1. [AngularJS Guide : $rootScope](https://docs.angularjs.org/api/ng/service/$rootScope)
2. [AngularJS Guide : Services](https://docs.angularjs.org/guide/services)
