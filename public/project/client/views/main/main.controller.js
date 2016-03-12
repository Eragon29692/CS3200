/**
 * Created by duyvu on 2/19/2016.
 */
"use strict";
(function(){
    angular
        .module("MusicDBApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();