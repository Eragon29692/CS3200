/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("LoginController", LoginController);

    function LoginController(SecurityService, UserService, $location, $rootScope) {
        var vm = this;

        vm.login = login;

        function init() {
            vm.invalidSubmit = false;
        }

        init();

        function login(user) {
            if (vm.myform.$valid)
                SecurityService
                    .login({
                        username: user.username,
                        password: user.password
                    })
                    .then(
                        function (response) {
                            //if (respone.data != null) {
                            console.log(response.data);
                            $rootScope.currentUser = response.data;
                            $location.url("/profile");
                            //}
                            //else {
                            //console.log("invalid combination");
                            //vm.invalidSubmit = true;
                            //}
                        },
                        function (err) {
                            console.log("invalid combination");
                            vm.invalidSubmit = true;
                        }
                    );
            /*
            UserService.findUserByCredentials({
                username: user.username,
                password: user.password
            }).then(function (respone) {
                if (respone.data != null) {
                    console.log(respone.data);
                    $rootScope.currentUser = respone.data;
                    $location.url("/profile");
                }
                else {
                    console.log("invalid combination");
                    vm.invalidSubmit = true;
                }
            });*/
        }
    }
})();