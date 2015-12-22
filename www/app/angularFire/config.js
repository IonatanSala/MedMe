angular.module('projectx')

.factory('Ref', ['$window', 'FIREBASE_REF',
	function($window, FIREBASE_REF) {
		return new $window.Firebase(FIREBASE_REF)
	}
]);