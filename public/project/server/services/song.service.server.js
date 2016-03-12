module.exports = function(app, songModel, userModel) {
    //app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);
    //app.get("/api/project/movie/:imdbID/user", findUserLikes);
    app.post("/api/project/song/createSong", createsong);
    app.post("/api/project/song/deleteSongById", deleteSongById);
    app.post("/api/project/song/deleteUserSong", deleteUserSong);
    app.post("/api/project/song/updateSongById", updateSongById);
    app.post("/api/project/song/findAllSongsForUser/:userId", findAllSongsForUser);
    app.get("/api/project/song/findAllSongs", findAllSongs);
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
        var user = userModel.findUserByID(userId);
        var songs = songModel.findAllSongs();
        var userSongs = [];
        for (var songID in user.songs) {
            for (var f in songs) {
                if (user.songs[songID] == songs[f]._id) {
                    userSongs.push(songs[f]);
                    //console.log(f);
                }
            }
        }
        res.json(userSongs);
    }

    function createsong (req, res) {
        var song = req.body;
        song = songModel.createSong(song);
        res.json(song);
    }

    function deleteSongById (req, res) {
        var song = req.body;
        console.log(song);
        var song = songModel.deleteSongById(song._id);
        res.json(song);
    }

    function deleteUserSong (req, res) {
        var deleteInfo = req.body;
        var user = userModel.findUserByID(deleteInfo.userID);
        var songID = deleteInfo.songID;
        var userSong = userModel.deleteUserSong(songID, user);
        res.json(userSong);
    }

    function updateSongById (req, res) {
        var song = req.body;
        var song = songModel.updateSongById(song._id, song);
        res.json(song);
    }


}