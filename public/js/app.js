'use strict';

/* App Module */

var parserApp = angular.module('parserApp', ['ngRoute', 'ngResource', 'ngStorage', 'parserApp.controllers', 'parserApp.services', 'angularFileUpload', 'ngAnimate']);

parserApp.constant('path', 'partials/');

parserApp.config(['$routeProvider','path' ,
    function($routeProvider, path) {

        $routeProvider.
            when('/', {
                templateUrl: function($route){
                    return path + 'first.html';
                },
                controller: 'FileCtrl'
            }).
            when('/mapping', {
                templateUrl: function($route){
                    return path + 'second.html';
                },
                controller: 'ClientListCtrl'
            }).
            when('/preview', {
                templateUrl: function($route){
                    return path + 'pages/dashboard.html';
                },
                controller: 'ClientListCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);