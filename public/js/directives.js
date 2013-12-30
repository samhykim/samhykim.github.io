'use strict';

/* Directives */

angular.module('samspage')

.directive('zeStatus', ['status', function (status) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/app/partials/status.html',
        link: function (scope, elm, $attrs, ctrl) {
            scope.status = status;
        }
    }
}])

.directive('zeWalkthrough', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: '/app/partials/walkthrough.html',
    }
})


;