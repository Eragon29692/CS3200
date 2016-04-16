var request = require('request');
module.exports = function (app, songModel, userModel) {
    //app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);
    //app.get("/api/project/movie/:imdbID/user", findUserLikes);
    app.post("/api/project/song/createSong/:userId", createsong);
    app.post("/api/project/song/deleteSongById", deleteSongById);
    app.post("/api/project/song/deleteUserSong", deleteUserSong);
    app.post("/api/project/song/updateSongById", updateSongById);
    app.get("/api/project/song/findAllSongsForUser/:userId", findAllSongsForUser);
    app.get("/api/project/song/findAllSongs", findAllSongs);
    app.get("/api/project/spotify/:track", searchSongSpotify);

    /*
     findAllSongsForUser: findAllSongsForUser,
     deleteSongById: deleteSongById,
     updateSongById: updateSongById,
     /////////////////////
     createSong: createSong
     */

    function findAllSongs(req, res) {
        var songs = songModel.findAllSongs().then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function findAllSongsForUser(req, res) {
        var userId = req.params.userId;
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        userModel.findUserByID(userId).then(
            function (user) {
                songModel.findAllSongs().then(
                    function (songs) {
                        var userSongs = [];
                        for (var songID in user.songs) {
                            for (var f in songs) {
                                if (user.songs[songID] == songs[f]._id) {
                                    userSongs.push(songs[f]);
                                }
                            }
                        }
                        console.log(userSongs);
                        res.json(userSongs);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function createsong(req, res) {
        var song = req.body;
        var userId = req.params.userId;
        songModel.createSong(song).then(
            function (song) {
                userModel.addSongForUser(userId, song._id).then(
                    function (doc) {
                        res.json(song);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteSongById(req, res) {
        var song = req.body;
        console.log(song);
        var song = songModel.deleteSongById(song._id).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteUserSong(req, res) {
        var deleteInfo = req.body;
        var userID = deleteInfo.userID;
        var songID = deleteInfo.songID;
        var userSong = userModel.deleteUserSong(songID, userID).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updateSongById(req, res) {
        var song = req.body;
        var song = songModel.updateSongById(song._id, song).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function searchSongSpotify(req, res) {
        var track = req.params.track;
        var songs = [];
        request("http://api.spotify.com/v1/search?q=" + track + "&type=track&limit=10",
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    info = info.tracks.items;
                    for (var i = 0; i < info.length; i++) {
                        var song = {};
                        song._id = info[i].id;
                        song.title = info[i].name;
                        song.album = info[i].album.name;
                        song.cover = info[i].album.images[0].url;
                        song.year = "0000";
                        var artistString = "";
                        for (a in info[i].artists) {
                            artistString += info[i].artists[a].name + ", ";
                        }
                        song.artist = artistString.substring(0, artistString.length - 2);
                        songs.push(song);
                    }
                    console.log(songs);
                    res.json(songs);
                }
            });
    }

}