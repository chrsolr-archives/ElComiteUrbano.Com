const mongoose = require('mongoose');
const app = require('./server/config/express')();
const config = require('./server/config/config');

if (process.env.NODE_ENV === 'development') {
	// ONLY ON DEV ENV
	const morgan = require('morgan');
	app.use(morgan('dev'));
}

mongoose.connect(config.server.DB_URI);

app.listen(config.server.PORT, (err) => {
	if (err) throw err;

	console.info(`Application running at port: ${config.server.PORT}`);
});