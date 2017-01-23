//This creates a new module called 'controllers' that will hold all of the controllers for our app
angular.module('controllers', ['services'])

.controller('MainCtrl', function ($scope, $state, data) {
    $scope.$on('$ionicView.enter', function () {
        data.create();     
    })
    $scope.chapter = data.chapterProgress();
    console.log('MainCtrl');
    if (window.localStorage.getItem("prog1") == undefined) {
        document.getElementById("chap1").value = 0;
    } else {
        document.getElementById("chap1").value = window.localStorage.getItem("prog1");
    }
    
    if (window.localStorage.getItem("prog2") == undefined) {
        document.getElementById("chap2").value = 0;
    } else {
        document.getElementById("chap2").value = window.localStorage.getItem("prog2");
    }
})
.controller("BtnClick", function ($scope, lives, data, $cordovaFile, $ionicScrollDelegate, $cordovaVibration) {
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
    
    //Get all the platforms
	var deviceInformation = ionic.Platform.device();
	var isWebView = ionic.Platform.isWebView();
	var isIPad = ionic.Platform.isIPad();
	var isIOS = ionic.Platform.isIOS();
	var isAndroid = ionic.Platform.isAndroid();
	var isWindowsPhone = ionic.Platform.isWindowsPhone();
	var currentPlatform = ionic.Platform.platform();
	var currentPlatformVersion = ionic.Platform.version();
	
    //Set the number of questions for the calling section
	$scope.setNumQuestions = function(num){
		numQuestions = num;
	}
    //Scroll to the top of the page
	$scope.scrollToTop = function(){
	    $ionicScrollDelegate.scrollTop();
	}
    //update the number of lives to 3.
	$scope.updatelives = function (){
		//grabs the element that is called liv then updates it
		var livesOnPage = document.getElementById('liv');
		livesOnPage.innerHTML = live;
	}
    //Wrong answer. (Color the answer gray, Vibrate and then update lives)
	$scope.wrong = function (event){
	    var selec = document.getElementById(event.target.id);
	    if(clickedOn.includes(selec)){}
	    else{
	        selec.style.color = "grey";
	        if (isAndroid)
	        {
	            $cordovaVibration.vibrate(100);
	        }
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
    //Correct answer. (COlor the answer to green,, and update the number of questions left)
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
    //Game over. (Too many incorrect answers so we restart.)
	$scope.gameover = function(){
		alert("game over please try again");
		live = 3;
		$ionicScrollDelegate.scrollTop();
		$scope.partQCred = false;
		$scope.part1Cred = !$scope.part1Cred;
		for(i = 0; i< clickedOn.length;i++){
			clickedOn[i].style.color = "rgb(68,68,68)";
		}		
	}
    //Save the progress to the corresponding chapter. 
	$scope.save = function (chapter) {
	    if (chapter == "one") {
	        var temp;
	        if (window.localStorage.getItem("prog1") == undefined) {
	            temp = 0;
	        } else {
	            temp = window.localStorage.getItem("prog1");
	        }
	        temp++;
	        window.localStorage.setItem("prog1", temp);
	    } else if (chapter == "two") {
	        if (window.localStorage.getItem("prog2") == undefined) {
	            temp = 0;
	        } else {
	            temp = window.localStorage.getItem("prog2");
	        }
	        temp++;
	        window.localStorage.setItem("prog2", temp);
	    }
	}
    //Load the progress? (Not sure what this does but log the getItem value)
	$scope.load = function () {
	    console.log(window.localStorage.getItem("prog1"));
	}
    /*
        Winner winner chicken dinner. Sent the user back to the main screen and show 
        the updated progress. 
    */
	$scope.win = function (chapter, section) {
	    $scope.save(chapter);
	    window.location.href = "#/main";
	    if (window.localStorage.getItem("prog1") == undefined) {
	        document.getElementById("chap1").value = 0;
	    } else {
	        document.getElementById("chap1").value = window.localStorage.getItem("prog1");
	    }

	    if (window.localStorage.getItem("prog2") == undefined) {
	        document.getElementById("chap2").value = 0;
	    } else {
	        document.getElementById("chap2").value = window.localStorage.getItem("prog2");
	    }
	}
});

