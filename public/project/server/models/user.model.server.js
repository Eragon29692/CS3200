var mock = require("./user.mock.json");

// load q promise library
var q = require("q");

module.exports = function(db, mongoose) {

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('userProject', UserSchema);

    var api = {
        //findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserByID: findUserByID,
        deleteUserSong: deleteUserSong
    };
    return api;

    /*
    function findUserByCredentials(credentials) {
        for (var u in mock) {
            if (credentials.username === mock[u].username && credentials.password === mock[u].password) {
                return mock[u];
            }
        }
        return null;
    }
*/
    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find({}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.remove();
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.username = user.username;
                doc.password = user.password;
                doc.firstName = user.firstName;
                doc.lastName = user.lastName;
                doc.roles = user.roles;
                doc.songs = user.songs;
                doc.save();
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    /////////////////////////////////////////////////////
    function findUserByID(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function deleteUserSong(songID, userID) {
        var deferred = q.defer();
        UserModel.findById(userID, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var i = doc.songs.length - 1; i >= 0; i--) {
                    if (songID === doc.songs[i]) {
                        doc.songs.splice(i, 1);
                        doc.save();
                        deferred.resolve(doc);
                        return;
                    }
                }
            }
        });
        return deferred.promise;
    }
}