'use strict';

const db = require('../modules/data-access/db');
const config = require('../modules/config').config;
const request = require('request');

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
        if (!req.body['g-recaptcha-response']) {
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

            if (!body.success) {
                return res.render('partials/error', {
                    message: 'Failed captcha verification.'
                });
            }

            var sendgrid = require('sendgrid')('this.relos', 'this.r3l0s');
            sendgrid.send({
                to: ['iamrelos@gmail.com'],
                from: 'twenty40@gmail.com',
                subject: 'Testing' + ' - Via Contact Us',
                text: `From: contact.name \nEmail: contact.email\n\ncontact.body`
            }, (err, json) => {
                if (err) {
                    return res.redirect('/error', {
                        message: 'Something went wrong while sending email.'
                    });
                }

                return res.redirect('/');
            });
        });
    });

    app.get('/about', (req, res) => res.render('partials/about'));
    app.get('/termsofuse', (req, res) => res.render('partials/tos'));
    app.get('/policies', (req, res) => res.render('partials/policies'));
};