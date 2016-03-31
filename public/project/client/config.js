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
                controllerAs: "model"
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
                controllerAs: "model"
            })

            .when("/admin",{
                templateUrl: "views/admin/admin.view.html"
            })

            .when("/library",{
                templateUrl: "views/library/songs.view.html"
                //controller: "FormController",
                //controllerAs: "model"
            })

            .when("/playlist",{
                templateUrl: "views/library/playlist.view.html",
                //controller: "PlaylistController",
                //controllerAs: "model"
            })

            .when("/playlist/:playlistId/songs",{
                templateUrl: "views/library/playlistDetail.view.html",
                controller: "PlaylistDetailController",
                controllerAs: "model"
            })

            .when("/crudUser",{
                templateUrl: "views/users/user.crud.view.html"
            })

            .when("/crudSong",{
                templateUrl: "views/library/song.crud.view.html"
            })

            .otherwise({
                redirectTo: "/home"
            });
    }
})();