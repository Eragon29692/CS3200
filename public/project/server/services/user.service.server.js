var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, songModel, userModel) {
    app.post("/api/project/MusicDB/login", login);
    app.get("/api/project/MusicDB/findAllUsers", findAllUsers);
    app.post("/api/project/MusicDB/register", register);
    app.get("/api/project/MusicDB/profile/:userId", profile);
    app.post("/api/project/MusicBD/deleteUser", deleteUserById);
    app.post("/api/project/MusicBD/updateUser", updateUser);
    /*
     findUserByCredentials: findUserByCredentials,
     findAllUsers: findAllUsers,
     createUser: createUser,
     deleteUserById: deleteUserById,
     updateUser: updateUser,
     //////////////////////
     findUserByID: findUserByID
     */

    var auth = authorized;
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.get('/api/loggedin', loggedin);
    app.post('/api/register', register);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function profile(req, res) {
        var userId = req.params.userId;
        userModel.findUserByID(userId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updateUser(req, res) {
        var user = req.body;
        var userID = user._id;
        var oldUser = userModel.findUserByID(userID);
        if (user.password)
            user.password = bcrypt.hashSync(user.password);
        else {
            user.password = oldUser.password;
        }
        userModel.updateUser(userID, user).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteUserById(req, res) {
        var deleteInfo = req.body;
        var userID = deleteInfo.userID;
        userModel.deleteUserById(userID).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers().then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserByID(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function register (req, res) {
        var user = req.body;
        userModel
            .findUserByUsername(user.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        // encrypt the password when registering
                        user.password = bcrypt.hashSync(user.password);
                        return userModel.createUser(user);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

}