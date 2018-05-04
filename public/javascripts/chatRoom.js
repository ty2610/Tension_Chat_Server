var chatApp = angular.module('chatRoom', []);

chatApp.controller('chatController', function ($scope, $window) {

    $scope.click = function () {
        $window.alert("HOLY SHIT");
    };

});