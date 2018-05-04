var indexApp = angular.module('indexApp', []);

indexApp.controller('IndexController', function IndexController($scope) {
    $scope.myDropDown = 'Select A Value';
    $scope.submitLogin = () => {
        var color = $("#colorSelect").val();
        var username = $("#username").val();
        if(username === undefined || username === "") {
            window.alert("You must include text for you username");
        } else {
            var url;
            url = "/login?username=" + username + "&userColor="+ encodeURIComponent(color);
            window.location.href = url;
        }
    };
});