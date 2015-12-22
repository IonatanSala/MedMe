angular.module('projectx')

.controller("UserDetailsCtrl", ['$scope','AuthService', 'Loader', 'PopupInfo',
	function($scope, AuthService, Loader, PopupInfo) {

		// create the user
		$scope.createUser = function(user) {
			Loader.show();
			AuthService.createUser(user).then(function(success) {
				// user created
				console.log(success);
				AuthService.loginUser(user).then(function(success) {
					Loader.hide();
				}).catch(function(err) {
					Loader.hide();
					PopupInfo.triggerPopup({template: err, title: '<p style="font-weight: bold;" class="assertive">ERROR</p>', text: 'OK', type: 'button-assertive'});
				});
				
			}, function(err) {
				// there was an error creating the user
				// alert('error creating user');
				Loader.hide();
				console.log(JSON.stringify(err.Error));
				PopupInfo.triggerPopup({template: err, title: '<p style="font-weight: bold;" class="assertive">ERROR</p>', text: 'OK', type: 'button-assertive'});
			});
		}

		// log the user in
		$scope.loginUser = function(user) {
			Loader.show();
			AuthService.loginUser(user).then(function(success) {
				console.log(success);
				Loader.hide();
			}).catch(function(err) {
				// alert('error login');
				PopupInfo.triggerPopup({template: err, title: '<p style="font-weight: bold;" class="assertive">ERROR</p>', text: 'OK', type: 'button-assertive'});
				Loader.hide();
			});
		}

		$scope.logoutUser = function() {
			Loader.show();
			AuthService.logoutUser().then(function(success) {
				console.log(success);
				Loader.hide();
			}).catch(function(err) {
				// alert('error login');
				console.log(err);
				Loader.hide();
			});
		}

		// used to toggle between login and signup
		$scope.state = {
			value: true
		};
		// method used to toggle between login and signup
		$scope.toggleAuth = function() {
			$scope.state.value = !$scope.state.value;
		}
	}
]);