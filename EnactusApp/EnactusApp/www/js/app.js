// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('iFinance', ['ionic', 'controllers', 'services', 'ngAnimate', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {

    //Add all the state providers for changing the the views
    $stateProvider
    .state('main', {
        url: '/main',
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
    })
    .state('chapter1sections', {
        url: '/chapter1sections',
        templateUrl: 'templates/chapter1/chapter1sections.html'
    })
    .state('chapter1sec1', {
        url: '/chapter1sec1',
        templateUrl: 'templates/chapter1/section1.html'
    })
    .state('chapter1sec2', {
        url: '/chapter1sec2',
        templateUrl: 'templates/chapter1/section2.html'
    })
    .state('chapter1sec3', {
        url: '/chapter1sec3',
        templateUrl: 'templates/chapter1/section3.html'
    })
    .state('chapter1sec4', {
        url: '/chapter1sec4',
        templateUrl: 'templates/chapter1/section4.html'
    })
    .state('chapter1sec5', {
        url: '/chapter1sec5',
        templateUrl: 'templates/chapter1/section5.html'
    })
    .state('chapter1sec6', {
        url: '/chapter1sec6',
        templateUrl: 'templates/chapter1/section6.html'
    })
    .state('chapter2sections', {
        url: '/chapter2sections',
        templateUrl: 'templates/chapter2/chapter2sections.html'
    })
    .state('chapter2sec1', {
        url: '/chapter2sec1',
        templateUrl: 'templates/chapter2/section1.html'
    });

    $urlRouterProvider.otherwise("/main");
});
