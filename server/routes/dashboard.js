'use strict';

const common = require('../modules/common');
const db = require('../modules/data-access/db');
const config = require('../modules/config').config;

module.exports = (app) => {
    app.get('/dashboard', common.middlewares.isAuthenticatedAndAdmin, (req, res) => {
        return res.render('partials/dashboard', {
            FIREBASE: JSON.parse(config.api_keys.FIREBASE)
        });
    });

    app.post('/dashboard/create/promo', common.middlewares.isAuthenticatedAndAdmin, (req, res) => {
        if (req.body.downloadLink) {
            req.body.downloadUrl = req.body.downloadLink;
        }

        db.promos.createPromo(req.body)
            .then(res => res.render('partials/dashboard'))
            .catch(err => res.render('partials/error', {
                message: err
            }));
    });
};