//This creates a new module called 'controllers' that will hold all of the controllers for our app
angular.module('controllers', ['services'])

.controller('MainCtrl', function ($scope, $state, data) {
    $scope.$on('$ionicView.enter', function () {
        data.create();
        
    })
    $scope.chapter = data.chapterProgress();
    console.log('MainCtrl');

})
.controller("BtnClick", function($scope,lives){
	var live = 3;
    $scope.part2Cred = false;
    $scope.part3Cred = false;
    $scope.part4Cred = false;
    $scope.part5Cred = false;
    $scope.part6Cred = false;
    $scope.part7Cred = false;
    $scope.part8Cred = false;
    $scope.part9Cred = false;
	$scope.part10Cred = false;
	$scope.partQCred = false;
	
	$scope.updatelives = function (){
		//grabs the element that is called liv then updates it
		var livesOnPage = document.getElementById('liv');
		livesOnPage.innerHTML = live;
	}
	$scope.wrong = function (event){
		var selec = document.getElementById(event.target.id);
		selec.style.color = "grey";
	
		live = live - 1;
		if(live == 0){
			$scope.gameover();
		}
		else{
			$scope.updatelives();
		}
	}
	$scope.right = function (event){
		var selec = document.getElementById(event.target.id);
		selec.style.color = "green";
	}
	$scope.gameover = function(){
		alert("game over please try again");
		live = 3;
		$scope.partQCred = false;
		$scope.part1Cred = !$scope.part1Cred;
	}
});

