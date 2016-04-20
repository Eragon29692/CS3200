/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $rootScope) {
        var vm = this;

        vm.update = update;
        vm.user = {};

        function init() {
            render();
        }

        init();

        function render() {
            var user = UserService.findUserByID().then(function (respone) {
                vm.user = respone.data;
                delete vm.user.password;
            });
        }

        function update(user) {
            if (vm.myform.$valid) {
                if (user.password == "") {
                    delete user.password
                }
                UserService.updateUser(user).then(function (respone) {
                    console.log(respone.data);
                    //$rootScope.currentUser = respone;
                    $location.url("/profile");
                    render();
                });
            }
        }
    }
})();