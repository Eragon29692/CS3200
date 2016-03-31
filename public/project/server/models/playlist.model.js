var mock = require("./playlist.mock.json");
module.exports = function () {

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindByID: FindByID,
        Update: Update,
        Delete: Delete,
        findPlaylistByTitle: findPlaylistByTitle,
        findUserPlaylists: findUserPlaylists,

        //song endpoint functions
        findAllSongInPlaylist: findAllSongInPlaylist,
        findSongInPlaylist: findSongInPlaylist,
        deleteSongInPlaylist: deleteSongInPlaylist,
        addSongInPlaylist: addSongInPlaylist,
        updateOrder: updateOrder
    };
    return api;


    function Create(playlist) {
        var newPlaylist = {
            _id: (new Date()).getTime().toString(),
            title: playlist.title,
            userId: playlist.userId,
            songs: []
        };
        mock.push(newPlaylist);
        return newPlaylist;
    }

    function  FindAll() {
        return mock;
    }

    function FindByID(playlistId) {
        for (var f in mock) {
            if (playlistId === mock[f]._id) {
                return mock[f];
            }
        }
        return null;
    }

    function Update(playlistId, newPlaylist) {
        var updatePlaylist = {
            _id: newPlaylist._id,
            title: newPlaylist.title,
            userId: newPlaylist.userId,
            songs: newPlaylist.songs
        };
        for (var f in mock) {
            if (playlistId === mock[f]._id) {
                mock[f] = updatePlaylist;
                return updatePlaylist;
            }
        }
        return null;
    }

    function Delete(playlistId) {
        console.log(playlistId);
        for (var i = mock.length - 1; i >= 0; i--) {
            if (playlistId == mock[i]._id) {
                mock.splice(i, 1);
                return mock;
            }
        }
        return null;
    }

    function findPlaylistByTitle(title) {
        for (var f in mock) {
            if (title === mock[f].title) {
                return mock[f];
            }
        }
        return null;
    }

    function findUserPlaylists(userId) {
        var userPlaylists = [];
        for (var f in mock) {
            if (userId === mock[f].userId) {
                userPlaylists.push(mock[f]);
            }
        }
        return userPlaylists;
    }


    //song endpoint


    function findAllSongInPlaylist(playlistId) {
        return FindByID(playlistId).songs;
    }

    function findSongInPlaylist(songId, playlistId) {
        var songs = findAllSongInPlaylist(playlistId);
        for (var f in songs) {
            if (songId === songs[f]) {
                return songs[f];
            }
        }
        return null;
    }

    function deleteSongInPlaylist(songId, playlistId) {
        var songs = findAllSongInPlaylist(playlistId);
        console.log(songId);
        for (var i = songs.length - 1; i >= 0; i--) {
            if (songId === songs[i]) {
                songs.splice(i, 1);
                return songs;
            }
        }
        return null;
    }

    function addSongInPlaylist(songId, playlistId) {
        console.log("run2");
        var songs = findAllSongInPlaylist(playlistId);
        songs.push(songId);
        return songs;
    }


    function updateOrder(newOrder, playlistId) {
        var songs = findAllSongInPlaylist(playlistId);
        var temp = songs[newOrder.first];
        songs[newOrder.first] = songs[newOrder.second];
        songs[newOrder.second] = temp;
        return songs;
    }

}