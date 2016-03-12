/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $rootScope) {
        var vm = this;
        vm.register = register;
        function init() {
        }

        init();

        function register(user) {
            if (vm.myform.$valid)
                UserService.createUser(user, function (respone) {
                    console.log(respone);
                    $rootScope.currentUser = respone;
                    $location.url("/profile");
                });
        }
    }
})();