var mock = require("./user.mock.json");
// load q promise library
var q = require("q");

module.exports = function (mysql) {

    var api = {
        //findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findUserByUsername: findUserByUsername,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserByID: findUserByID,
        //deleteUserSong: deleteUserSong
    };
    return api;

    function findAllUsers() {
        var deferred = q.defer();
        mysql.query('Call find_all_user()', function (err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log(rows);
                deferred.resolve(convertToFrontEnd(rows[0]));
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        mysql.query('Call find_user_by_username("' + username + '")', function (err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log(rows);
                deferred.resolve(convertToFrontEnd(rows[0]));
            }
        });
        return deferred.promise;
    }



    function createUser(user) {
        console.log(user);
        var deferred = q.defer();
        user._id = (new Date()).getTime().toString();
        user = convertToDatabase(user);
        console.log(user);
        mysql.query('Call create_user("' + user.userid + '","' + user.firstname + '","'
            + user.lastname + '","' + user.username + '","' + user.password + '","' + user.email + '","' + user.roles + '")', function (err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                //console.log(rows[0]);
                deferred.resolve(convertToFrontEnd(rows[0][0]));
            }
        });
        console.log("finished");
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        mysql.query('Call delete_user_by_id("' + userId + '")', function (err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log(rows);
                deferred.resolve(convertToFrontEnd(rows[0]));
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        user = convertToDatabase(user);
        mysql.query('Call update_user("' + userId + '","' + user.firstname + '","'
            + user.lastname + '","' + user.username + '","' + user.password + '","' + user.email + '","' + user.roles + '")', function (err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log("runrunrun");
                deferred.resolve(convertToFrontEnd(rows[0]));
            }
        });
        return deferred.promise;
    }

    /////////////////////////////////////////////////////
    function findUserByID(userId) {
        var deferred = q.defer();
        mysql.query('Call find_user_by_userid("' + userId + '")', function (err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log(rows);
                deferred.resolve(convertToFrontEnd(rows[0][0]));
            }
        });
        return deferred.promise;
    }

    /*
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
     */
    function convertToDatabase(user) {
        var converted = {
            userid: user._id,
            username: user.username,
            password: user.password,
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            roles: "admin",
            //songs: user.songs
        }
        return converted;
    }

    function convertToFrontEnd(user) {
        console.log(user);
        if (user.userid) {
            var roles = [user.roles];
            var converted = {
                _id: user.userid,
                username: user.username,
                password: user.password,
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
                roles: roles,
                songs: user.songs
            }
            if (converted.songs)
                converted.songs = converted.songs.split(",");
            console.log("11111111111111111111111111111111111111111111111111111111111111111111111");
            console.log(converted);
            return converted
        }
        return null;
    }

}