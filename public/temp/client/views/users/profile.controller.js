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
            var user = UserService.findUserByID().then(function (respone) {
                vm.user = respone.data;
                //console.log(respone.data);
            });

            //var user = $rootScope.currentUser;

        }

        init();

        function update(user) {
            if (vm.myform.$valid)
                console.log(user);
            UserService.updateUser(user).then(function (respone) {
                console.log(respone.data);
                //$rootScope.currentUser = respone;
                $location.url("/profile");
            });
        }
    }
})();