/**
 * Created by duyvu on 3/11/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("FooterController", FooterController);

    function FooterController(SongService, $scope, $rootScope, $location, $route, $uibModal) {

        $scope.openComment = openComment;
        //$scope.currentSong;// = $rootScope.currentSong;

        function init() {
        }

        init();


        //modal
        function openComment() {
            if ($rootScope.currentSong) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/footer/modal.template.html',
                    controller: 'ModalInstanceCtrl'
                });

                modalInstance.result.then(
                    function () {
                        $route.reload();
                    },
                    function () {
                        $route.reload();
                    }
                );
            }
        }
    }

    angular.module("MusicDBApp").controller('ModalInstanceCtrl', function (SongService, $scope, $rootScope, $uibModalInstance) {

            function init() {
                $scope.song = $rootScope.currentSong;
                console.log($scope.song);
            }

            init();

            $scope.ok = function (comment) {
                var newComment = {"content" : comment};
                newComment.username = $rootScope.currentUser.username;
                newComment.songId = $rootScope.currentSong._id;
                console.log(newComment);
                SongService.addComment(newComment).then(
                    function (response) {
                        console.log("runhera");
                        SongService.findSongById($rootScope.currentSong._id).then(
                            function(song) {
                                $rootScope.currentSong = song.data;
                                $scope.song = song.data;
                            }
                        );
                    },
                    function(err) {
                        console.log("error");
                    }
                );
            }

            $scope.delete = function (comment) {
                SongService.deleteComment(comment).then(
                    function (response) {
                        SongService.findSongById($rootScope.currentSong._id).then(
                            function(song) {
                                $rootScope.currentSong = song.data;
                                $scope.song = song.data;
                            }
                        );
                    },
                    function(err) {
                        console.log("error");
                    }
                );
            }

            $scope.cancel = function () {
                $uibModalInstance.dismiss('close');
            };
        }
    );

})();