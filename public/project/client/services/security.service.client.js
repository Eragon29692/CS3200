/**
 * Created by duyvu on 4/6/2016.
 */
(function(){
    angular
        .module("MusicDBApp")
        .factory("SecurityService", securityService);

    function securityService($http) {
        var api = {
            login: login,
            logout: logout,
            register: register
        };
        return api;

        function logout(user) {
            return $http.post("/api/logout");
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function register(user) {
            console.log(user);
            return $http.post("/api/register", user);
        }
    }
})();