/**
 * Created by duyvu on 4/19/2016.
 */
module.exports = function(mongoose) {
    // use mongoose to declare a user schema
    var CommentSchema = mongoose.Schema({
        "songId": String,
        "username": String,
        "content": String
    }, {collection: 'commentProject'});
    return CommentSchema;
};