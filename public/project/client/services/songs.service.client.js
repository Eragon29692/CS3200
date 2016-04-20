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
            findAllSongsForUser: findAllSongsForUser,
            findAllSongs: findAllSongs,
            deleteSongById: deleteSongById,
            updateSongById: updateSongById,
            createSong: createSong,
            addSongForUser: addSongForUser,
            deleteUserSong: deleteUserSong,
            addComment: addComment,
            deleteComment: deleteComment,
            findSongById: findSongById
        };
        return api;

        function createSong(song) {
            return $http.post("/api/project/song/createSong", song);
        }

        function addSongForUser(song) {
            return $http.post("/api/project/MusicBD/addSongForUser/" + $rootScope.currentUser._id, song);
        }

        function deleteSongById(song) {
            console.log(song);
            return $http.post("/api/project/song/deleteSongById", song);
        }

        function deleteUserSong(song) {
            var deleteInfo = {};
            deleteInfo.songID = song._id;
            deleteInfo.userID = $rootScope.currentUser._id;
            return $http.post("/api/project/MusicBD/deleteUserSong", deleteInfo);
        }

        function updateSongById(song) {
            return $http.post("/api/project/song/updateSongById", song);
        }

        function findAllSongsForUser() {
            return $http.get("/api/project/song/findAllSongsForUser/"+$rootScope.currentUser._id);
        }

        function findAllSongs() {
            return $http.get("/api/project/song/findAllSongs");
        }

        function addComment(comment) {
            return $http.post("/api/project/song/addComment", comment);
        }

        function deleteComment(comment) {
            return $http.post("/api/project/song/deleteComment", comment);
        }

        function findSongById(songId) {
            return $http.get("/api/project/song/findSongById/" + songId);
        }
    }
})();