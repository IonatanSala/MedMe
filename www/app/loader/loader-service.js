angular.module('projectx')

.factory("Loader", ['$ionicLoading', '$timeout',
	function($ionicLoading, $timeout) {
		return {
			show: function() {
				$ionicLoading.show({
					template: '<ion-spinner class="spinner-energized"></ion-spinner>'
				})
			},
			hide: function() {
				$timeout(function() {
					$ionicLoading.hide();
				}, 10);
			}
		}
	}
]);