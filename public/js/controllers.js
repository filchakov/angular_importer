'use strict';

/* Controllers */

var parserAppController = angular.module('parserApp.controllers', ['parserApp.services']);


parserAppController.controller('ClientListCtrl', ['$scope', '$http', 'state', function($scope, $http, state){
    
    $scope.cacheForm = state.cacheForm;
    $scope.response = state.response;
    
    if($scope.response){
        $scope.count_colspan = Object.keys(state.response.table_header).length;
    } else {
        $scope.count_colspan = 0;
    }

    if($scope.response == undefined){
        window.location = '/';
    }

    $scope.validate = function(){
        if(!$scope.cacheForm.password){
            alert("You did not fill in the password field");
        } else {
            window.location = '/#/preview';
        }
    }

    $scope.import = function(){
        $http.post('/import', {
            mapping: $scope.response.mapping, 
            file: $scope.response.file, 
            defaultValue: $scope.cacheForm}
        ).then(function(response){
            window.location = '/#/success';
        }, function(response){
            alert(response.data.error);
        });
    }

}]);

parserAppController.controller('FileCtrl', ['$scope', 'FileUploader', 'state', function($scope, FileUploader, state){
    
    $scope.cacheForm = state.cacheForm;
    $scope.cacheForm.status = $scope.cacheForm.status||'active';
    $scope.showError = false;
    $scope.showMappingBtn = false;

    $scope.toggleShowError = function(){
        $scope.showError = !$scope.showError;
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
            state.response = response;
        }

    };
    
}])