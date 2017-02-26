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

        const file = req.files[0];
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const upload_task = storageRef.child(`media/${file.name}`).put(file, {
            contentType: file.type
        });

        upload_task.on(firebase.storage.TaskEvent.STATE_CHANGED, null, (err) => {
            console.log(err);
            return res.redirect('partials/error', { message: err});
        }, () => {
            console.log(upload_task);
            return res.redirect('partials/dashboard');
        });
    });
};