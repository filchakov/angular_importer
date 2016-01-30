'use strict';

/* Controllers */

var parserAppController = angular.module('parserApp.controllers', ['parserApp.services']);


parserAppController.controller('ClientListCtrl', ['$scope', '$http', 'state', 'config', 'operation', function($scope, $http, state, config, operation){
    $scope.cacheForm = state.cacheForm;
    $scope.statusDefault = config.status;
    $scope.response = state.response;
    
    $scope.response.old_mapping = JSON.parse(JSON.stringify($scope.response.mapping));

    if(operation == 'preview'){
        $scope.onlyRead = true;
    }

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

    $scope.changeField = function(new_value, old_value){

        var for_clone = $scope.response.old_mapping.map(function(key){ return key;}).indexOf(old_value);

        var for_replace = $scope.response.mapping.map(function(key, i){ return (i != for_clone && key == new_value);}).indexOf(true);

        $scope.response.mapping[for_replace] = $scope.response.old_mapping[for_clone];
        
        $scope.response.old_mapping = JSON.parse(JSON.stringify($scope.response.mapping));

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

parserAppController.controller('FileCtrl', ['$scope', 'FileUploader', 'state', 'config', function($scope, FileUploader, state, config){
    
    $scope.cacheForm = state.cacheForm;
    $scope.statusDefault = config.status;
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