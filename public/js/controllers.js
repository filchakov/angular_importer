'use strict';

/* Controllers */

var parserAppController = angular.module('parserApp.controllers', []);


parserAppController.controller('ClientListCtrl', ['$scope', '$routeParams', function($scope, $routeParams){
    
    $scope.category = $routeParams.category;

}]);


parserAppController.controller('FileCtrl', ['$scope', '$routeParams', 'FileUploader', function($scope, $routeParams, FileUploader){
    $scope.data = [{
        file: 'csv',
        data: [
            ['first name1', 'email@email.com', 'last name'],
            ['first name2', 'email@email.com', 'last name'],
            ['first name3', 'email@email.com', 'last name'],
            ['first name4', 'email@email.com', 'last name'],
        ]
    }];
    var uploader = $scope.uploader = new FileUploader({
            url: '/file'
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

}])