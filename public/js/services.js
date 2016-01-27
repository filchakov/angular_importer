'use strict';

var parserAppServices = angular.module('parserApp.services', ['ngResource']);

parserAppServices.factory('state', ['$localStorage', '$sessionStorage', function($localStorage, $sessionStorage){
    
    return $localStorage.$default({
          cacheForm: {}
    });
}]);