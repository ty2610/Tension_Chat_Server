$(document).ready(function() {
    $('body').hide();
    $(window).on('load', function() {
        $('body').show();
    });
});

var mainApp = angular.module('mainApp', []).config(['$locationProvider', function($locationProvider) { $locationProvider.html5Mode({ enabled: true, requireBase: false }); }]);

mainApp.controller('MainController', function IndexController($scope, $location) {
    $scope.initialize = () => {
        var paramUsername = $location.search().username;
    };

    $scope.logout = () => {
        window.location.href = "/";
    };

    $scope.openChatRoom = (number) => {
        window.location.href = "/chat?username=" + $location.search().username + "&chatNumber=" + number;
    };

    //TODO: Have buttons that represent each chat room, as well as a button to create a new chatroom (add to DB).
    //Todo: url = /chat?chatroomID=____&username=paramUsername
});
