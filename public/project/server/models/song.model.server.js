var mock = require("./song.mock.json");
module.exports = function () {

    var api = {
        //createSongForUser: createSongForUser,
        //findAllSongsForUser: findAllSongsForUser,
        deleteSongById: deleteSongById,
        updateSongById: updateSongById,
        /////////////////////
        createSong: createSong,
        findAllSongs: findAllSongs
    };
    return api;

/*
    //this function is soon to be depcrecated
    function createSongForUser(userId, song) {
        var newSong = {
            _id: (new Date()).getTime(),
            title: song.title,
            artist: song.artist,
            userId: userId
        };
        mock.push(newSong);
        return newSong;
    }
*/
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
    function deleteSongById(songId) {
        console.log(songId);
        for (var i = mock.length - 1; i >= 0; i--) {
            if (songId == mock[i]._id) {
                mock.splice(i, 1);
                return mock;
            }
        }
        return null;
    }

    //this won't be used
    function updateSongById(songId, newSong) {
        var updateSong = {
            _id: newSong._id,
            title: newSong.title,
            artist: newSong.artist
        };
        for (var f in mock) {
            if (songId === mock[f]._id) {
                mock[f] = updateSong;
                return updateSong;
            }
        }
        return null;
    }

    ///////////////////////////////////////////////////////////
/*    function findAllSongsForUser(userId, callback) {
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
*/

    function createSong(song) {
        var newSong = {
            _id: (new Date()).getTime().toString(),
            title: song.title,
            artist: song.artist,
        };
        mock.push(newSong);
        return newSong;
    }

    function  findAllSongs() {
        return mock;
    }

/*
    function findMovieByImdbID(imdbID) {
        for (var m in movies) {
            if (movies[m].imdbID === imdbID) {
                return movies[m];
            }
        }
        return null;
    }
    */
}