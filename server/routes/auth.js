'use strict';

const passport = require('passport');

module.exports = (app) => {
    app.get('/login', passport.authenticate('google', {
        scope: ['profile email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/error' // TODO: Add a route to handle errors
    }), (req, res) => {
        return res.redirect('/admin');
    });
};