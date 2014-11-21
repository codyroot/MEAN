/**
 * Login Controller
 * - handles the notify msg
 */
angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, mvNotifier, mvIdentity, mvAuth, $location) {

    $scope.identity = mvIdentity;

    /**
     * Clientside Ajax Login
     * @param username
     * @param password
     */
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

    /**
     * Logout
     */
    $scope.signout = function () {
        mvAuth.logoutUser()
            .then(function () {
                $scope.username = "";
                $scope.password = "";
            });
        mvNotifier.notify("Logged Out");

        // Redirect to root
        $location.path("/");
    };


});