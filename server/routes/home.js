'use strict';

const db = require('../modules/data-access/db');

module.exports = (app) => {
    app.get('/', (req, res) => {

        const promos = db.promos.getAll();
        const songs = db.soundcloud.getSongs();
        const videos = db.youtube.getVideos(12);

        Promise.all([promos, songs, videos])
            .then(values => {
                const data = {
                    promos: values[0],
                    songs: values[1],
                    youtube: values[2]
                };

                let promos = [];

                for (let i in data.promos) {
                    if (i % 2 === 0) {
                        const row = {
                            content: []
                        };
                        row.content.push(data.promos[i]);
                        row.content.push(data.promos[parseInt(i, 10) + 1]);
                        promos.push(row);
                    }
                }

                data.promos = promos;

                return res.render('partials/index', data);

            }).catch(err => res.render('partials/error', err));
    });

    app.get('/about', (req, res) => res.render('partials/about'));
    app.get('/termsofuse', (req, res) => res.render('partials/tos'));
    app.get('/policies', (req, res) => res.render('partials/policies'));
};