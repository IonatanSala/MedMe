angular.module('projectx')

.factory('AuthService', ['$q', 'Ref','$firebaseAuth',
	function($q, Ref, $firebaseAuth) {
		// firebase auth object
		var firebaseAuth = $firebaseAuth(Ref.child('users'));

		// creating the user
		function createUser(user) {
			var q = $q.defer();
			firebaseAuth.$createUser(user).then(function(success) {
				q.resolve(success);
			}).catch(function(err) {
				q.reject(err);
			});

			return q.promise;
		}

		// login in the user
		function loginUser(user) {
			var q = $q.defer();
			firebaseAuth.$authWithPassword(user).then(function(success) {
				q.resolve(success);
			}).catch(function(err) {
				q.reject(err);
			});

			return q.promise;
		}

		return {
			createUser: createUser,
			loginUser: loginUser,
			authObj: firebaseAuth
		};
	}
])

// runs at the start of the application
.run(['$rootScope', '$state', 'AuthService', 'Users',
	function($rootScope, $state, AuthService, Users) {

		// fires whenever a user changes auth state
		AuthService.authObj.$onAuth(function(authData) {
			// if there's auth data it means the user is logged in
			if(authData) {
				// alert('logged in');
				// redirect to home page if not in home page
				// console.log(AuthService.authObj.child(authData));
				Users.setUserProfile(authData.uid);
				if($state.current.name !== 'tabs.home') $state.go('tabs.home');
			} else {
				// alert('logged out');
				// redirect to login screen
				if($state.current.name !== 'user-details') $state.go('user-details')
			}
		});
	}
]);
