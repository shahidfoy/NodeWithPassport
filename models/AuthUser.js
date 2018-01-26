const mongoose = require('mongoose');

var AuthUserSchema = mongoose.Schema({
    name: {
        type: String
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    }
});

var AuthUser = module.exports = mongoose.model('AuthUser', AuthUserSchema);