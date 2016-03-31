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
        var userId = parseInt(req.params.userId);
        var playlists = playlistModel.findUserPlaylists(userId);
        res.json(playlists);
    }

    function findPlaylistById(req, res) {
        var playlistId = req.params.playlistId;
        var playlist = playlistModel.FindByID(playlistId);
        res.json(playlist);
    }

    function deletePlaylistById(req, res) {
        var playlistId = req.params.playlistId;
        var playlist = playlistModel.Delete(playlistId);
        res.json(playlist);
    }

    function createPlaylist(req, res) {
        var userId = parseInt(req.params.userId);
        var newPlaylist = req.body;
        newPlaylist.userId = userId;
        var playlist = playlistModel.Create(newPlaylist);
        res.json(playlist);
    }

    function updatePlaylist(req, res) {
        console.log("run updatePlaylist")
        var playlistId = req.params.playlistId;
        var newPlaylist = req.body;
        var playlist = playlistModel.Update(playlistId, newPlaylist);
        res.json(playlist);
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
        var playlist = playlistModel.findAllSongInPlaylist(playlistId);
        var songs = [];
        for (var s in playlist) {
            songs.push(songModel.findSongById(playlist[s]))
        }
        res.json(songs);
    }

    function findSongInPlaylist(req, res) {
        var playlistId = req.params.playlistId;
        var songId = req.params.songId;
        var songId = playlistModel.findSongInPlaylist(songId, playlistId);
        res.json(songModel.findSongById(songId));
    }

    function deleteSongInPlaylist(req, res) {
        var playlistId = req.params.playlistId;
        var songId = req.params.songId;
        //console.log(songId);
        var songs = playlistModel.deleteSongInPlaylist(songId, playlistId);
        res.json(songs);
    }

    function addSongInPlaylist(req, res) {
        var addInfo = req.body;
        console.log(addInfo);
        var song = playlistModel.addSongInPlaylist(addInfo.songId, addInfo.playlistId);
        res.json(song);
    }

    function updateOrder(req, res) {
        var newOrder = req.body;
        var playlistId = req.params.playlistId;
        //console.log(newOrder);
        var playlists = playlistModel.updateOrder(newOrder, playlistId);
        res.json(playlists);
    }
}