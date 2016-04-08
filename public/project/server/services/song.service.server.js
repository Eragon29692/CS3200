var request = require('request');
module.exports = function (app, songModel, userModel) {
    //app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);
    //app.get("/api/project/movie/:imdbID/user", findUserLikes);
    app.post("/api/project/song/createSong", createsong);
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
        var songs = songModel.findAllSongs();
        res.json(songs);
    }

    function findAllSongsForUser(req, res) {
        var userId = req.params.userId;
        userModel.findUserByID(userId).then(function (user) {
                var songs = songModel.findAllSongs();
                var userSongs = [];
                for (var songID in user.songs) {
                    for (var f in songs) {
                        if (user.songs[songID] == songs[f]._id) {
                            userSongs.push(songs[f]);
                        }
                    }
                }
                res.json(userSongs);
            }
        );

    }

    function createsong(req, res) {
        var song = req.body;
        song = songModel.createSong(song);
        res.json(song);
    }

    function deleteSongById(req, res) {
        var song = req.body;
        console.log(song);
        var song = songModel.deleteSongById(song._id);
        res.json(song);
    }

    function deleteUserSong(req, res) {
        var deleteInfo = req.body;
        var userID = deleteInfo.userID;
        var songID = deleteInfo.songID;
        var userSong = userModel.deleteUserSong(songID, userID).then(
            function (userSong) {
                res.json(userSong);
            }
        );
    }

    function updateSongById(req, res) {
        var song = req.body;
        var song = songModel.updateSongById(song._id, song);
        res.json(song);
    }

    function searchSongSpotify(req, res) {
        var track = req.params.track;
        request("http://api.spotify.com/v1/search?q=" + track + "&type=track&limit=10", function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                res.json(info);
            }
        })

    }

}