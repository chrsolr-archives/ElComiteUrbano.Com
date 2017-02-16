'use strict';

const mongoose = require('mongoose');
const app = require('./server/modules/config').express;
const config = require('./server/modules/config').config;

mongoose.Promise = global.Promise;
mongoose.connect(config.db.URI, (err) => {
    if (err) {
        throw new Error(err);
    }
});

app.listen(config.environment.PORT, (err) => {
    if (err) {
        throw new Error(err);
    }

    console.info(`Application running at port: ${config.environment.PORT}`);
});