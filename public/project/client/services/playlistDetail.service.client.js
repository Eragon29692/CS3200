/**
 * Created by DUY on 3/24/2016.
 */
/**
 * Created by duyvu on 3/18/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .factory("PlaylistDetailService", PlaylistDetailService);

    function PlaylistDetailService($http) {

        var api = {
            //createSongForPlaylist: createSongForPlaylist,
            getSongsForPlaylist: getSongsForPlaylist,
            getSongForPlaylist: getSongForPlaylist,
            deleteSongFromPlaylist: deleteSongFromPlaylist,
            //updateSong: updateSong,
            updateOrder: updateOrder,
            addSongToPlaylist: addSongToPlaylist
        };
        return api;
/*
        function createSongForPlaylist(newSong, playlistId) {
            return $http.post("/api/project/playlist/" + playlistId + "/song", newSong);
        }
*/
        function getSongsForPlaylist(playlistId) {
            return $http.get("/api/project/playlist/" + playlistId + "/song");
        }

        function getSongForPlaylist(songId, playlistId) {
            return $http.get("/api/project/playlist/" + playlistId + "/song/" + songId);
        }

        function deleteSongFromPlaylist(songId, playlistId) {
            return $http.delete("/api/project/playlist/" + playlistId + "/song/" + songId);
        }
/*
        function updateSong(songId, playlistId, newSong) {
            console.log("ran");
            return $http.put("/api/project/playlist/" + playlistId + "/song/" + songId, newSong);
        }
*/
        function updateOrder(newOrder, playlistId) {
            console.log(newOrder);
            return $http.put("/api/project/playlist/" + playlistId + "/songOrder", newOrder);
        }

        function addSongToPlaylist(songId, playlistId) {
            console.log(songId);
            console.log(playlistId);
            var addInfo = {};
            addInfo.songId = songId;
            addInfo.playlistId = playlistId;
            return $http.put("/api/project/playlist/song/addSong", addInfo);
        }
    }
})();