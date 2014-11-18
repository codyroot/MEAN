var app = angular.module("basicApp");

app.controller("FahrtenListController", function ($scope, $http) {
    $scope.hello = "Hi YO!";

    $http.get("http://localhost:3000/fahrten")
        .success(function (response) {
            $scope.fahrten = response;
        })
        .error(function (err) {
            $scope.fahrten = err;
        });

    $scope.privateKm = function (fahrt) {
        if (fahrt.privat) {
            return fahrt.kmEnde - fahrt.kmStart;
        }
        return 0;
    };

    $scope.geschaeftlicheKm = function (fahrt) {
        if (fahrt.privat) {
            return 0;
        }
        return fahrt.kmEnde - fahrt.kmStart;
    };

    $scope.deleteFahrt = function (fahrt) {
        $http.delete("http://localhost:3000/fahrten/" + fahrt._id)
            .success(function (response) {
                $scope.fahrten.pop(fahrt);
            });
    };

    console.log("blubb");

});