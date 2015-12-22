angular.module('projectx')

.controller('SettingsController', ['$scope','AuthService', '$ionicPopup',
	function($scope, AuthService, $ionicPopup) {
		$scope.test = "SETTINGS";

		$scope.logoutUser = function() {
			var myPopup = $ionicPopup.show({
				//template:
				title: 'Are you sure you want to log out',
				scope: $scope,
				buttons: [
					{text: 'No',
					 type: 'button-positive',
						onTap: function(){myPopup.close();}
					},
					{text: 'Yes',
					 type: 'button-assertive',
						onTap: function(){
							AuthService.authObj.$unauth();

						}
					}
				]
			})
		};
	}
]);