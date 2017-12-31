const express = require('express');
const router = express.Router();
const passport = require('passport');

// facebook auth
router.get(
    '/facebook',
    passport.authenticate('facebook')
);

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    })
);




// google oauth
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    })
);



module.exports = router;