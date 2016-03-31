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
                UserService.createUser(user).then( function (respone) {
                    console.log(respone.data);
                    $rootScope.currentUser = respone.data;
                    $location.url("/profile");
                });
        }
    }
})();