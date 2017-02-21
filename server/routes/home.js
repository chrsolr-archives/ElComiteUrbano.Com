'use strict';

const db = require('../modules/data-access/db');
const config = require('../modules/config').config;
const request = require('request');
const AWS = require('aws-sdk');

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

            const aws = new AWS.Config({
                accessKeyId: config.api_keys.SES_KEY,
                secretAccessKey: config.api_keys.SES_SECRET,
                region: 'us-west-2'
            });

            const ses = new AWS.SES({
                apiVersion: '2010-12-01'
            });

            ses.sendEmail({
                    Source: 'twenty40@gmail.com',
                    Destination: {
                        ToAddresses: ['iamrelos@gmail.com']
                    },
                    Message: {
                        Subject: {
                                Data: 'A Message To You Rudy'
                        },
                        Body: {
                            Text: {
                                Data: 'Stop your messing around',
                            }
                        }
                    }
                },
                function (err, data) {
                    if (err) {
                        return res.render('partials/error', {
                            message: 'Email failed'
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