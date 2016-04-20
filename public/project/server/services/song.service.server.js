var request = require('request');
module.exports = function (app, songModel, userModel) {

    app.post("/api/project/song/createSong", createSong);
    app.post("/api/project/song/deleteSongById", deleteSongById);
    app.post("/api/project/song/updateSongById", updateSongById);
    app.get("/api/project/song/findAllSongsForUser/:userId", findAllSongsForUser);
    app.get("/api/project/song/findAllSongs", findAllSongs);
    app.get("/api/project/spotify/:track/:userId", searchSongSpotify);
    app.post("/api/project/song/addComment", addComment);
    app.post("/api/project/song/deleteComment", deleteComment);
    app.get("/api/project/song/findSongById/:songId", findSongById);


    function findAllSongs(req, res) {
        songModel.findAllSongs().then(
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

    function createSong(req, res) {
        var song = req.body;
        if (song._id === undefined) {
            song._id = (new Date()).getTime().toString();
        }
        songModel.createSong(song).then(
            function (song) {
                res.json(song);
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
        var userId = req.params.userId;
        var songs = [];
        request("http://api.spotify.com/v1/search?q=" + track + "&type=track&limit=20",
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
                        song.comment = [];
                        var artistString = "";
                        for (a in info[i].artists) {
                            artistString += info[i].artists[a].name + ", ";
                        }
                        song.artist = artistString.substring(0, artistString.length - 2);
                        song.inLibrary = "false";
                        songs.push(song);
                    }
                    userModel.findUserByID(userId).then(
                        function (user) {
                            for (var i = 0; i < songs.length; i++) {
                                if (user.songs.indexOf(songs[i]._id) != -1) {
                                    songs[i].inLibrary = "true";
                                }
                            }
                            res.json(songs);
                        },
                        function (err) {
                            res.status(400).send(err);
                        }
                    );
                }
            });
    }

    function addComment(req, res) {
        var comment = req.body;
        var songId = comment.songId;
        songModel.addComment(songId, comment).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteComment(req, res) {
        var comment = req.body;
        var songId = comment.songId;
        songModel.deleteComment(songId, comment._id).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function findSongById(req, res) {
        var songId = req.params.songId;
        songModel.findSongById(songId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }



}