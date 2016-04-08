/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("PlaylistController", PlaylistController);

    function PlaylistController(PlaylistService, $scope, $location, $rootScope) {
        var vm = this;

        $scope.addPlaylist = addPlaylist;
        $scope.updatePlaylist = updatePlaylist;
        $scope.deletePlaylist = deletePlaylist;
        $scope.selectPlaylist = selectPlaylist;

        function init() {
            render();
        }
        init();

        function render() {
            PlaylistService.findAllPlaylistsForUser($rootScope.currentUser._id).then (function (response) {
                console.log(response.data);
                $scope.playlists = response.data;
            });
        }

        function addPlaylist(playlist) {
            if (!(playlist === undefined))
                PlaylistService.createPlaylistForUser($rootScope.currentUser._id, playlist).then (function (respone) {
                    console.log(respone.data);
                    render();
                });
        }

        function updatePlaylist(playlist) {
            if (!(playlist === undefined))
                PlaylistService.updatePlaylistById(playlist._id, playlist).then (function (respone) {
                    console.log(respone.data);
                    render();
                });
        }

        function deletePlaylist(playlist) {
            PlaylistService.deletePlaylistById(playlist._id).then (function (respone) {
                console.log(respone.data);
                render();
            });
        }

        function selectPlaylist(playlist) {
            var selectedPlaylist = {
                _id    : playlist._id,
                title  : playlist.title,
                userId : playlist.userId,
                songs : playlist.songs
            };
            $scope.playlist = selectedPlaylist;
        }
    }
})();