var mock = require("./user.mock.json");
module.exports = function() {

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        //////////////////////
        findUserByID: findUserByID
    };
    return api;

    function findUserByCredentials(username, password) {
        for (var u in mock) {
            if (username === mock[u].username && password === mock[u].password) {
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
            _id: (new Date()).getTime(),
            username: user.username,
            password: user.password,
            email: user.email,
            roles: [],
            songs: []
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
        for (var u in mock) {
            if (userId === mock[u]._id) {
                return mock[u];
            }
        }
        return null;
    }
}