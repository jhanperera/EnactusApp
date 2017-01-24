﻿//This creates a new module called 'controllers' that will hold all of the controllers for our app
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
.controller("BtnClick", function ($scope, lives, data, $cordovaFile, $ionicScrollDelegate) {
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

	$scope.scrollToTop = function(){
	    $ionicScrollDelegate.scrollTop();
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
		$ionicScrollDelegate.scrollTop();
		$scope.partQCred = false;
		window.location.reload();
		$scope.part1Cred = !$scope.part1Cred;
		for(i = 0; i< clickedOn.length;i++){
		    clickedOn[0].style.color = "rgb(68,68,68)";
		    clickedOn.pop;
		}
		
	}

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
	$scope.load = function () {
	    console.log(window.localStorage.getItem("prog1"));
	}


	$scope.win = function (chapter, section) {
	    $scope.save(chapter);
	    window.location.href = "#/main";
	    window.location.reload();
	}
});

