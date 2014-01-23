'use strict';

/* Filters */

angular.module('samhykim')

.filter('menuUrl', function() {
	return function (url) {
		var s = url.toLowerCase();
		var str = s.replace(' ', '_');
		return str;
	}
})

;
