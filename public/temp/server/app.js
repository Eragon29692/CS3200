module.exports = function (app, mysql) {
    var userModel = require("./models/user.model.server.js")(mysql);
    var songModel = require("./models/song.model.server.js")(mysql);
    var playlistModel = require("./models/playlist.model.js")();

    var userService = require("./services/user.service.server.js")(app, songModel, userModel);
    var songService = require("./services/song.service.server.js")(app, songModel, userModel);
    var playlistService = require("./services/playlist.service.server.js")(app, playlistModel, songModel);
}

