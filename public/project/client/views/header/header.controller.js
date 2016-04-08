/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function(){
    angular
        .module("MusicDBApp")
        .controller("HeaderController", HeaderController );

    function HeaderController(SecurityService, $scope, $rootScope, $location) {
        $scope.logout = logout;
        function init() {
        }
        init();
        /*
        function logout() {
            $rootScope.currentUser = undefined;
            $rootScope.currentSong = undefined;
        }*/

        function logout() {
            SecurityService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = undefined;
                        $rootScope.currentSong = undefined;
                        $location.url("/");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }
})();