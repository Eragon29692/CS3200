module.exports = function(app, songModel, userModel) {
    //app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);
    //app.get("/api/project/movie/:imdbID/user", findUserLikes);
    app.get("/api/project/song/createSong", createsong);
    app.get("/api/project/song/deleteSongById", deleteSongById);
    app.get("/api/project/song/updateSongById", updateSongById);
    app.post("/api/project/song/findAllSongsForUser/:userID", findAllSongsForUser);

/*
    findAllSongsForUser: findAllSongsForUser,
        deleteSongById: deleteSongById,
        updateSongById: updateSongById,
        /////////////////////
        createSong: createSong
    */

    function findAllSongsForUser(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserByID(userId);
        var userSongs = [];
        for (var songID in user.songs) {
            for (var f in songs) {
                if (user.songs[songID] === songs[f]._id) {
                    userSongs.push(songs[f]);
                    //console.log(f);
                }
            }
        }
        //return userSongs;
        res.json(userSongs);
    }

    function createsong (req, res) {
        var song = req.body;
        song = songModel.createsong(song);
        res.json(song);
    }

    function deleteSongById (req, res) {
        var songID = req.body;
        var song = songModel.deleteSongById(songID);
        res.json(song);
    }

    function updateSongById (req, res) {
        var song = req.body;
        var song = songModel.createsong(song._id, song);
        res.json(song);
    }


}