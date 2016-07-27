const repo = require('../repository/repository');

const getVideos = (req, res, next) => {
    repo.youtube.getVideos(50).then((data) =>  {
        res.render('partials/videos', { youtube: data });
    });
};

exports.getVideos = getVideos;