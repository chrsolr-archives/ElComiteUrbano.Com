const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const app = express();

const expressConfig = () => {
    process.env.NODE_ENV = config.server.ENV;
    
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');
    app.use(express.static('public'));
    
    require('../routes/main.routes')(app);
    
    return app;
}

module.exports = expressConfig;