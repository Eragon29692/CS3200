/**
 * Created by duyvu on 2/19/2016.
 */
"use strict";
(function(){
    angular
        .module("MusicDBApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })

            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                resolve: { loggedin: checkLoggedin }
            })

            .when("/library",{
                templateUrl: "views/library/songs.view.html",
                resolve: { loggedin: checkLoggedin }
                //controller: "FormController",
                //controllerAs: "model"
            })

            .when("/playlist",{
                templateUrl: "views/library/playlist.view.html",
                resolve: { loggedin: checkLoggedin }
                //controller: "PlaylistController",
                //controllerAs: "model"
            })

            .when("/playlist/:playlistId/songs",{
                templateUrl: "views/library/playlistDetail.view.html",
                controller: "PlaylistDetailController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })

            .when("/crudUser",{
                templateUrl: "views/users/user.crud.view.html",
                resolve: { loggedin: checkLoggedin }
            })

            .when("/crudSong",{
                templateUrl: "views/library/song.crud.view.html",
                resolve: { loggedin: checkLoggedin }
            })

            .otherwise({
                redirectTo: "/login"
            });
    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.error = 'You need to log in.';
                deferred.reject();
                $location.url('/');
            }
        });

        return deferred.promise;
    };
})();