angular.module('projectx')

.factory('Users', ['$firebaseArray', '$firebaseObject', 'Ref',
	function($firebaseArray, $firebaseObject, Ref) {
		var usersRef = Ref.child('users');
		var user;

		var Users = {
			setUserProfile: function(uid) {
				user = usersRef.child(uid);
			},
			getUser: function() {
				return user;
			}
		};
		return Users;
	}
]);