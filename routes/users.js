const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');


// Register
router.get('/register', function(req, res) {
    res.render('register');
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





// Login
router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect:'/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    }), function(req, res) {
        res.redirect('/dashboard');
});

// Logout
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});


module.exports = router;