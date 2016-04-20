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
            addUser: addUser,
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

        function addUser(user) {
            return $http.post("/api/project/MusicDB/addUser", user);
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
            return $http.post("/api/project/MusicBD/deleteUser/" + $rootScope.currentUser._id, deleteInfo);
        }

        function updateUser(user) {
            return $http.post("/api/project/MusicBD/updateUser", user);
        }

    }
})();