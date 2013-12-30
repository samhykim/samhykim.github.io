'use strict';

/* App Module */

angular.module('samspage', ['$strap.directives','ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: '/public/partials/main.html',
            controller: 'MainController',
        })

        .when('/first_project', {
            templateUrl: '/public/partials/first_project.html',
            controller: 'FirstProjectController',
        })

        .when('/android_apps', {
            templateUrl: '/public/partials/android_apps.html',
            controller: 'AndroidAppsController',
        })

        .when('/internship', {
            templateUrl: '/public/partials/internship.html',
            controller: 'InternshipController',
        })

        .otherwise({redirectTo: '/main'});
}]);
