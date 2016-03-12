/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location, $rootScope) {
        var vm = this;

        vm.login = login;

        function init() {
            vm.invalidSubmit = false;
        }

        init();

        function login(user) {
            if (vm.myform.$valid)
                UserService.findUserByCredentials(user.username, user.password, function (respone) {
                    if (respone != null) {
                        console.log(respone);
                        $rootScope.currentUser = respone;
                        $location.url("/profile");
                    }
                    else {
                        console.log("invalid combination");
                        vm.invalidSubmit = true;
                    }
                });
        }
    }
})();