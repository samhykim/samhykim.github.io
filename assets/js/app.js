'use strict';

/* App Module */

angular.module('samspage', ['$strap.directives','ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: '/assets/partials/main.html',
            controller: 'MainController',
        })

        .when('/first_project', {
            templateUrl: '/assets/partials/first_project.html',
            controller: 'FirstProjectController',
        })

        .when('/android_apps', {
            templateUrl: '/assets/partials/android_apps.html',
            controller: 'AndroidAppsController',
        })

        .when('/internship', {
            templateUrl: '/assets/partials/internship.html',
            controller: 'InternshipController',
        })

        .otherwise({redirectTo: '/main'});
}]);
