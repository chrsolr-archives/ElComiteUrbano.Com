const homeController = require('../controllers/home.controller');
const accountController = require('../controllers/account.controller');
const videosController = require('../controllers/videos.controller');

module.exports = (app) => {
	app.get('/', homeController.getIndex);
	app.get('/login', accountController.getLogin);
	app.get('/videos', videosController.getVideos);
	app.get('/about', homeController.getAbout);
};