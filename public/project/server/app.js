module.exports = function (app, db, mongoose) {
    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var songModel = require("./models/song.model.server.js")(db, mongoose);
    var playlistModel = require("./models/playlist.model.js")(db, mongoose);

    var userService = require("./services/user.service.server.js")(app, songModel, userModel);
    var songService = require("./services/song.service.server.js")(app, songModel, userModel);
    var playlistService = require("./services/playlist.service.server.js")(app, playlistModel, songModel);
}

