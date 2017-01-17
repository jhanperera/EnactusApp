angular.module('services', [])
	.service('lives', function () {
	    var live = 3;

	    return {
	        getlives: function () {
	            return live;
	        },
	        setlives: function (value) {
	            live = value;
	        }
	    };
	})
    .service('data', function ($cordovaFile, $http) {
        var url = "";
        if (ionic.Platform.isAndroid()) {
            url = "/android_asset/www/";
        }
        return {
            //Run this function on startup to check if the chapters.json file exists, if not, then it will be created
            create: function () {
                var init = {
                    "one": {
                        "sectionsCompleted": 0,
                        "totalSections": 4
                    },
                    "two": {
                        "sectionsCompleted": 0,
                        "totalSections": 1
                    }
                };
        
                $cordovaFile.writeFile(url + "js/", "chapters.json", init, false)
      .then(function (success) {
          // success
          console.log("file created");
          console.log(init);
      }, function (error) {
          // error
          console.log("file already present");
      });

            },

            chapterProgress: function () {
                $http.get(url + "js/chapters.json").success(function (response) {
                    var json = JSON.parse(response);
                    return json;
                });
        }

        }
    });