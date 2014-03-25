'use strict';

/* App Module */

angular.module('samhykim', ['$strap.directives','ngResource', 'ngRoute', 'firebase'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/assets/partials/main.html',
            controller: 'MainController',
        })

        .when('/calendar', {
            templateUrl: '/assets/partials/calendar.html',
            controller: 'CalendarController',
        })

        .when('/resume', {
            templateUrl: '/assets/partials/doesnotexist.html',
        })

        .when('/projects', {
            templateUrl: '/assets/partials/doesnotexist.html',
        })

        .when('/contact', {
            templateUrl: '/assets/partials/doesnotexist.html',
        })

        .when('/android_apps', {
            templateUrl: '/assets/partials/android_apps.html',
            controller: 'AndroidAppsController',
        })

        .when('/internship', {
            templateUrl: '/assets/partials/internship.html',
            controller: 'InternshipController',
        })

        .when('/about', {
            redirectTo: '/',
        })

        .when('/ee20', {
            redirectTo: '/ee20/sp14',
        })

        .when('/ee20/sp14', {
            templateUrl: '/assets/partials/ee20.html',
            controller: 'EE20Controller',
        })

        .when('/sheet_music', {
            templateUrl: '/assets/partials/sheet_music.html',
            controller: 'SheetMusicController',
        })

        .when('/choreography', {
            templateUrl: '/assets/partials/hidden.html',
            //controller: 'ChoreographyController',
        })

        .when('/2048', {
            templateUrl: '/assets/2048/index.html',
        })

        .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);
}]);
