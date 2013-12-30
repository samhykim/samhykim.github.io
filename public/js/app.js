'use strict';

/* App Module */

angular.module('samspage', ['$strap.directives','ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: '/app/partials/main.html',
            controller: 'MainController',
        })

        .when('/first_project', {
            templateUrl: '/app/partials/first_project.html',
            controller: 'FirstProjectController',
        })

        .when('/android_apps', {
            templateUrl: '/app/partials/android_apps.html',
            controller: 'AndroidAppsController',
        })

        .when('/internship', {
            templateUrl: '/app/partials/internship.html',
            controller: 'InternshipController',
        })

        .otherwise({redirectTo: '/main'});
}]);
