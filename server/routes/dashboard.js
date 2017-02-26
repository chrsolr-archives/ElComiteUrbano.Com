'use strict';

const common = require('../modules/common');
const config = require('../modules/config').config;
const firebase = require('firebase/app');

module.exports = (app) => {
    app.get('/dashboard', common.middlewares.isAuthenticatedAndAdmin, (req, res) => {
        return res.render('partials/dashboard');
    });

    app.post('/dashboard', common.middlewares.isAuthenticatedAndAdmin, (req, res) => {
        firebase.initializeApp(config.api_keys.FIREBASE);

        return res.render('partials/dashboard');
    });
};