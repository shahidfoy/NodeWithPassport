const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Register
router.get('/register', function(req, res) {
    res.render('register');
});

// Login
router.get('/login', function(req, res) {
    res.render('login');
});

// Register User
router.post('/register', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    // validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        var newUser = new User({
            name: name,
            email: email,
            password: password
        });

        newUser.save(function(err, user) {
           if(err){
               req.flash('error_msg', 'Username or Email is already in use. Please try again.');
               res.redirect('/users/register');
           } else {
               console.log(user);
               req.flash('success_msg', 'You are registered and can now login');
               res.redirect('/users/login');
           }
        });
    }
});


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

router.post('/login',
    passport.authenticate('local', {
        successRedirect:'/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    }), function(req, res) {
        res.redirect('/dashboard');
});

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});


module.exports = router;