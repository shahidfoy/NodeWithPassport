const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/loginapp');

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String
    }

});

UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});

var User = module.exports = mongoose.model('User', UserSchema);

/*
module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};
*/

// mongoose queries
module.exports.getUserByUsername = function(username, callback) {
  var query = {username: username};
  User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
};