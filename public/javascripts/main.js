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
    }
});
