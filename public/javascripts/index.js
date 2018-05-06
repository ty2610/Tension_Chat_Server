var indexApp = angular.module('indexApp', []);

indexApp.controller('IndexController', function IndexController($scope) {
    $scope.myDropDown = 'Select A Value';
    $scope.submitNewLogin = () => {
        var color = $("#colorSelect").val();
        var username = $("#username").val();
        if(username === undefined || username === "") {
            window.alert("You must include text for your username");
        } else {
            var url = "/login/create";
            var send = {username:username,userColor:color};
            $.ajax({
                url: url,
                data: send,
                type: 'POST',
                cache: false,
                contentType: "application/x-www-form-urlencoded",
                success: (data) => {
                    var switchUrl;
                    switchUrl = "/loginSwitch?username=" + username;
                    window.location.href = switchUrl;
                },
                error: function (error) {
                    alert(error);
                }
            });
        }
    };

    $scope.submitLogin = () => {
        var knownUsername = $("#knownUsername").val();
        if(knownUsername === undefined || knownUsername === "") {
            window.alert("You must include text for your username");
        } else {
            var url = "login/enter";
            var send = {username:knownUsername};
            $.ajax({
                url: url,
                data: send,
                type: 'POST',
                cache: false,
                contentType: "application/x-www-form-urlencoded",
                success: (data) => {
                    var switchUrl;
                    switchUrl = "/loginSwitch?username=" + knownUsername;
                    window.location.href = switchUrl;
                },
                error: function (error) {
                    alert(error.responseText);
                }
            });
        }
    };
});