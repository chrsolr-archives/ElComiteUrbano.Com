'use strict';

const common = require('../modules/common');
const config = require('../modules/config').config;
const firebase = require('firebase/app');

module.exports = (app) => {
    app.get('/dashboard', common.middlewares.isAuthenticatedAndAdmin, (req, res) => {
        return res.render('partials/dashboard');
    });

    app.post('/dashboard/create/promo', common.middlewares.isAuthenticatedAndAdmin, (req, res) => {
        firebase.initializeApp(config.api_keys.FIREBASE);

        const storage = firebase.storage();
        const storageRef = storage.ref();
        const upload_task = storageRef.child(`media/${req.files[0].name}`).put(req.files[0], {
            contentType: 'image/jpeg'
        });

        return res.redirect('partials/dashboard');
    });
};