/**
 * Main View Controller
 */
angular.module('app').controller('mvMainCtrl', function ($scope) {
    $scope.courses = [
        {name: "Node.js for Pros", featured: true, published: new Date("2013, 3, 12")},
        {name: "Python for Snakes", featured: true, published: new Date("2013, 5, 1")},
        {name: "JavaScript for Ninjas", featured: false, published: new Date("2013, 7, 30")},
        {name: "C# for Sharper", featured: true, published: new Date("2014, 3, 3")},
        {name: "Pascal for Oldies", featured: false, published: new Date("2014, 8, 17")},
        {name: "Web Performance", featured: true, published: new Date("2015, 2, 11")},
        {name: "HTML5 Master", featured: true, published: new Date("2015, 4, 1")},
        {name: "CSS Shapes", featured: false, published: new Date("2015, 11, 11")}
    ];
});