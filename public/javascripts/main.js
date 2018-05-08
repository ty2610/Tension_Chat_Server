$(document).ready(function() {
    $('body').hide();
    $(window).on('load', function() {
        $('body').show();
    });
});

var mainApp = angular.module('mainApp', []).config(['$locationProvider', function($locationProvider) { $locationProvider.html5Mode({ enabled: true, requireBase: false }); }]);

mainApp.controller('MainController', function IndexController($scope, $location, $http, $window) {

    $scope.initialize = () => {
        var paramUsername = $location.search().username;
        $scope.buttons=[];

        var url = '/getChatRooms';

        $http({
            method: "GET",
            url: url
        }).then(function successCallback(response) {
            //console.log(response);
            console.log('Success');
            console.log(response);
            console.log(response.data[0]);
            for(i=0; i < response.data.length; i++){
                $scope.buttons.push(response.data[i]);
            }
        }, function errorCallback(response) {
            console.log('Oops');
            console.log(response);
        });
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
