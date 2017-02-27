'use strict';

const common = require('../modules/common');
const db = require('../modules/data-access/db');

module.exports = (app) => {
    app.get('/dashboard', common.middlewares.isAuthenticatedAndAdmin, (req, res) => {
        return res.render('partials/dashboard');
    });

    app.post('/dashboard/create/promo', common.middlewares.isAuthenticatedAndAdmin, (req, res) => {
        db.promos.createPromo(req.body)
            .then(res => res.render('partials/dashboard'))
            .catch(err => res.render('partials/error', {
                message: err
            }));
    });
};