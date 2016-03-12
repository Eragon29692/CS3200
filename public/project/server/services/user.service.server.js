module.exports = function(app, songModel, userModel) {
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
    function profile(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserByID(userId);
        console.log(user);
        res.json(user);
    }

    function register(req, res) {
        var user = req.body;
        //console.log(user);
        user = userModel.createUser(user);
        //req.session.currentUser = user;
        res.json(user);
    }

    function updateUser(req, res) {
        var user = req.body;
        var userID = user._id;
        user = userModel.updateUser(userID, user);
        console.log(user);
        //req.session.currentUser = user;
        res.json(user);
    }

    function deleteUserById(req, res) {
        var deleteInfo = req.body;
        var userID = deleteInfo.userID;
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
        //console.log(credentials);
        var user = userModel.findUserByCredentials(credentials);
        //req.session.currentUser = user;
        res.json(user);
    }


}