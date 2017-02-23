'use strict';

const db = require('../modules/data-access/db');
const config = require('../modules/config').config;
const request = require('request');
const sendmail = require('sendmail')();

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

    app.post('/contactus', (req, res) => {
        const contact_us = req.body;

        if (!contact_us['g-recaptcha-response']) {
            return res.render('partials/error', {
                message: 'recaptcha failed'
            });
        }

        const VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${config.api_keys.RECAPTCHA_SECRET}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`;

        request(VERIFY_URL, (err, response, body) => {
            if (err) {
                throw new Error(err);
            }

            body = JSON.parse(body);

            if (!body || !body.success) {
                return res.render('partials/error', {
                    message: 'Failed captcha verification.'
                });
            }

            const mail = {
                from: contact_us.email,
                to: 'elcomiteurbanoradio@gmail.com',
                cc: 'iamrelos@gmail.com',
                subject: `${contact_us.subject} - Via ElComiteUrbano.Com - Contact Us`,
                html: contact_us.body,
            };

            sendmail(mail, (err) => {
                if (err) {
                    return res.render('partials/error', {
                        message: err
                    });
                }

                return res.redirect('/');
            });
        });
    });

    app.get('/about', (req, res) => res.render('partials/about'));
    app.get('/termsofuse', (req, res) => res.render('partials/tos'));
    app.get('/policies', (req, res) => res.render('partials/policies'));
    app.get('/error', (req, res) => res.render('partials/error'));
    app.get('/*', (req, res) => res.render('partials/error', { message: '404: Page not found'}));
};