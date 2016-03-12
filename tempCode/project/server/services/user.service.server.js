module.exports = function(app, songModel, userModel) {
    app.post("/api/project/MusicDB/login", login);
    //app.get("/api/project/omdb/loggedin", loggedin);
    //app.post("/api/project/omdb/logout", logout);
    app.get("/api/project/MusicDB/findAllUsers", findAllUsers);
    app.post("/api/project/MusicBD/register", register);
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
    function profile(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserByID(userId);
        res.json(user);
    }

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        //req.session.currentUser = user;
        res.json(user);
    }

    function updateUser(req, res) {
        var user = req.body;
        user = userModel.updateUser(user._id, user);
        //req.session.currentUser = user;
        res.json(user);
    }

    function deleteUserById(req, res) {
        var userID = req.body;
        var user = userModel.deleteUserById(userID);
        //req.session.currentUser = user;
        res.json(user);
    }

    function findAllUsers(req, res) {
        var users = userModel.findAllUsers();
        //req.session.currentUser = user;
        res.json(users);
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials.username, credentials.password);
        //req.session.currentUser = user;
        res.json(user);
    }

}