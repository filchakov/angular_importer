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
                    return path + 'three.html';
                },
                controller: 'ClientListCtrl'
            }).
            when('/success', {
                templateUrl: function($route){
                    return path + 'success.html';
                }
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);