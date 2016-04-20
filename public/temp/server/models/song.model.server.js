var mock = require("./song.mock.json");
var q = require("q");

module.exports = function (mysql) {

    var api = {
        deleteSongById: deleteSongById,
        updateSongById: updateSongById,
        /////////////////////
        createSong: createSong,
        findAllSongs: findAllSongs,
        findSongById: findSongById
    };
    return api;

    function deleteSongById(songId) {
        var deferred = q.defer();
        mysql.query('Call delete_song_by_id("' + songId + '")', function (err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(convertToFrontEnd(rows[0]));
            }
        });
        return deferred.promise;
    }

    //this won't be used
    function updateSongById(songId, newSong) {
        var deferred = q.defer();
        newSong = convertToDatabase(newSong);
        mysql.query('Call update_song_by_id("' + songId + '","' + newSong.title + '","'
            + newSong.artist + '","' + newSong.album + '","' + newSong.year + '")', function (err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(convertToFrontEnd(rows[0][0]));
            }
        });
        return deferred.promise;
    }

    ///////////////////////////////////////////////////////////

    function createSong(song) {
        var deferred = q.defer();
        song = convertToDatabase(song);
        mysql.query('Call create_song("' + song.songid + '","' + song.title + '","'
            + song.artist + '","' + song.album + '","' + song.year + '")', function (err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(convertToFrontEnd(rows[0][0]));
            }
        });
        return deferred.promise;
    }

    function  findAllSongs() {
        var deferred = q.defer();
        mysql.query('Call find_all_song()', function (err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var song in rows[0]) {
                    rows[0][song] = convertToFrontEnd(rows[0][song]);
                }
                console.log(rows[0]);
                deferred.resolve(rows[0]);
            }
        });
        return deferred.promise;
    }

    function findSongById(songId) {
        var deferred = q.defer();
        mysql.query('Call find_song_id("' + songId + '")', function (err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(convertToFrontEnd(rows[0][0]));
            }
        });
        return deferred.promise;
    }

    function convertToDatabase(song) {
        var converted = {
            songid: song._id,
            title: song.title,
            artist: song.artist,
            album: song.album,
            year: song.year
        }
        return converted;
    }

    function convertToFrontEnd(song) {
        if (song) {
            var converted = {
                _id: song.songid,
                title: song.title,
                artist: song.artist,
                album: song.album,
                year: song.year
            }
            return converted;
        }
        return null;
    }
}