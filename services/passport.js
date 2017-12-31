const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = require('../models/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});


passport.use(new FacebookStrategy({
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: "/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {

        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile', profile);


        User.findOne({ facebookId: profile.id })
            .then((existingUser) => {
                if(existingUser) {
                    // already have a record with given profile.id
                    done(null, existingUser);
                } else {
                    // no user found make a new record
                    new User({
                        facebookId: profile.id,
                        email: 'facebook auth',
                        password: 'facebook auth',
                        name: profile.displayName
                    }).save()
                        .then(user => done(null, user));
                }
            });

    }
));

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile', profile);

        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if(existingUser) {
                    // already have a record with given profile.id
                    done(null, existingUser);
                } else {
                    // no user found make a new record
                    new User({
                        googleId: profile.id,
                        email: 'google auth',
                        password: 'google auth',
                        name: profile.displayName
                    }).save()
                        .then(user => done(null, user));
                }
            });
    })
);