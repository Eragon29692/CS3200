/**
 * Created by duyvu on 2/19/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "home.html"
            })

    }
})();