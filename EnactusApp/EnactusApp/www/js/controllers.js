//This creates a new module called 'controllers' that will hold all of the controllers for our app
angular.module('controllers', ['services'])

.controller('MainCtrl', function ($scope, $state) {

    //When the scope is on we grab all the data. 
    $scope.$on('$ionicView.enter', function () {

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
})
.controller("BtnClick", function ($scope, lives, data, $cordovaFile, $ionicScrollDelegate, $cordovaVibration, $state, $ionicPopup, $ionicModal, $window, $timeout) {
    //Some variables
   	var live = 3;
	var clickedOn = [];
	var numQuestions;

    //The hidden documents
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
	$scope.partQ2 = false;
	$scope.partQ3 = false;
	$scope.partQ4 = false;
	$scope.partQ5 = false;
	$scope.partQ6 = false;
	$scope.partQ7 = false;

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
	$scope.scrollToTop = function () {
	    $ionicScrollDelegate.scrollTop();
	}

    //update the number of lives to 3.
	$scope.updatelives = function () {
		//grabs the element that is called liv then updates it
		var livesOnPage = document.getElementById('liv');
		livesOnPage.innerHTML = live;
	}

    //Game over try again
	$scope.gameOver = function () {
	    var alertPopup = $ionicPopup.alert({
	        title: 'Oh dear',
	        template: 'You\'re out of lives. Give it one more try.'
	    });
	}


    //Wrong answer. (Color the answer gray, Vibrate and then update lives)
	$scope.wrong = function (event){
		var selec = document.getElementById(event.target.id);
		if(clickedOn.includes(selec)){}
		else{
			selec.style.color = "grey";
			clickedOn.push(selec);
			live = live - 1;
            //Vibrate on mobile devices
			if (isAndroid || isIOS) {
			    $cordovaVibration.vibrate(100);
			}
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
			if (numQuestions == 0) {
                alert("Good Job! You got all the answers correct!")
				$scope.win(chapter, section);
			}
		}
	}

    //Game over. (Too many incorrect answers so we restart.)
	$scope.gameover = function(){
	    $scope.gameOver();
	    live = 3;

		$ionicScrollDelegate.scrollTop();
		$scope.partQCred = false;
		$scope.partQ2 = false;
		$scope.partQ3 = false;
		$scope.partQ4 = false;
		$scope.partQ5 = false;
		$scope.partQ6 = false;
		$scope.partQ7 = false;
		
        //Does a reload on the page so its not a complete refresh
		$scope.reloader = function reload() {
		    var current = $state.current;
		    var params = angular.copy($stateParams);
		    $state.transitionTo(current, params, { reload: true, inherit: true, notify: true });

		}   

        //clear the clickedOn array
		$scope.part1Cred = !$scope.part1Cred;
		for(i = 0; i< clickedOn.length;i++){
		    clickedOn[i].style.color = "rgb(68,68,68)";
		}

        //Reset the lives again and the clickOn array. Update lives
		lives = 3;
		clickedOn = [];
		$scope.updatelives();	
	}

    //Save the progress to the corresponding chapter. 
	$scope.save = function (chapter, section) {
	    if (chapter == "one") {
	        var temp;
            //If the progress 1 is undefined or the prog1Section is undefined 
	        if (window.localStorage.getItem("prog1") == undefined) {
	            temp = 0;
	            temp++;
	            window.localStorage.setItem("prog1", temp);
	            window.localStorage.setItem("prog1Sec" + section.toString(), "true");
	        } else {
                //if this section has never been done before we increment.
	            if(window.localStorage.getItem("prog1Sec" + section.toString()) == undefined)
	            {
	                window.localStorage.setItem("prog1Sec" + section.toString(), "true");
	                temp = window.localStorage.getItem("prog1");
	                temp++;
	                window.localStorage.setItem("prog1", temp);
	            }
                //do nothing if it has been done before. 
	        }
	    } else if (chapter == "two") {
	        //If the progress 2 is undefined or the prog2Section is undefined 
	        if (window.localStorage.getItem("prog2") == undefined) {
	            temp = 0;
	            temp++;
	            window.localStorage.setItem("prog2", temp);
	            window.localStorage.setItem("prog2" + section.toString(), "true");
	        } else {
	            //if this section has never been done before we increment.
	            if (window.localStorage.getItem("prog2Sec" + section.toString()) == undefined) {
	                window.localStorage.setItem("prog2Sec" + section.toString(), "true");
	                temp = window.localStorage.getItem("prog2");
	                temp++;
	                window.localStorage.setItem("prog2", temp);
	            }
	            //do nothing if it has been done before. ;
	        }
	    }
	}

    //Load the progress? (Not sure what this does but log the getItem value)
	$scope.load = function () {
	    if (window.localStorage.getItem("prog1") == undefined) {
	        document.getElementById("chap1").value = 0;
	    } else {
	        document.getElementById("chap1").value = window.localStorage.getItem("prog1");
	    }

	    if (window.localStorage.getItem("prog2") == undefined) {
	        document.getElementById("chap2").value = 0;
	    } else {
	        document.getElementById("chap2").value = window.localStorage.getItem("prog2");
	    };
	}

    /*
        Winner winner chicken dinner. Sent the user back to the main screen and show 
        the updated progress. 
    */
	$scope.win = function (chapter, section) {
	    $scope.save(chapter, section);

        //Check if we are on mobile then run a splash screen to do a smooth refresh
	    if (isAndroid || isIOS){
	        navigator.splashscreen.show();
	        $window.location.href = "#/main";
	        $window.location.reload();
	        $timeout(function () {
	            navigator.splashscreen.hide();
	        }, 500);
	    }
	    else {
            //Just do a standard refresh
	        $window.location.href = "#/main";
	        $window.location.reload();    
	    }
	}
});

