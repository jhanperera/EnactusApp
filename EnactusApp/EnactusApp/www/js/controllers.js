﻿//This creates a new module called 'controllers' that will hold all of the controllers for our app
angular.module('controllers', [])

.controller('MainCtrl', function ($scope, $state) {

    console.log('MainCtrl');

})
.controller('01SectionCtrl', function ($scope, $state) {

    console.log('01SectionCtrl');

})
.controller('01Sec01Ctrl', function ($scope, $state) {

})
.controller('02SectionsCtrl', function ($scope, $state) {

});
