'use strict';

module.exports = (app) => {
    app.get('/', (req, res) => {
        return res.render('partials/index');
    });
};