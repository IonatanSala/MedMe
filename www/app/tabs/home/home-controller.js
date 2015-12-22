angular.module('projectx')

// home controller
.controller('HomeController', ['$scope', '$state', 'Users','$firebaseObject', '$ionicPlatform', 'Loader', 'PopupInfo',
	function($scope, $state, Users, $firebaseObject, $ionicPlatform, Loader, PopupInfo) {
		$scope.goAddMedicationState = function() {
			$state.go('tabs.add-medication');
		}

		var medicationsRef = Users.getUser().child('medication');

		$ionicPlatform.ready(function() {
			Loader.show();
			$firebaseObject(medicationsRef).$loaded().then(function(data) {
				$scope.medications = data;
				Loader.hide();
			}).catch(function(err) {
				Loader.hide();
				PopupInfo.triggerPopup({template: err, title: '<p style="font-weight: bold;" class="assertive">ERROR</p>', text: 'OK', type: 'button-assertive'});
			});
		});

	}
])



// adding new medication controller
.controller('AddMedicationController', ['$scope', 'MedicationFactory','$state', 'Loader', 'PopupInfo',
	function($scope, MedicationFactory, $state, Loader, PopupInfo) {
		$scope.medication = {
			name: '',
			emergency: '',
			startDate: '',
			endDate: '',
			takeTime: '',
			comment: ''
		};

		var startDate = MedicationFactory.startDate;
		startDate.callback = function(val) {
			$scope.medication.startDate = val;
		}
		$scope.startDate = startDate;

		var endDate = MedicationFactory.endDate;
		endDate.callback = function(val) {
			$scope.medication.endDate = val;
		}
		$scope.endDate = endDate;

		var takeTime = MedicationFactory.takeTime ;
		takeTime.callback = function(val) {
  			$scope.medication.takeTime = val * 1000;
		}
		$scope.takeTime = takeTime;

		// saving the data to firebase
		$scope.saveMedication = function(medData) {
			Loader.show();
			MedicationFactory.saveMedication(medData).then(function(success) {
				Loader.hide();
				$state.go('tabs.home');
			}).catch(function(err) {
				Loader.hide();
				PopupInfo.triggerPopup({template: err, title: '<p style="font-weight: bold;" class="assertive">ERROR</p>', text: 'OK', type: 'button-assertive'});
			});
		};

	}
])



.controller('MedDetailsController', ['$scope', '$stateParams','Users', '$firebaseObject', '$state', '$ionicPopup',
	function($scope, $stateParams, Users, $firebaseObject, $state, $ionicPopup) {
		var medRef = Users.getUser().child('medication').child($stateParams.medId);
		$scope.medID = $stateParams.medId;

		$firebaseObject(medRef).$loaded().then(function(success) {
			$scope.med = success;
		}).catch(function(err) {
			alert('error');
		});

		$scope.deleteEntry = function(){
			var myPopup = $ionicPopup.show({
				//template:
				title: 'Are you sure you want to delete this medication',
				scope: $scope,
				buttons: [
					{text: 'No',
					 type: 'button-positive',
						onTap: function(){myPopup.close();}
					},
					{text: 'Yes',
					 type: 'button-assertive',
						onTap: function(){
							medRef.remove()
							$state.go('tabs.home')
						}
					}
				]
			})
		};
	}

])


// factory for adding medication
.factory("MedicationFactory", ['Users','$q',
	function(Users, $q) {

			function saveMedication(medData) {
				var q = $q.defer();

				// turn dates to strings so they can be stored in firebase
				if(medData.startDate) medData.startDate = medData.startDate.getTime();
				if(medData.endDate) medData.endDate = medData.endDate.getTime();
				// store the data under /users/<user_id>/medication/<random_key_created_by_push>/<the_data>
				var ref = Users.getUser().child('medication');

				// saving goes here
				ref.push(medData, function(error) {
					if (error) {
						q.reject(error);
					} else {
						q.resolve('Data saved');
					}
				});

				return q.promise;
			}

			var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
			var startDateConfig = {
			titleLabel: 'Start Date',  //Optional
			todayLabel: 'Today',  //Optional
			closeLabel: ' ',  //Optional
			setLabel: ' ',  //Optional
			setButtonType : 'button-balanced button-clear button-icon ion-checkmark-round',  //Optional
			todayButtonType : 'button-positive button-clear button-icon',  //Optional
			closeButtonType : 'button-assertive button-clear button-icon ion-close-round',  //Optional
			monthList: monthList, //Optional
			templateType: 'popup', //Optional
			showTodayButton: 'true', //Optional
			modalHeaderColor: 'bar-positive', //Optional
			modalFooterColor: 'bar-positive', //Optional
			from: new Date(), //Optional
			to: new Date(2018, 8, 25),  //Optional
			dateFormat: 'dd-MM-yyyy', //Optional
			closeOnSelect: false, //Optional
		 };

		var endDateConfig = {
			titleLabel: 'Start Date',  //Optional
			todayLabel: 'Today',  //Optional
			closeLabel: ' ',  //Optional
			setLabel: ' ',  //Optional
			setButtonType : 'button-balanced button-clear button-icon ion-checkmark-round',  //Optional
			todayButtonType : 'button-positive button-clear button-icon',  //Optional
			closeButtonType : 'button-assertive button-clear button-icon ion-close-round',  //Optional
			monthList: monthList, //Optional
			templateType: 'popup', //Optional
			showTodayButton: 'true', //Optional
			modalHeaderColor: 'bar-positive', //Optional
			modalFooterColor: 'bar-positive', //Optional
			from: new Date(), //Optional
			to: new Date(2018, 8, 25),  //Optional
			callback: function (val) {  //Mandatory
			$scope.medication.endDate = val;
			},
			dateFormat: 'dd-MM-yyyy', //Optional
			closeOnSelect: false, //Optional
		};

		var takeTimeConfig = {
			inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
  			step: 15,  //Optional
  			format: 12,  //Optional
			titleLabel: '12-hour Format',  //Optional
	  		setLabel: ' ',  //Optional
  			closeLabel: ' ',  //Optional
  			setButtonType: 'button-balanced button-clear button-icon ion-checkmark-round',  //Optional
  			closeButtonType: 'button-assertive button-clear button-icon ion-close-round',  //Optional
  			modalHeaderColor: 'bar-positive', //Optional
			modalFooterColor: 'bar-positive',
  			callback: function (val) {    //Mandatory
    		$scope.medication.takeTime = val;
  			}
		}

		var Medication = {
			saveMedication: saveMedication,
			startDate: startDateConfig,
			endDate: endDateConfig,
			takeTime: takeTimeConfig
		};

		return Medication;
	}
]);
