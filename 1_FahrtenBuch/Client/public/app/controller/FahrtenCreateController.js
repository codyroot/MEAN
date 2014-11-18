var app = angular.module("basicApp");

app.controller("FahrtenCreateController", function ($scope, $http, $location) {

    $scope.fahrt = {};

    $scope.createFahrt = function () {
        $http.post("http://localhost:3000/fahrten", $scope.fahrt)
            .success(function (response) {
                $location.url("/fahrten");
            });
    };
});