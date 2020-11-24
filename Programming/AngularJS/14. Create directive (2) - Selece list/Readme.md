## Background

Here is the sample of creating select list directive, which is binding the data source from `ASP.NET Web Api`.



## Implement

### $http factory

```
var app = angular.module('sexapp', ['app'])
.factory('SexFactory', function ($http, RestfulUriFactory) {


    var factory = {};

    //Get an Agent
    factory.GetAll =
        function (encryptId) {

            var getUri = RestfulUriFactory.GET_ALL_SEX_URI;

            return $http.get(getUri).error(function (status, headers, config) {
                console.log(status, headers, config);
            }).then(function (response) {
                return response;
            }).catch(function (e) {
                throw e;
            });
        };

    return factory;

});
```

### Directive

```
angular.module('directive-sex-app', ['sexapp'])
.factory('SexQueryFactory', function ($q, RestfulUriFactory, SexFactory) {

        var factory = {};

        factory.GetAll = function () {

            var getAllJob = $q.defer();
            var getAllJobPromise = getAllJob.promise;

            var getPromise = SexFactory.GetAll();

            getPromise.then(function (response) {

                getAllJob.resolve(response.data);
            });

            return getAllJobPromise;
        }

        return factory;
})
.directive('sex', function (SexQueryFactory) {
    return {
        scope: true,
        //return trmplate
        template: '<select class="form-control" ng-model="item.Sex" ng-options="option.Id as option.Name for option in SexOptions track by option.Id" />',
        link: function ($scope) {

        },
        controller: function ($scope, $element) {

            var getAllSexPromise = SexQueryFactory.GetAll();

            getAllSexPromise.then(function (data) {
                $scope.SexOptions = data;
            });
        }
    }
});
```

In directive, use the parameter : `template`, to create a select list html with ngModel.
The select list's data source will be loaded thru the `$http` factory in the previous step.

It’s done, we can use the directive now.


### HTML

```
<div class="col-md-6" sex>
</div>
```


([See sample codes on CodePen](http://codepen.io/KarateJB/pen/zqmpYZ))


## Reference

1. [Custom Directives in AngularJS](http://www.c-sharpcorner.com/UploadFile/dev4634/custom-directive-in-angular-js983/)
