/**
 * Created by duyvu on 3/4/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("SongController", SongController);

    function SongController(SongService, PlaylistService, PlaylistDetailService, $scope, $location, $rootScope) {
        var vm = this;
        var currentSong;
        $scope.addSong = addSong;
        $scope.updateSong = updateSong;
        $scope.deleteSong = deleteSong;
        $scope.deleteUserSong = deleteUserSong;
        $scope.selectSong = selectSong;
        $scope.addSongToPlaylist = addSongToPlaylist;

        function init() {
            PlaylistService.findAllPlaylistsForUser($rootScope.currentUser._id).then (function (response) {
                console.log(response.data);
                $scope.playlists = response.data;
            });
            render();
        }

        init();

        function render() {
            SongService.findAllSongsForUser().then(function (response) {
                $scope.songs = response.data;
            });
        }

        function addSong(song) {
            if (!(song === undefined))
                SongService.createSong(song).then(function (respone) {
                    console.log(respone.data);
                    render();
                });
        }

        function updateSong(song) {
            if (!(song === undefined))
                SongService.updateSongById(song).then(function (respone) {
                    console.log(respone.data);
                });
            render();
        }

        function deleteSong(song) {
            SongService.deleteSongById(song).then( function (respone) {
                console.log(respone.data);
                render();
            });
        }

        function deleteUserSong(song) {
            SongService.deleteUserSong(song).then( function (respone) {
                console.log(respone.data);
                render();
            });
        }
        //can be delegated to just the last line
        function selectSong(song) {
            var selectedSong = {
                _id: song._id,
                title: song.title,
                artist: song.artist,
                comment: song.comment
                //userId: song.userId
            };
            $scope.song = selectedSong;
            $rootScope.currentSong = selectedSong;
        }

        function addSongToPlaylist(songId, playlistId) {
            PlaylistDetailService.addSongToPlaylist(songId, playlistId).then( function (response) {
                console.log("added");
                render();
            });
        }
    }
})();