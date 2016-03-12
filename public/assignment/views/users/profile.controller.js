/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $rootScope) {
        var vm = this;

        vm.update = update;
        vm.user = $rootScope.currentUser;

        function init() {
        }

        init();

        function update(user) {
            if (vm.myform.$valid)
                UserService.updateUser(user._id, user, function (respone) {
                    console.log(respone);
                    //$rootScope.currentUser = respone;
                    $location.url("/profile");
                });
        }
    }
})();