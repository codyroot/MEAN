/**
 * Login Service
 * - handles Login
 * - Set identity of the User
 * - communicates back to the Controller with a promise
 */
angular.module('app').factory('mvAuth', function ($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: function (username, password) {
            var defer = $q.defer();

            $http.post("/login", {username: username, password: password})
                .then(function (response) {
                    if (response.data.success) {
                        var user = new mvUser();
                        angular.extend(user, response.data.user);
                        mvIdentity.currentUser = user;
                        defer.resolve(true);
                    } else {
                        defer.resolve(false);
                    }
                });

            return defer.promise;
        },
        logoutUser: function () {
            $http.defaults.headers.post["Content-Type"] = "application/json";
            var defer = $q.defer();

            $http.post("/logout", {logout: true})
                .then(function () {
                    mvIdentity.currentUser = undefined;
                    defer.resolve();
                });

            return defer.promise;
        },
        authorizeCurrentUserForRoute: function (role) {
            if (mvIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject("not authorized");
            }
        }
    };
});