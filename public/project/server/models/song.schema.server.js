/**
 * Created by duyvu on 4/17/2016.
 */
module.exports = function(mongoose) {
    var CommentSchema = require("./comment.schema.server.js")(mongoose);
    // use mongoose to declare a user schema
    var SongSchema = mongoose.Schema({
        "_id": String,
        title: String,
        artist: String,
        album: String,
        year: String,
        comment: [CommentSchema]
    }, {"id": false, collection: 'songProject'});
    return SongSchema;
};