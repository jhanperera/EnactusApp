angular.module('services', [])
	.service('lives', function () {
        var live = 3;

        return {
            getlives: function () {
                return live;
            },
            setlives: function(value) {
                live = value;
            }
        };
    });