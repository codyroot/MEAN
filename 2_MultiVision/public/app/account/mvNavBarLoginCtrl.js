/**
 * Login Controller
 * - handles the notify msg
 */
angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, mvNotifier, mvIdentity, mvAuth, $http) {

    $scope.identity = mvIdentity;
    $scope.signin = function (username, password) {
        mvAuth.authenticateUser(username, password)
            .then(function (success) {
                if (success) {
                    mvNotifier.notify("Logged In");
                } else {
                    mvNotifier.notify("Not Logged In");
                }
            });
    };
});