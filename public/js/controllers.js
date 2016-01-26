'use strict';

/* Controllers */

var parserAppController = angular.module('parserApp.controllers', ['parserApp.services']);


parserAppController.controller('ClientListCtrl', ['$scope', '$routeParams', '$localStorage', '$sessionStorage', 'state', function($scope, $routeParams, $localStorage, $sessionStorage, state){
    
    $scope.ok = 'all ok';
    $scope.data = state.data;

}]);

parserAppController.controller('FileCtrl', ['$scope', '$routeParams', 'FileUploader', '$localStorage', '$sessionStorage', 'state', function($scope, $routeParams, FileUploader, $localStorage, $sessionStorage, state){
    

    $scope.$storage = $localStorage.$default({
          showError: false,
          showMappingBtn: false,
    });

    $scope.toggleShowError = function(){
        $scope.$storage.showError = !$scope.$storage.showError;
    }

    $scope.goToMaping = function(obj){
        window.location = obj.target.getAttribute("data-href");
    }


    var uploader = $scope.uploader = new FileUploader({
            url: '/file'
    });

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        
        if(status!=200){
            $scope.showError = true;
            $scope.errorText = response.error;
        } else {
            $scope.showMappingBtn = true;
            state.data = response;
        }

    };

}])