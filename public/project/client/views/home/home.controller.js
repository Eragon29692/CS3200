/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("HomeController", HomeController);

    function HomeController(SpotifyService, $location, $rootScope) {
        var vm = this;

        vm.search = search;


        function init() {
            console.log($rootScope.searchWord);
            if ($rootScope.searchWord) {
                search($rootScope.searchWord);
            }
        }
        init();

        function search(songTitle) {
            if (songTitle) {
                $rootScope.searchWord = vm.songTitle;
                SpotifyService
                    .searchSongByName(songTitle)
                    .then(function (response) {
                        vm.data = response.data;
                    });
            }
        }
    }
})();