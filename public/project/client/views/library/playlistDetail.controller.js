/**
 * Created by DUY on 3/24/2016.
 */
/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("PlaylistDetailController", PlaylistDetailController);

    function PlaylistDetailController(PlaylistDetailService, PlaylistService, $scope, $location, $rootScope, $routeParams) {
        var vm = this;

        vm.selectSong = selectSong;
        vm.deleteSong = deleteSong;
        vm.render = render;

        function init() {
            //console.log($routeParams.playlistId);
            PlaylistService.findPlaylistById($routeParams.playlistId).then(function (response) {
                vm.playlist = response.data;
            });
            render();
        }

        init();

        function render() {
            PlaylistDetailService.getSongsForPlaylist($routeParams.playlistId).then(function (response) {
                vm.songs = response.data;
                console.log(response.data);
            });
        }


        function deleteSong(songId) {
            PlaylistDetailService.deleteSongFromPlaylist(songId, $routeParams.playlistId).then(function (respone) {
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
            vm.song = selectedSong;
            $rootScope.currentSong = selectedSong;
        }


        //sorting
        vm.sortableOptions = {
            start: function(e, ui) {
                ui.item.data('startPos', $(ui.item).index());
            },
            stop: function(e, ui) {
                console.log(ui.item.data('startPos'));
                console.log($(ui.item).index());
                var newOrder = {first:ui.item.data('startPos'), second:$(ui.item).index()};
                PlaylistDetailService.updateOrder(newOrder, $routeParams.playlistId);
            }
        };
    }
})();