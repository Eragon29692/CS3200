module.exports = function(app) {
    var userModel    = require("./models/user.model.server.js")();
    var songModel   = require("./models/song.model.server.js")();

    var userService  = require("./services/user.service.server.js") (app, songModel, userModel);
    var songService = require("./services/song.service.server.js")(app, songModel, userModel);
}
