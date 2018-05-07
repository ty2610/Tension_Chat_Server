var chatApp = angular.module('chatRoom', []).config(['$locationProvider', function($locationProvider) { $locationProvider.html5Mode({ enabled: true, requireBase: false }); }]);

chatApp.controller('chatController', function ($scope, $location) {
    $scope.messageObject;
    $scope.localMessageObject = [];

    $scope.paramUsername = $location.search().username;
    $scope.paramChatNumber = $location.search().chatNumber;
    $scope.initialize = () => {

        var url = "getMessages";
        var send = {chatRoomNumber:$scope.paramChatNumber};
        $.ajax({
            url: url,
            data: send,
            type: 'POST',
            cache: false,
            contentType: "application/x-www-form-urlencoded",
            success: (data) => {
                $scope.messageObject = JSON.parse(data);
                $scope.$apply();
                $('#chatHolder').scrollTop($('#chatHolder')[0].scrollHeight);
            },
            error: function (error) {
                alert(error.responseText);
            }
        });

        var socket = io();

        socket.emit('private message', "AYYYYE");

        socket.on('msg', (data) => {
            console.log(data);
        });
    };

    $scope.sendMessage = () => {
        var inputMessage = $("#message").val();
        if(inputMessage !== "" && inputMessage !== undefined) {
            var url = "sendMessage";
            var send = {chatRoomNumber:$scope.paramChatNumber, username:$scope.paramUsername, message:inputMessage};
            $.ajax({
                url: url,
                data: send,
                type: 'POST',
                cache: false,
                contentType: "application/x-www-form-urlencoded",
                success: (data) => {
                    url = "getUserColor";
                    send = {username:$scope.paramUsername};
                    $.ajax({
                        url: url,
                        data: send,
                        type: 'POST',
                        cache: false,
                        contentType: "application/x-www-form-urlencoded",
                        success: (data) => {
                            var ret = JSON.parse(data);
                            $scope.localInsert(ret[0].color, inputMessage, $scope.paramChatNumber, $scope.paramUsername);
                        },
                        error: function (error) {
                            alert(error.responseText);
                        }
                    });
                },
                error: function (error) {
                    alert(error.responseText);
                }
            });
        }
    };

    $scope.localInsert = (color, message, chatRoomNumber, username) => {
        var timeCreated = new Date();
        var dateString = timeCreated.getFullYear() + "-" + ("0"+(timeCreated.getMonth()+1)).slice(-2) + "-" +
            ("0" + timeCreated.getDate()).slice(-2) + " " + ("0" + timeCreated.getHours()).slice(-2) + ":" + ("0" + timeCreated.getMinutes()).slice(-2) +
            ":" + ("0" + timeCreated.getSeconds()).slice(-2);
        $scope.localMessageObject.push({color: color, username: username, message:message, timestamp:dateString});
        $scope.$apply();
        $('#chatHolder').scrollTop($('#chatHolder')[0].scrollHeight);
        $("#message").val("");
    };
});