/**
 * Created by duyvu on 3/11/2016.
 */
/**
 * Created by duyvu on 3/4/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .factory("SongService", SongService);

    function SongService(UserService) {
        var songs = [];
        songs = [
            {"_id": "000", "title": "Hello", "artist": "Adele", "userId": 123},
            {"_id": "010", "title": "Feeling Good", "artist": "Muse", "userId": 123},
            {"_id": "020", "title": "Take Me To Church", "artist": "Hoizer", "userId": 234}
        ];

        var api = {
            createSongForUser: createSongForUser,
            findAllSongsForUser: findAllSongsForUser,
            deleteSongById: deleteSongById,
            updateSongById: updateSongById,
            /////////////////////
            createSong: createSong

        };
        return api;

        //this function is soon to be depcrecated
        function createSongForUser(userId, song, callback) {
            var newSong = {
                _id: (new Date()).getTime(),
                title: song.title,
                artist: song.artist,
                userId: userId
            };
            songs.push(newSong);
            return callback(newSong);
        }

        /*
         function findAllSongsForUser(userId, callback) {
         var userSongs = [];
         for (var f in songs) {
         if (userId === songs[f].userId) {
         userSongs.push(songs[f]);
         }
         }
         return callback(userSongs);
         }
         */
        function deleteSongById(songId, callback) {
            for (var i = songs.length - 1; i >= 0; i--) {
                if (songId === songs[i]._id) {
                    songs.splice(i, 1);
                    return callback(songs);
                }
            }
            return null;
        }

        //this won't be used
        function updateSongById(songId, newSong, callback) {
            var updateSong = {
                _id: newSong._id,
                title: newSong.title,
                artist: newSong.artist,
                userId: newSong.userId
            };
            for (var f in songs) {
                if (songId === songs[f]._id) {
                    songs[f] = updateSong;
                    return callback(updateSong);
                }
            }
            return null;
        }
        ///////////////////////////////////////////////////////////
        function findAllSongsForUser(userId, callback) {
            UserService.findUserByID(userId, function (user) {
                //console.log(user);
                var userSongs = [];
                for (var songID in user.songs) {
                    for (var f in songs) {
                        if (user.songs[songID] === songs[f]._id) {
                            userSongs.push(songs[f]);
                            //console.log(f);
                        }
                    }
                }
                return callback(userSongs);
            });
        }


        function createSong(song, callback) {
            var newSong = {
                _id: (new Date()).getTime(),
                title: song.title,
                artist: song.artist,
            };
            songs.push(newSong);
            return callback(newSong);
        }

    }
})();