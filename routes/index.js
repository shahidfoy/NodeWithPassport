const express = require('express');
const router = express.Router();

// Get Homepage
router.get('/', function(req, res) {
    res.render('index');
});

router.get('/dashboard', ensureAuthenticated, function(req, res) {
   res.render('dashboard');
});

router.get('/garage', ensureAuthenticated, function(req, res) {
    res.render('garage');
});

router.get('/mail', ensureAuthenticated, function(req, res) {
    res.render('mail');
});

router.get('/chat', ensureAuthenticated, function(req, res) {
    res.render('chat');
});

router.get('/photos', ensureAuthenticated, function(req, res) {
    res.render('photos');
});

router.get('/friends', ensureAuthenticated, function(req, res) {
    res.render('friends');
});

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;