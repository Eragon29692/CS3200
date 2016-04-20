/**
 * Created by duyvu on 4/19/2016.
 */
module.exports = function(mongoose) {
    // use mongoose to declare a user schema
    var PlaylistSchema = mongoose.Schema({
        "title": String,
        "userId": String,
        "songs": [String]
    }, {collection: 'playlistProject'});
    return PlaylistSchema;
};