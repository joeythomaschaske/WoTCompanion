// script.js

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'search.html',
            controller  : 'mainController'
        })

        // route for the about page
        .when('/profile/:id', {
            templateUrl : 'profile.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'contact.html',
            controller  : 'contactController'
        });
});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.name;
    $scope.players;

    $scope.search = function(event){
        if($scope.name && $scope.name.length > 2){
            $scope.players = JSON.parse(getPlayers($scope.name)).data;
        }
    };


});

scotchApp.controller('aboutController', ['$scope', '$location', function($scope, $location) {
    $scope.message = 'Look! I am an about page.';
    var accountId = $location.path().split('/')[2];
    console.log(JSON.parse(getPlayerPersonalData(accountId)));
    $scope.personalData = JSON.parse(getPlayerPersonalData(accountId)).data[accountId].statistics.all;

}]);

scotchApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});
