'use strict';

const config = require('./config');
const passport = require('passport');
const db = require('../data-access/db');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
        clientID: config.api_keys.GOOGLE_OAUTH.CLIENT_ID,
        clientSecret: config.api_keys.GOOGLE_OAUTH.CLIENT_SECRET,
        callbackURL: config.api_keys.GOOGLE_OAUTH.CALLBACK_URL,
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
        const email = profile.emails.find(value => value.type === 'account').value;

        const user_schema = {
            google: profile,
            email: email
        };

        handler(user_schema, req, done);
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        db.users.getById(user._id).then(res => done(null, res));
    });
};

function handler(profile, req, done) {
    if (!profile) {
        return done(new Error(`Error while logging in.`));
    }

    return db.users.login(profile)
        .then(res => done(null, res), err => done(err, null));
}