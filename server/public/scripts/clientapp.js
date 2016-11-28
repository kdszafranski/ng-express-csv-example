var colorBlocks = angular.module('colorBlocks', ['ngRoute']);

colorBlocks.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/play', {
            templateUrl: '/views/templates/gameview.html',
            controller: 'GameController',
            controllerAs: 'game'
        })
        .when('/config', {
            templateUrl: '/views/templates/configview.html',
            controller: 'SettingsController',
            controllerAs: 'settings'
        })
        .otherwise({
            redirectTo: '/play'
        });
}]);
