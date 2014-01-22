'use strict';

/* Directives */

angular.module('samhykim')

.directive('zeStatus', ['status', function (status) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/assets/partials/status.html',
        link: function (scope, elm, $attrs, ctrl) {
            scope.status = status;
        }
    }
}])



;