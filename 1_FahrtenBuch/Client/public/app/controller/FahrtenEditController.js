var app = angular.module("basicApp");


app.controller("FahrtenEditController", function ($scope, $http, $location, $routeParams) {

    $scope.fahrt = {};
    var id = $routeParams.id;

    $http.get("http://localhost:3000/fahrten/" + id).success(function (response) {
        $scope.fahrt = response;
    });

    $scope.saveFahrt = function () {
        $http.put("http://localhost:3000/fahrten/" + $scope.fahrt._id, $scope.fahrt)
            .success(function (response) {
                $location.url("/fahrten")
            });
    };

});