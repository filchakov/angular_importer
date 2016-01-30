'use strict';

/* App Module */

var parserApp = angular.module('parserApp', ['ngRoute', 'ngResource', 'ngStorage', 'parserApp.controllers', 'parserApp.services', 'angularFileUpload', 'ngAnimate']);

parserApp.constant('config', {
    'path':'partials/',
    'status': [
        {'name':'active', 'value':'Active'},
        {'name':'suspended', 'value':'Suspended'},
        {'name':'deactive', 'value':'Deactive'},
    ]
});

parserApp.config(['$routeProvider','config' ,
    function($routeProvider, config) {

        $routeProvider.
            when('/', {
                templateUrl: function($route){
                    return config.path + 'first.html';
                },
                controller: 'FileCtrl'
            }).
            when('/mapping', {
                templateUrl: function($route){
                    return config.path + 'second.html';
                },
                resolve: {
                    operation: function(){return "mapping";}
                },
                controller: 'ClientListCtrl'
            }).
            when('/preview', {
                templateUrl: function($route){
                    return config.path + 'three.html';
                },
                resolve: {
                    operation: function(){return "preview";}
                },
                controller: 'ClientListCtrl'
            }).
            when('/success', {
                templateUrl: function($route){
                    return config.path + 'success.html';
                }
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);