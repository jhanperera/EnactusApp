//This creates a new module called 'controllers' that will hold all of the controllers for our app
angular.module('controllers', ['services'])

.controller('MainCtrl', function ($scope, $state) {

    console.log('MainCtrl');

})
.controller("BtnClick", function($scope,lives){
	var live = lives.getlives();
    $scope.part2Cred = false;
    $scope.part3Cred = false;
    $scope.part4Cred = false;
    $scope.part5Cred = false;
    $scope.part6Cred = false;
    $scope.part7Cred = false;
	
	$scope.updatelives = function (){
		//grabs the element that is called liv then updates it
		var livesOnPage = document.getElementById('liv');
		livesOnPage.innerHTML = lives.getlives();
	}
	$scope.wrong = function (){
		live = live - 1;
		lives.setlives(live);
		$scope.updatelives();
	}
	$scope.right = function (){
		live = live + 1;
		lives.setlives(live);
		$scope.updatelives();
	}
});

