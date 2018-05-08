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

    $scope.removeRoom = (ID) =>{

        //TODO: Send request to server to remove the room where the room ID matches.
        var url = "/removeRoom?id="+ID;
        $http({
            method: "POST",
            url: url
        }).then(function successCallback(response) {
            //console.log(response);
            console.log('Success');
            console.log(response.data);
            console.log($scope.buttons[0].ID);

            var newArray = [];
            for(i=0; i < $scope.buttons.length; i++){
                if($scope.buttons[i].ID !== parseInt(response.data)){
                    newArray.push($scope.buttons[i]);
                }
            }
            $scope.buttons = newArray;
            $scope.$apply();

        }, function errorCallback(response) {
            console.log('Oops');
            console.log(response);
        });
    };

    $scope.createRoom = (room_name) => {

        //TODO: Send request to server to add the room with the name: room_name
        var url = "/createRoom?room_name="+room_name;
        $http({
            method: "POST",
            url: url
        }).then(function successCallback(response) {
            //console.log(response);
            console.log('Success');
            console.log(response);
            $window.location.replace($window.location.href);


        }, function errorCallback(response) {
            console.log('Oops');
            console.log(response);
        });

    }
    //Todo: url = /chat?chatroomID=____&username=paramUsername
});
