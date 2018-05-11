var chatApp = angular.module('chatRoom', ['ngSanitize']).config(['$locationProvider', function($locationProvider) { $locationProvider.html5Mode({ enabled: true, requireBase: false }); }]);

chatApp.controller('chatController', function ($scope, $location) {
    $scope.messageObject;
    $scope.localMessageObject = [];
    $scope.chatRoomName;

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

        var url = "getChatRoomName";
        var send = {chatNumber:$scope.paramChatNumber};
        $.ajax({
            url: url,
            data: send,
            type: 'POST',
            cache: false,
            contentType: "application/x-www-form-urlencoded",
            success: (data) => {
                $scope.chatRoomName = JSON.parse(data)[0].name;
                $scope.$apply();
            },
            error: function (error) {
                alert(error.responseText);
            }
        });

        $scope.socket = io();

        $scope.socket.on('Chat Message', (sendMessageObject) => {
            if(sendMessageObject.chatRoomNumber === $scope.paramChatNumber && sendMessageObject.username !== $scope.paramUsername) {
                $scope.localInsert(sendMessageObject);
            }
        });
    };

    $scope.sendMessage = () => {
        var inputMessage = $("#message").val();
        inputMessage = $scope.findLinks(inputMessage);
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
                            var timeCreated = new Date();
                            var dateString = timeCreated.getFullYear() + "-" + ("0"+(timeCreated.getMonth()+1)).slice(-2) + "-" +
                                ("0" + timeCreated.getDate()).slice(-2) + " " + ("0" + timeCreated.getHours()).slice(-2) + ":" + ("0" + timeCreated.getMinutes()).slice(-2) +
                                ":" + ("0" + timeCreated.getSeconds()).slice(-2);
                            var ret = JSON.parse(data);
                            var sendMessageObject = {color: ret[0].color, username: $scope.paramUsername, message:inputMessage, timestamp:dateString, chatRoomNumber:$scope.paramChatNumber};
                            $scope.socket.emit('Chat Message', sendMessageObject);
                            //$scope.localInsert(ret[0].color, inputMessage, $scope.paramChatNumber, $scope.paramUsername);
                            $scope.localInsert(sendMessageObject);
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

    $scope.localInsert = (sendMessageObject) => {
        $scope.localMessageObject.push(sendMessageObject);
        $scope.$apply();
        $('#chatHolder').scrollTop($('#chatHolder')[0].scrollHeight);
        $("#message").val("");
    };

    $scope.backToMain = () => {
        var switchUrl;
        switchUrl = "/loginSwitch?username=" + $scope.paramUsername;
        window.location.href = switchUrl;
    };

    $scope.findLinks = (text) =>{
        var urlRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi
        return text.replace(urlRegex, function(url){
           return '<a href="//' + url + '" target="_blank">' + url + '</a>';
        });
    };

    $scope.goToAbout = () => {
        var switchUrl;
        switchUrl = "/aboutPage?username=" + $scope.paramUsername;
        window.location.href = switchUrl;
    };

    $scope.logout = () => {
        window.location.href = "/";
    };
});