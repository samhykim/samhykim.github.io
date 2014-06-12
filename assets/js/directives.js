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

.directive('sheetMusic', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    template:
      '<h2>My Repertoire Sheet Music</h2>' +
			'<h3>Written using MuseScore software</h3>' +
			'<div class="move-right">' +
				'<a href="/downloads/bohemian_rhapsody_cello.pdf" target="_self">Bohemian Rhapsody Cello</a>' +
				'<br>' +
				'<a href="/downloads/bohemian_rhapsody_violin.pdf" target="_self">Bohemian Rhapsody Violin</a>' +
				'<br>' +
				'<a href="/downloads/stairway_to_heaven_duet.pdf" target="_self">Stairway to Heaven String Duet</a>' +
			'</div>',
  };
})



;