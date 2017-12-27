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

module.exports = mongoose.model('User', UserSchema);

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