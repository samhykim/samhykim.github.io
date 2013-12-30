'use strict';

/* App Module */

angular.module('samspage', ['$strap.directives','ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: '/partials/main.html',
            controller: 'MainController',
        })

        .when('/first_project', {
            templateUrl: '/partials/first_project.html',
            controller: 'FirstProjectController',
        })

        .when('/android_apps', {
            templateUrl: '/partials/android_apps.html',
            controller: 'AndroidAppsController',
        })

        .when('/internship', {
            templateUrl: '/partials/internship.html',
            controller: 'InternshipController',
        })

        .otherwise({redirectTo: '/main'});
}]);
