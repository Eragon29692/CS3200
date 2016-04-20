/**
 * Created by duyvu on 4/1/2016.
 */
module.exports = function(mongoose) {
    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        roles: String,
        songs: [String],
        email: String
    }, {collection: 'userProject'});
    return UserSchema;
};