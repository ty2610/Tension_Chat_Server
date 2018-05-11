var aboutApp = angular.module('aboutApp', []).config(['$locationProvider', function($locationProvider) { $locationProvider.html5Mode({ enabled: true, requireBase: false }); }]);

aboutApp.controller('AboutController', function IndexController($scope, $location, $http, $window) {

    $scope.initialize = () => {
        $scope.paramUsername = $location.search().username;
    };

    $scope.logout = () => {
        window.location.href = "/";
    };

    $scope.backToMain = () => {
        var switchUrl;
        switchUrl = "/loginSwitch?username=" + $scope.paramUsername;
        window.location.href = switchUrl;
    };
});