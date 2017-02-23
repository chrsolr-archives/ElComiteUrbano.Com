'use strict';

const common = require('../modules/common');

module.exports = (app) => {
    app.get('/admin', common.middlewares.isAuthenticatedAndAdmin, (req, res) => {
        return res.render('partials/admin');
    });
};