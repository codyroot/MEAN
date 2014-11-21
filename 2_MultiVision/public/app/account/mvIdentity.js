/**
 * Set a User
 */
angular.module("app").factory("mvIdentity", function ($window) {

    /**
     * Get the global bootstrappedUserObject, so its possible for Angular to check if an User is logged in
     * So both the Server and the >>Client>> knows which is the current authenticated user
     */
    var currentUser = ($window.bootstrappedUserObject) ? $window.bootstrappedUserObject : undefined;

    return {
        currentUser: currentUser,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
});