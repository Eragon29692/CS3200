(function(){
    angular
        .module("MusicDBApp")
        .factory("SpotifyService", SpotifyService);

    function SpotifyService($http, $rootScope) {
        var api = {
            searchSongByName: searchSongByName
        };
        return api;

        function searchSongByName(track) {
            return $http.get("/api/project/spotify/" + track + "/" + $rootScope.currentUser._id);
        }
    }
})();