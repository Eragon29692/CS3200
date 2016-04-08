/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("HomeController", HomeController);

    function HomeController(SongService, SpotifyService, $location, $rootScope, $q, $timeout, $http) {
        var vm = this;

        vm.search = search;
        vm.addSong = addSong;

        function init() {
            //if ($rootScope.searchWord) {
            //    search($rootScope.searchWord);
            //}
            loggin();
        }
        init();

        function search(songTitle) {
            if (songTitle && songTitle != "") {
                vm.data = undefined;
                vm.clicked = true;
                $rootScope.searchWord = vm.songTitle;
                SpotifyService
                    .searchSongByName(songTitle)
                    .then(function (response) {
                        vm.data = response.data;
                        vm.clicked = false;
                    });
            }
        }
        //working on adding song
        function addSong(song) {
            SongService.createSong(song).then(function (respone) {
                console.log(respone.data);
            });
        }

        function loggin ()
        {
            var deferred = $q.defer();
            $http.get('/api/loggedin').success(function(user)
            {
                if (user !== '0')
                {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                }
                else
                {
                    console.log("You should loggin");
                    deferred.reject();
                }
            });

            return deferred.promise;
        };
    }
})();