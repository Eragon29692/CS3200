/**
 * Created by duyvu on 3/4/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("SongController", SongController);

    function SongController(SongService, $scope, $location, $rootScope) {
        var vm = this;
        var currentSong;
        $scope.addSong = addSong;
        $scope.updateSong = updateSong;
        $scope.deleteSong = deleteSong;
        $scope.selectSong = selectSong;

        function init() {
            render();
        }

        init();

        function render() {
            SongService.findAllSongsForUser($rootScope.currentUser._id, function (response) {
                $scope.songs = response;
            });
        }

        function addSong(song) {
            if (!(song === undefined))
                SongService.createSong(song, function (respone) {
                    console.log(respone);
                    render();
                });
        }

        function updateSong(song) {
            if (!(song === undefined))
                SongService.updateSongById(song._id, song, function (respone) {
                    console.log(respone);
                });
            render();
        }

        function deleteSong(song) {
            SongService.deleteSongById(song._id, function (respone) {
                console.log(respone);
            });
            render();
        }

        function selectSong(song) {
            var selectedSong = {
                _id: song._id,
                title: song.title,
                artist: song.artist,
                //userId: song.userId
            };
            $scope.song = selectedSong;
            $rootScope.currentSong = selectedSong;
        }
    }
})();