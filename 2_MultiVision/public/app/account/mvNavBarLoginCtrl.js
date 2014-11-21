/**
 * Login Controller
 */
angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, $http) {
    $scope.password = "pw";
    $scope.username = "bobo";
    $scope.signin = function (username, password) {
        $http.post("/login", {username: username, password: password})
            .then(function (response) {
                //console.log(response);
                if (response.data.success) {
                    console.log("Logged in");
                } else {
                    console.log("Nope");
                }
            });
    };
});