(function(){
    angular
        .module("MusicDBApp")
        .factory("SpotifyService", SpotifyService);

    function SpotifyService($http) {
        var api = {
            searchSongByName: searchSongByName,
            //findMovieByImdbID: findMovieByImdbID
        };
        return api;
/*
        function findMovieByImdbID(imdbID) {
            return $http.get("http://www.omdbapi.com/?i="+imdbID);
        }
*/
        function searchSongByName(track) {
            return $http.get("http://api.spotify.com/v1/search?q=" + track + "&type=track&limit=10");
        }
    }
})();