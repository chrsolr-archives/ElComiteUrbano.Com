'use strict';

const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

app.locals.brand_title = config.environment.BRAND_TITLE;

require('../../routes/home')(app);

module.exports = app;