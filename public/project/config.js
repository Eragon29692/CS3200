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
                templateUrl: "client/views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("/profile", {
                templateUrl: "client/views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })

            .when("/admin",{
                templateUrl: "client/views/admin/admin.view.html"
            })

            .when("/library",{
                templateUrl: "client/views/library/songs.view.html"
                //controller: "FormController",
                //controllerAs: "model"
            })

            .when("/crudSong",{
                templateUrl: "client/views/library/song.crud.view.html"
                //controller: "FormController",
                //controllerAs: "model"
            })

            .when("/crudUser",{
                templateUrl: "client/views/users/user.crud.view.html"
            })

            .otherwise({
                redirectTo: "/home"
            });
    }
})();