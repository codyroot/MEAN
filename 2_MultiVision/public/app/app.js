/**
 * Initialize Angular Module
 */
angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {

    /**
     * Clientside Routing
     */
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mvMainCtrl'
        });
        //.when('/asd', {
        //    templateUrl: '/partials/test',
        //    controller: 'mainCtrl'
        //});

    /**
     * HTML5 URL Routing Mode
     */
    $locationProvider.html5Mode(true);
});
