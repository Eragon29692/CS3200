/**
 * Created by DUY on 3/24/2016.
 */
module.exports = function(app, playlistModel, songModel) {


    app.get("/api/project/user/:userId/playlist", findUserPlaylist);
    app.get("/api/project/playlist/:playlistId", findPlaylistById);
    app.delete("/api/project/playlist/:playlistId", deletePlaylistById);
    app.post("/api/project/user/:userId/playlist", createPlaylist);//add useriD to josn
    app.put("/api/project/playlist/:playlistId", updatePlaylist);

    function findUserPlaylist(req, res) {
        var userId = req.params.userId;
        playlistModel.findUserPlaylists(userId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function findPlaylistById(req, res) {
        var playlistId = req.params.playlistId;
        playlistModel.FindByID(playlistId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deletePlaylistById(req, res) {
        var playlistId = req.params.playlistId;
        playlistModel.Delete(playlistId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function createPlaylist(req, res) {
        var userId = req.params.userId;
        var newPlaylist = req.body;
        newPlaylist.userId = userId;
        playlistModel.Create(newPlaylist).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updatePlaylist(req, res) {
        console.log("run updatePlaylist")
        var playlistId = req.params.playlistId;
        var newPlaylist = req.body;
        playlistModel.Update(playlistId, newPlaylist).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }



    app.get("/api/project/playlist/:playlistId/song", findAllSongInPlaylist);
    app.get("/api/project/playlist/:playlistId/song/:songId", findSongInPlaylist);
    app.delete("/api/project/playlist/:playlistId/song/:songId", deleteSongInPlaylist);
    app.put("/api/project/playlist/song/addSong", addSongInPlaylist);
    //app.put("/api/project/playlist/:playlistId/song/:songId", updateSongInPlaylist);
    //update sort order
    app.put("/api/project/playlist/:playlistId/songOrder", updateOrder);


    function findAllSongInPlaylist(req, res) {
        var playlistId = req.params.playlistId;
        playlistModel.findAllSongInPlaylist(playlistId).then(
            function (playlist) {
                songModel.findSongs(playlist).then(
                    function (doc) {
                        for (var i = 0; i < playlist.length; i++) {
                            for (var j = 0; j < doc.length; j++) {
                                if (playlist[i] === doc[j]._id) {
                                    playlist[i] = doc[j];
                                }
                            }
                        }
                        res.json(playlist);
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

    function findSongInPlaylist(req, res) {
        var playlistId = req.params.playlistId;
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

    function deleteSongInPlaylist(req, res) {
        var playlistId = req.params.playlistId;
        var songId = req.params.songId;
        playlistModel.deleteSongInPlaylist(songId, playlistId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function addSongInPlaylist(req, res) {
        var addInfo = req.body;
        console.log(addInfo);
        playlistModel.addSongInPlaylist(addInfo.songId, addInfo.playlistId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updateOrder(req, res) {
        var newOrder = req.body;
        var playlistId = req.params.playlistId;
        playlistModel.updateOrder(newOrder, playlistId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }
}