const express = require('express');
const router = express.Router();
const passport = require('passport');
const authcheck = require('../scripts/authcheck');


// Get home page
router.get('/', authcheck.checkNotAuth, (req, res) => {
    res.render('login.ejs');
});


// Get GitHub OAuth login
router.get('/auth/github', authcheck.checkNotAuth, passport.authenticate('github'));


// Get GitHub OAuth login callback
router.get('/auth/github/callback', authcheck.checkNotAuth, 
    passport.authenticate('github', {failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home
        res.redirect('/');
    }
);


module.exports = router;