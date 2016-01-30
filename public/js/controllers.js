'use strict';

/* Controllers */

var parserAppController = angular.module('parserApp.controllers', ['parserApp.services']);


parserAppController.controller('ClientListCtrl', ['$scope', '$http', 'state', 'config', function($scope, $http, state, config){
    $scope.cacheForm = state.cacheForm;
    $scope.statusDefault = config.status;
    $scope.response = state.response;
    
    $scope.response.oldMapping = JSON.parse(JSON.stringify($scope.response.mapping));

    if($scope.response){
        $scope.countColspan = Object.keys(state.response.tableHeader).length;
    } else {
        $scope.countColspan = 0;
    }

    if($scope.response == undefined){
        window.location = '/';
    }

    $scope.changeField = function(newValue, oldValue){

        var forClone = $scope.response.oldMapping.map(function(key){ return key;}).indexOf(oldValue);

        var forReplace = $scope.response.mapping.map(function(key, i){ return (i != forClone && key == newValue);}).indexOf(true);

        $scope.response.mapping[forReplace] = $scope.response.oldMapping[forClone];
        
        $scope.response.oldMapping = JSON.parse(JSON.stringify($scope.response.mapping));
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

parserAppController.controller('FirstPageCtrl', ['$scope', 'FileUploader', 'state', 'config', function($scope, FileUploader, state, config){
    
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