var app = angular.module("basicApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/fahrten", {
            templateUrl: "/app/templates/fahrten/list.html",
            controller: "FahrtenListController"
        })
        .when("/fahrten/new", {
            templateUrl: "/app/templates/fahrten/create.html",
            controller: "FahrtenCreateController"
        })
        .when("/fahrten/:id/edit", {
            templateUrl: "/app/templates/fahrten/edit.html",
            controller: "FahrtenEditController"
        })
        .otherwise({redirectTo: "/fahrten"});
});
