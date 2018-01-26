const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = require('../models/user');
const AuthUser = require('../models/AuthUser');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    /*
       User.getUserById(id, function(err, user) {
           done(err, user);
       });
    */
    User.findById(id)
        .then(user => {
            if(user) {
                return done(null, user);
            }

            AuthUser.findById(id)
                .then(user => {
                    done(null, user);
                });
        });



});

passport.use(new FacebookStrategy({
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: "/auth/facebook/callback",
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {

        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile', profile);


        const existingUser = await AuthUser.findOne({ facebookId: profile.id })

                if(existingUser) {
                    // already have a record with given profile.id
                    return done(null, existingUser);
                }

                // no user found make a new record
                const authUser = await new AuthUser({
                    facebookId: profile.id,
                    name: profile.displayName
                }).save();
                done(null, authUser);
    }
));

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {

        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile', profile);

        const existingUser = await AuthUser.findOne({ googleId: profile.id });

                if(existingUser) {
                    // already have a record with given profile.id
                    return done(null, existingUser);
                }

                // no user found make a new record
                const authUser = await new AuthUser({
                    googleId: profile.id,
                    name: profile.displayName
                }).save();
                done(null, authUser);


    })
);


passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        proxy: true
        // current work area
    },
    function(req, email, password, done) {
        req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('password', 'Invalid password').notEmpty();

        var errors = req.validationErrors();
        if(errors) {
            var messages = [];
            errors.forEach(function(error) {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages))
        }

        User.findOne({'email' : email}, function(err, user) {
            if(err) throw err;

            if(!user) {
                return done(null, false, {message: 'No user found.'});
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if(err) throw err;
                if(isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }
));