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
                for (var user in response.data) {
                    delete response.data[user].password;
                }
                $scope.users = response.data;
            });
        }

        function addUser(user) {
            if (!(user === undefined)) {
                //if (user.songs === undefined)
                //    user.songs = "";
                //user.songs = user.songs.split(",");
                UserService.addUser(user).then(function (respone) {
                    //console.log(respone.data);
                    if (respone.data) {
                        delete respone.data.password;
                        render();
                        selectUser(respone.data);
                    }
                });

            }
        }

        function updateUser(user) {
            //console.log(user);
            if (!(user._id === undefined)) {
                if (user.songs === undefined)
                    user.songs = "";
                user.songs = user.songs.split(",");
                UserService.updateUser(user).then(function (respone) {
                    //console.log(respone.data);
                    delete respone.data.password;
                    render();
                    selectUser(respone.data);
                });
            }
        }

        function deleteUser(user) {
            UserService.deleteUserById(user._id).then(function (respone) {
                //console.log(respone.data);
                render();
            });
        }

        function selectUser(user) {
            var selectedUser = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roles: user.roles,
                username: user.username,
                //password: user.password,
                //songs: user.songs.toString()
            };
            if (user.songs) {
                selectedUser.songs = user.songs.toString();
            } else {
                selectedUser.songs = "";
            }
            //selectedUser.songs = selectedUser.songs.split(",");
            $scope.user = selectedUser;
        }
    }
})();