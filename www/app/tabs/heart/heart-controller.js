angular.module('projectx')

.controller('HeartController', ['$scope',
	function($scope) {
		$scope.test = "<3";
        $scope.doctorname = "Finnuala O'Connor";
        $scope.doctornumber = "087 4326348";
	}
]);