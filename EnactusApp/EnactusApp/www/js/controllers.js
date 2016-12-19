//This creates a new module called 'controllers' that will hold all of the controllers for our app
angular.module('controllers', [])

.controller('MainCtrl', function ($scope, $state) {

    console.log('MainCtrl');

})
.controller("BtnClick", function($scope){
    $scope.part2Cred = false;
    $scope.part3Cred = false;
    $scope.part4Cred = false;
    $scope.part5Cred = false;
    $scope.part6Cred = false;
    $scope.part7Cred = false;
});
