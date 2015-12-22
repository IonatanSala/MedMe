angular.module('projectx')

.factory('PopupInfo', ['$ionicPopup',
	function($ionicPopup) {

		function triggerPopup(options) {
			var myPopup = $ionicPopup.show({
				template: options.template,
				title: options.title,
				buttons: [
					{
						text: options.text,
						type: options.type
					}
				]
			});
		}

		var PopupInfo = {
			triggerPopup: triggerPopup
		};

		return PopupInfo;
	}
]);