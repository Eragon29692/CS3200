var mock = require("./playlist.mock.json");
// load q promise library
var q = require("q");

module.exports = function (db, mongoose) {

    // load user schema
    var PlaylistSchema = require("./playlist.schema.server.js")(mongoose);

    // create user model from schema
    var PlaylistModel = mongoose.model('playlistProject', PlaylistSchema);

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindByID: FindByID,
        Update: Update,
        Delete: Delete,
        //findPlaylistByTitle: findPlaylistByTitle,
        findUserPlaylists: findUserPlaylists,

        //song endpoint functions
        findAllSongInPlaylist: findAllSongInPlaylist,
        //findSongInPlaylist: findSongInPlaylist,
        deleteSongInPlaylist: deleteSongInPlaylist,
        addSongInPlaylist: addSongInPlaylist,
        updateOrder: updateOrder
    };
    return api;


    function Create(playlist) {
        var deferred = q.defer();
        var newPlaylist = {
            title: playlist.title,
            userId: playlist.userId,
            songs: []
        };
        PlaylistModel.create(newPlaylist, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function  FindAll() {
        var deferred = q.defer();
        PlaylistModel.find({}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function FindByID(playlistId) {
        var deferred = q.defer();
        PlaylistModel.findById(playlistId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function Update(playlistId, newPlaylist) {
        var deferred = q.defer();
        PlaylistModel.findById(playlistId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.title = newPlaylist.title;
                doc.songs = newPlaylist.songs;
                doc.save();
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function Delete(playlistId) {
        var deferred = q.defer();
        PlaylistModel.findById(playlistId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.remove();
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

/*
    function findPlaylistByTitle(title) {
        var deferred = q.defer();
        PlaylistModel.findOne({}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
*/

    function findUserPlaylists(userId) {
        var deferred = q.defer();
        PlaylistModel.find({userId : userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    //song endpoint


    function findAllSongInPlaylist(playlistId) {
        var deferred = q.defer();
        PlaylistModel.findById(playlistId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc.songs);
            }
        });
        return deferred.promise;
    }
/*
    function findSongInPlaylist(songId, playlistId) {
        var songs = findAllSongInPlaylist(playlistId);
        for (var f in songs) {
            if (songId === songs[f]) {
                return songs[f];
            }
        }
        return null;
    }
*/
    function deleteSongInPlaylist(songId, playlistId) {
        var deferred = q.defer();
        PlaylistModel.findById(playlistId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var i = doc.songs.length - 1; i >= 0; i--) {
                    if (songId === doc.songs[i]) {
                        doc.songs.splice(i, 1);
                        doc.save();
                        deferred.resolve(doc);
                        return;
                    }
                }
            }
        });
        return deferred.promise;
    }

    function addSongInPlaylist(songId, playlistId) {
        var deferred = q.defer();
        PlaylistModel.findById(playlistId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.songs.push(songId);
                doc.save();
                deferred.resolve(doc.songs);
            }
        });
        return deferred.promise;
    }


    function updateOrder(newOrder, playlistId) {
        var deferred = q.defer();
        PlaylistModel.findById(playlistId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var temp = doc.songs[newOrder.first];
                doc.songs.splice(newOrder.first, 1);
                doc.songs.splice(newOrder.second, 0, temp);
                //console.log(doc.songs);
                doc.save();
                deferred.resolve(doc.songs);
            }
        });
        return deferred.promise;
    }
}