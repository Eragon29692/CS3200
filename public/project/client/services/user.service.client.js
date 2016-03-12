/**
 * Created by duyvu on 2/28/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            findUserByCredentials: login,
            findAllUsers: findAllUsers,
            createUser: register,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            //////////////////////
            findUserByID: findUserByID
        };

        return api;

        function findUserByID() {
            return $http.get("/api/project/MusicDB/profile/"+$rootScope.currentUser._id);
        }

        function register(user) {
            //console.log(user);
            return $http.post("/api/project/MusicDB/register", user);
        }

        function login(credentials) {
            return $http.post("/api/project/MusicDB/login", credentials);
        }


        function findAllUsers() {
            return $http.get("/api/project/MusicDB/findAllUsers");
        }

        function deleteUserById(userId) {
            var deleteInfo = {};
            deleteInfo.userID = userId;
            return $http.post("/api/project/MusicBD/deleteUser", deleteInfo);
        }

        function updateUser(user) {
            return $http.post("/api/project/MusicBD/updateUser", user);
        }

    }
})();