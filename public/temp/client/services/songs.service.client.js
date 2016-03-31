/**
 * Created by duyvu on 3/4/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .factory("SongService", SongService);

    function SongService($http, $rootScope) {

        var api = {
            //createSongForUser: createSongForUser,
            findAllSongsForUser: findAllSongsForUser,
            findAllSongs: findAllSongs,
            deleteSongById: deleteSongById,
            deleteUserSong: deleteUserSong,
            updateSongById: updateSongById,
            /////////////////////
            createSong: createSong

        };
        return api;

        function createSong(song) {
            return $http.post("/api/project/song/createSong", song);
        }

        function deleteSongById(song) {
            console.log(song);
            return $http.post("/api/project/song/deleteSongById", song);
        }

        function deleteUserSong(song) {
            var deleteInfo = {};
            deleteInfo.songID = song._id;
            deleteInfo.userID = $rootScope.currentUser._id;
            return $http.post("/api/project/song/deleteUserSong", deleteInfo);
        }

        function updateSongById(song) {
            return $http.post("/api/project/song/updateSongById", song);
        }

        function findAllSongsForUser() {
            return $http.post("/api/project/song/findAllSongsForUser/"+$rootScope.currentUser._id);
        }

        function findAllSongs() {
            return $http.get("/api/project/song/findAllSongs");
        }

    }
})();