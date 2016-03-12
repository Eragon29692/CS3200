/**
 * Created by duyvu on 2/28/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .factory("UserService", UserService);

    function UserService() {

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
            return $http.post("/api/project/MusicDB/register", user);
        }

        function login(username, password) {
            var credentials;
            credentials.username = username;
            credentials.password = password;
            return $http.post("/api/project/MusicDB/login", credentials);
        }


        function findAllUsers() {
            return $http.get("/api/project/MusicDB/findAllUsers");
        }

        function deleteUserById(userId) {
            return $http.post("/api/project/MusicDB/deleteUserById", userId);
        }

        function updateUser(userId, user) {
            return $http.post("/api/project/MusicDB/updateUser", user);
        }


    }
})();