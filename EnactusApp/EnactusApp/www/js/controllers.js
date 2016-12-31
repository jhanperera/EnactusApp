//This creates a new module called 'controllers' that will hold all of the controllers for our app
angular.module('controllers', ['services'])

.controller('MainCtrl', function ($scope, $state, data) {
    $scope.$on('$ionicView.enter', function () {
        data.create();
        
    })
    $scope.chapter = data.chapterProgress();
    console.log('MainCtrl');
   

})
.controller("BtnClick", function($scope,lives, data, $cordovaFile){
	var live = 3;
	var clickedOn = [];
	var numQuestions;
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
	
	$scope.setNumQuestions = function(num){
		numQuestions = num;
	}
	
	$scope.updatelives = function (){
		//grabs the element that is called liv then updates it
		var livesOnPage = document.getElementById('liv');
		livesOnPage.innerHTML = live;
	}
	$scope.wrong = function (event){
		var selec = document.getElementById(event.target.id);
		if(clickedOn.includes(selec)){}
		else{
			selec.style.color = "grey";
			clickedOn.push(selec);
			live = live - 1;
			if(live == 0){
				$scope.gameover();
			}
			else{
				$scope.updatelives();
			}
		}
	}
	$scope.right = function (event,chapter, section){
		var selec = document.getElementById(event.target.id);
		if(clickedOn.includes(selec)){}
		else{
			selec.style.color = "green";
			clickedOn.push(selec);
			numQuestions = numQuestions -1;
			if(numQuestions == 0){
				alert("Good job");
				$scope.win(chapter, section);
			}
		}
	}
	$scope.gameover = function(){
		alert("game over please try again");
		live = 3;
		$scope.partQCred = false;
		$scope.part1Cred = !$scope.part1Cred;
		for(i = 0; i< clickedOn.length;i++){
			clickedOn[i].style.color = "rgb(68,68,68)";
		}
		
	}
	$scope.win = function (chapter, section) {
	    
	    var data = data.chapterProgress();
	    var sectionsComplete = data[chapter].sectionsCompleted;
	    var totalsection = data[chapter].totalSections;
	    if (section === totalSection) {
	        window.location.href = "#/chapter1sections";
	        return;
	    }
	    if (section > sectionsComplete) {
	        data[chapter].sectionsCompleted += 1;
	        var url = "";
	        if (ionic.Platform.isAndroid()) {
	            url = "/android_asset/www/";
	        }
	        $cordovaFile.writeFile(url + "js/", "chapters.json", data, true)
      .then(function (success) {
          // success
          window.location.href = "#/chapter1sections";
      }, function (error) {
          // error

      });
	    }
	}

	$scope.add = function (chapter, section) { //Enter chapter as string and section as integer
	    
	}
	
});

