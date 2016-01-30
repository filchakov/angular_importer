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
                controller: 'FirstPageCtrl'
            }).
            when('/mapping', {
                templateUrl: function($route){
                    return config.path + 'second.html';
                },
                controller: 'ClientListCtrl'
            }).
            when('/preview', {
                templateUrl: function($route){
                    return config.path + 'third.html';
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