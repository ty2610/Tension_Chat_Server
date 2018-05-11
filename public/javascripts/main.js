var mainApp = angular.module('mainApp', []).config(['$locationProvider', function($locationProvider) { $locationProvider.html5Mode({ enabled: true, requireBase: false }); }]);

mainApp.controller('MainController', function IndexController($scope, $location, $http, $window) {

    $scope.initialize = () => {
        $scope.paramUsername = $location.search().username;
        $scope.buttons=[];

        var url = '/getChatRooms';

        $http({
            method: "GET",
            url: url
        }).then(function successCallback(response) {
            for(i=0; i < response.data.length; i++){
                $scope.buttons.push(response.data[i]);
            }
        }, function errorCallback(response) {
            console.log('Oops');
            console.log(response);
        });

        $scope.socket = io();

        $scope.socket.on('Chat Room', (sendChatRoomObject) => {
            if(sendChatRoomObject.username !== $scope.paramUsername) {
                //$scope.localInsert(sendMessageObject);
                $scope.socketInsert(sendChatRoomObject);
            }
        });

        $scope.socket.on('Delete Room', (sendMessageObject) => {
            $scope.deleterName = sendMessageObject.username;
            var newArray = [];
            for(i=0; i < $scope.buttons.length; i++){
                if($scope.buttons[i].ID !== sendMessageObject.chatRoomNumber){
                    newArray.push($scope.buttons[i]);
                }
            }
            $scope.buttons = newArray;
            $scope.$apply();
        });
    };

    $scope.logout = () => {
        window.location.href = "/";
    };

    $scope.openChatRoom = (number) => {
        window.location.href = "/chat?username=" + $scope.paramUsername + "&chatNumber=" + number;
    };

    $scope.openVideoRoom = () => {
      window.location.href = "/videoRoom";
    };

    $scope.removeRoom = (ID) =>{

        var url = "/removeRoom?id="+ID;
        $http({
            method: "POST",
            url: url
        }).then(function successCallback(response) {
            $scope.socket.emit('Delete Room', {chatRoomNumber:parseInt(response.data),username:$scope.paramUsername});
            var newArray = [];
            for(i=0; i < $scope.buttons.length; i++){
                if($scope.buttons[i].ID !== parseInt(response.data)){
                    newArray.push($scope.buttons[i]);
                }
            }
            $scope.buttons = newArray;

        }, function errorCallback(response) {
            console.log('Oops');
            console.log(response);
        });
    };

    $scope.createRoom = (room_name) => {

        if(room_name === undefined){

            $window.alert("The Room Name Cannot Be Undefined");

        }else{
            //This trims the roomname.
            room_name = room_name.replace('(','');
            room_name = room_name.replace(')','');
            room_name = room_name.replace('[','');
            room_name = room_name.replace(']','');
            room_name = room_name.replace(';','');

            var err = false;
            for(i = 0; i < $scope.buttons.length; i++){
                if($scope.buttons[i].name === room_name){
                    err = true;
                }
            }
            if(err){
                $window.alert("This Chat Room Already Exists");
            }
            else{
                $('#createChatroomText').val("");
                var url = "/createRoom?room_name="+room_name;
                $http({
                    method: "POST",
                    url: url
                }).then(function successCallback(response) {
                    $scope.socket.emit('Chat Room', {ID:parseInt(response.data),name:room_name,username:$scope.paramUsername});
                    var newButton = {ID:parseInt(response.data),name:room_name};
                    $scope.buttons.push(newButton);

                }, function errorCallback(response) {
                    //console.log('Oops');
                    //console.log(response);
                    $window.alert(response.data);
                });
            }
        }
    };

    $scope.socketInsert = (sendChatRoomObject) => {
        var newButton = {ID:sendChatRoomObject.ID,name:sendChatRoomObject.name};
        $scope.buttons.push(newButton);
        $scope.$apply();
    };

    $scope.goToAbout = () => {
        var switchUrl;
        switchUrl = "/aboutPage?username=" + $scope.paramUsername;
        window.location.href = switchUrl;
    };
});
