/**
 * Created by duyvu on 3/4/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .factory("PlaylistService", PlaylistService);

    function PlaylistService($http, $rootScope) {

        var api = {
            createPlaylistForUser: createPlaylistForUser,
            findAllPlaylistsForUser: findAllPlaylistsForUser,
            findPlaylistById: findPlaylistById,
            deletePlaylistById: deletePlaylistById,
            updatePlaylistById: updatePlaylistById
        };
        return api;

        function createPlaylistForUser(userId, playlist) {
            return $http.post("/api/project/user/"+ $rootScope.currentUser._id +"/playlist", playlist);
        }

        function findAllPlaylistsForUser(userId) {
            return $http.get("/api/project/user/" + $rootScope.currentUser._id + "/playlist");
        }

        function findPlaylistById(playlistId) {
            return $http.get("/api/project/playlist/" + playlistId);
        }

        function deletePlaylistById(playlistId) {
            return $http.delete("/api/project/playlist/" + playlistId);
        }

        function updatePlaylistById(playlistId, newPlaylist) {
            //console.log(playlistId);
            return $http.put("/api/project/playlist/" + playlistId, newPlaylist);
        }
    }
})();