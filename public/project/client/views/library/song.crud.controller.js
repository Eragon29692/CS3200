/**
 * Created by duyvu on 3/11/2016.
 */
/**
 * Created by duyvu on 3/4/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("SongCRUDController", SongCRUDController);

    function SongCRUDController(SongService, $scope, $location, $rootScope) {
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
            SongService.findAllSongs().then(function (response) {
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
                    render();
                });
        }

        function deleteSong(song) {
            SongService.deleteSongById(song).then( function (respone) {
                console.log(respone.data);
                render();
            });
        }


        function selectSong(song) {
            var selectedSong = {
                _id: song._id,
                title: song.title,
                artist: song.artist
            };
            $scope.song = selectedSong;
            //$rootScope.currentSong = selectedSong;
        }
    }
})();