/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(SecurityService, UserService, $location, $rootScope) {
        var vm = this;
        vm.register = register;
        function init() {
        }

        init();

        function register(user) {
            if (vm.myform.$valid) {
                SecurityService.register(user).then(
                    function (response) {
                        if (response.data) {
                            console.log(response.data);
                            $rootScope.currentUser = response.data;
                            $location.url("/profile");
                        }
                    },
                    function (err) {
                        console.log(err);
                        vm.error = err;
                    }
                );
            }
        }
    }
})();