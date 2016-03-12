/**
 * Created by duyvu on 3/11/2016.
 */
/**
 * Created by duyvu on 3/4/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("UserCRUDController", UserCRUDController);

    function UserCRUDController(UserService, $scope, $location, $rootScope) {
        var vm = this;
        var currentUser;
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;

        function init() {
            render();
        }

        init();

        function render() {
            UserService.findAllUsers().then(function (response) {
                $scope.users = response.data;
            });
        }

        function addUser(user) {
            if (!(user === undefined)) {
                if (user.songs === undefined)
                    user.songs = "";
                user.songs = user.songs.split(",");
                UserService.createUser(user).then(function (respone) {
                    console.log(respone.data);
                    selectUser(respone.data);
                });

            }
            render();
        }

        function updateUser(user) {
            if (!(user === undefined)) {
                if (user.songs === undefined)
                    user.songs = "";
                user.songs = user.songs.split(",");
                UserService.updateUser(user).then(function (respone) {
                    console.log(respone.data);
                    selectUser(respone.data);
                });

            }
            render();
        }

        function deleteUser(user) {
            UserService.deleteUserById(user._id).then( function (respone) {
                console.log(respone.data);
            });
            render();
        }

        function selectUser(user) {
            var selectedUser = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roles: user.roles,
                username: user.username,
                password: user.password,
                songs: user.songs.toString()
            };
            //selectedUser.songs = selectedUser.songs.split(",");
            $scope.user = selectedUser;
        }
    }
})();