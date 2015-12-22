// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('projectx', ['ionic', 'ngCordova', 'firebase', 'ionic-datepicker', 'ionic-timepicker', 'monospaced.qrcode'])

.run(function($ionicPlatform, $cordovaStatusbar, $rootScope, $ionicLoading) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if(window.StatusBar) {
      // StatusBar.styleDefault();
      $cordovaStatusbar.style(1);
    }
    setTimeout(function() {
      if (device.platform == "Android") {
          $cordovaSplashscreen.hide();
      }
      if (device.platform == "iPhone" || device.platform == "iOS") {
          navigator.splashscreen.hide();
      }
    }, 500);
      // $rootScope.$on('loading:show', function() {
      //   $ionicLoading.show({template: 'loading...'});
      // });

      // $rootScope.$on('loading:hide', function() {
      //     $ionicLoading.hide();
      // });
  });


})

.config(['$stateProvider', '$urlRouterProvider','$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {

    // $httpProvider.interceptors.push(function($rootScope) {
    //   return {
    //     request: function(config) {
    //       $rootScope.$broadcast('loading:show')
    //       return config
    //     },
    //     response: function(response) {
    //       $rootScope.$broadcast('loading:hide')
    //       return response
    //     }
    //   }
    // });


    $urlRouterProvider.otherwise('/user-details');

    $stateProvider.
      state('user-details', {
        url: '/user-details',
        templateUrl: 'app/user-details/user-details.html',
        controller: "UserDetailsCtrl"
      })

    // tabs
    $stateProvider
      .state('tabs', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'app/tabs/tabs.html',
      controller: 'TabsController',
    })

    // route for home tab
    $stateProvider
      .state('tabs.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'app/tabs/home/home.html',
            controller: "HomeController"
          }
        }
      })

    .state('tabs.med-details', {
      url: '/home/:medId',
      views: {
        'tab-home': {
          templateUrl: 'app/tabs/home/med-details.html',
          controller: 'MedDetailsController'
        }
      }
    })

    $stateProvider
      .state('tabs.heart', {
        url: '/heart',
        views: {
          'tab-heart': {
            templateUrl: 'app/tabs/heart/heart.html',
            controller: "HeartController"
          }
        }
      })

    $stateProvider
      .state('tabs.profile', {
        url: '/profile',
        views: {
          'tab-profile': {
            templateUrl: 'app/tabs/profile/profile.html',
            controller: "ProfileController"
          }
        }
      })

    $stateProvider
      .state('tabs.scanner', {
        url: '/scanner',
        views: {
          'tab-scanner': {
            templateUrl: 'app/tabs/scanner/scanner.html',
            controller: "ScannerController"
          }
        }
      })

    $stateProvider
      .state('tabs.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'app/tabs/settings/settings.html',
            controller: "SettingsController"
          }
        }
      })

    $stateProvider
      .state('tabs.add-medication', {
        url: '/add-medication',
        views: {
          'tab-home': {
            templateUrl: 'app/tabs/home/add-medication.html',
            controller: "AddMedicationController"
          }
        }
      })

      $stateProvider
      .state('tabs.about', {
        url: '/about',
        views: {
          'tab-settings': {
            templateUrl: 'app/tabs/settings/about.html',
          }
        }
      })

      $stateProvider
      .state('tabs.our-team', {
        url: '/our-team',
        views: {
          'tab-settings': {
            templateUrl: 'app/tabs/settings/our-team.html',
          }
        }
      })

  }
]);
