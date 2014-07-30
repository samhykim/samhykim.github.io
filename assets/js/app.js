'use strict';

/* App Module */

angular.module('samhykim', ['$strap.directives','ngResource', 'ngRoute', 'firebase', 'ui.bootstrap', 'google-maps'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/main', {
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
            templateUrl: '/assets/partials/projects.html',
            controller: 'ProjectsController',
        })

        .when('/contact', {
            templateUrl: '/assets/partials/contact.html',
        })

        .when('/location', {
            templateUrl: '/assets/partials/location.html',
            controller: 'MapsController',
        })

        .when('/internship', {
            templateUrl: '/assets/partials/internship.html',
            controller: 'InternshipController',
        })

        .when('/about', {
            redirectTo: '/main',
        })

        .when('/ee20', {
            redirectTo: '/ee20/sp14',
        })

        .when('/ee20/sp14', {
            templateUrl: '/assets/partials/ee20.html',
            //controller: 'EE20Controller',
        })

        .when('/sheet_music', {
            templateUrl: '/assets/partials/sheet_music.html',
            controller: 'SheetMusicController',
        })

        .when('/misc', {
            templateUrl: '/assets/partials/misc.html',
            controller: 'MiscController',
        })

        .when('/2048', {
            templateUrl: '/assets/2048/index.html',
        })

        .otherwise({redirectTo: '/main'});

        $locationProvider.html5Mode(true);
}]);
