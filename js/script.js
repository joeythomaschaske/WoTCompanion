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
        .when('/tankstats/:id/:id', {
            templateUrl : 'tankstats.html',
            controller  : 'contactController'
        });
});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', ['$scope', '$http', function($scope, $http) {
    // create a message to display in our view
    $scope.name;
    $scope.players;
    $scope.allTanks;
    $scope.search = function(event){
        if($scope.name && $scope.name.length > 2){
            $scope.players = JSON.parse(getPlayers($scope.name)).data;
        }
    };

    var url = getAllVehicles();
    $http({
        method: 'GET',
        url: url
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('response');
        console.log(response.data.data);
        $scope.allTanks = response.data.data;
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('error');
        console.log(response);
    });

    $scope.searchedVehicles = [];
    $scope.tankText;
    $scope.findVehicles = function(event){
        console.log('event');
        $scope.searchedVehicles = [];
        for(var i = 0; i < $scope.allTanks.length; ++i){
            console.log($scope.allTanks[i]);
            if($scope.allTanks[i].name.indexOf($scope.tankText) > -1){
                $scope.searchedVehicles.push($scope.allTanks[i]);
            }
        }
    };


}]);

scotchApp.controller('aboutController', ['$scope', '$location', function($scope, $location) {
    $scope.tanks;
    $scope.account;
    var accountId = $location.path().split('/')[2];
    $scope.account = accountId;
    console.log(JSON.parse(getPlayerPersonalData(accountId)));
    $scope.personalData = JSON.parse(getPlayerPersonalData(accountId)).data[accountId].statistics.all;

    var tanksInGarage = JSON.parse(getVehicleStatistics(accountId, '')).data[[accountId]];
    var tankIds = [];
    for(var i = 0; i < tanksInGarage.length; ++i){
        tankIds.push(tanksInGarage[i].tank_id);
    }

    var queriedTanksInGarage = [];
    for(var i = 0; i < tankIds.length; ++i){
        var tank = JSON.parse(getVehicleDetails(tankIds[i])).data[tankIds[i]];
        queriedTanksInGarage.push(tank);
    }
    console.log('Queried Tanks');
    console.log(queriedTanksInGarage);
    $scope.tanks = queriedTanksInGarage;

}]);

scotchApp.controller('contactController', ['$scope', '$location', function($scope, $location) {
    $scope.accountId = $location.path().split('/')[3];
    $scope.tankId = $location.path().split('/')[2];
    $scope.tankStats = JSON.parse(getVehicleStatistics($scope.accountId, $scope.tankId)).data[$scope.accountId][0].all;
    $scope.tankDescription = JSON.parse(getVehicleDetails($scope.tankId)).data[$scope.tankId];
    $scope.tankAchievements = JSON.parse(getVehicleAchievements($scope.accountId, $scope.tankId)).data[$scope.accountId][0].achievements;
    console.log($scope.tankStats);
    console.log($scope.tankDescription);
    console.log($scope.tankAchievements);
}]);
