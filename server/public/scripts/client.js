var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'HomeController',
            controllerAs: 'hc'
        })
        .when('/other', {
            templateUrl: '/views/templates/other.html',
            controller: 'OtherController',
            controllerAs: 'oc'
        })
        .otherwise({
            redirectTo: 'home'
        });
}]);
