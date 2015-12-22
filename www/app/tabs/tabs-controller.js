angular.module('projectx')

.controller('TabsController', ['$scope', '$cordovaBarcodeScanner','Loader','$state',
	function($scope, $cordovaBarcodeScanner, Loader, $state) {

		$scope.openScanner = function() {
			Loader.show();
			document.addEventListener("deviceready", function () {
				Loader.hide();
		    $cordovaBarcodeScanner
		      .scan()
		      .then(function(barcodeData) {
		        // Success! Barcode data is here
						var id = String(barcodeData.text);
						if(barcodeData.text) $state.go('tabs.med-details', {medId: id});
		      }, function(error) {
		        alert(JSON.stringify(error));
		      });

	  	}, false);
		}


	}
]);
