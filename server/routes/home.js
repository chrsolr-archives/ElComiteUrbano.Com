'use strict';

const db = require('../modules/data-access/db');

module.exports = (app) => {
    app.get('/', (req, res) => {

        const promos = db.promos.getAll();

        Promise.all([promos])
            .then(values => {
                const data = {
                    promos: values[0]
                };

                let promos = [];

                for (let i in data.promos) {
                    if (i % 2 === 0) {
                        var row = { content: [] };
                        row.content.push(data.promos[i]);
                        row.content.push(data.promos[parseInt(i, 10) + 1]);
                        promos.push(row);
                    }
                }

                data.promos = promos;

                return res.render('partials/index', data);

            }).catch(err => res.render('partials/index', err));
    });
};