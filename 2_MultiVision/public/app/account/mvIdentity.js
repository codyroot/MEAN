/**
 * Set a User
 */
angular.module("app").factory("mvIdentity", function ($window, mvUser) {

    /**
     * Get the global bootstrappedUserObject, so its possible for Angular to check if an User is logged in
     * So both the Server and the >>Client>> knows which is the current authenticated user
     */
    var currentUser = ($window.bootstrappedUserObject)
        ? angular.extend(new mvUser(), $window.bootstrappedUserObject)
        : undefined;

    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorized: function (role) {
            return !!this.currentUser && mvIdentity.currentUser.roles.indexOf(role);
        }
    }
});