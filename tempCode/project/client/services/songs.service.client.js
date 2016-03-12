/**
 * Created by duyvu on 3/4/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .factory("SongService", SongService);

    function SongService(UserService) {

        var api = {
            //createSongForUser: createSongForUser,
            findAllSongsForUser: findAllSongsForUser,
            deleteSongById: deleteSongById,
            updateSongById: updateSongById,
            /////////////////////
            createSong: createSong

        };
        return api;

        function createSong(song) {
            return $http.get("/api/project/song/createSong", song);
        }

        function deleteSongById(songId) {
            return $http.get("/api/project/song/deleteSongById", songId);
        }

        function updateSongById(song) {
            return $http.get("/api/project/song/updateSongById", song);
        }

        function findAllSongsForUser() {
            return $http.get("/api/project/song/findAllSongsForUser/"+$rootScope.currentUser._id);
        }


    }
})();