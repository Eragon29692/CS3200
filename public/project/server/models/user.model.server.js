var mock = require("./user.mock.json");
module.exports = function() {

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserByID: findUserByID,
        deleteUserSong: deleteUserSong
    };
    return api;

    function findUserByCredentials(credentials) {
        for (var u in mock) {
            if (credentials.username === mock[u].username && credentials.password === mock[u].password) {
                return mock[u];
            }
        }
        return null;
    }

    function findAllUsers() {
        return mock;
    }

    function createUser(user) {
        var newUser = {
            _id: (new Date()).getTime().toString(),
            username: user.username,
            password: user.password,
            email: user.email,
            roles: [],
            songs: user.songs
        };
        mock.push(newUser);
        return newUser;
    }

    function deleteUserById(userId) {
        for (var i = mock.length - 1; i >= 0; i--) {
            if (userId === mock[i]._id) {
                mock.splice(i, 1);
                return mock;
            }
        }
        return null;
    }

    function updateUser(userId, user) {
        var newUser = {
            _id: userId,
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: user.roles,
            songs: user.songs
        };
        for (var u in mock) {
            if (userId === mock[u]._id) {
                mock[u] = newUser
                return newUser;
            }
        }
        return null;
    }

    /////////////////////////////////////////////////////
    function findUserByID(userId) {
        console.log(userId);
        for (var u in mock) {
            if (userId == mock[u]._id) {
                return mock[u];
            }
        }
        return null;
    }


    function deleteUserSong(songID, user) {
        var userSongs = user.songs;
        for (var i = userSongs.length - 1; i >= 0; i--) {
            if (songID === userSongs[i]) {
                user.songs.splice(i, 1);
                return user.songs;
            }
        }
        return null;
    }
}