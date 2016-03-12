/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function(){
    angular
        .module("MusicDBApp")
        .controller("HeaderController", HeaderController );

    function HeaderController($scope, $rootScope) {
        $scope.logout = logout;
        function init() {
        }
        init();
        function logout() {
            $rootScope.currentUser = undefined;
            $rootScope.currentSong = undefined;
        }
    }
})();