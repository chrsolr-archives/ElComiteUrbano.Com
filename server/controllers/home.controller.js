const repo = require('../repository/repository');

const getIndex = (req, res, next) => {
    
    const featuredVideo = repo.featuredVideo.getFeaturedVideo();
    const youtube = repo.youtube.getVideos(10);
    const soundcloud = repo.soundcloud.getSoundcloudTracks();
    
    Promise.all([
        featuredVideo,
        youtube,
        soundcloud
    ]).then((values) => {

        var data = {
            featuredVideo: values[0],
            youtube: values[1],
            soundcloud: values[2]
        };
        
        res.render('partials/index', data);
    }, (err) => { 
        res.render('partials/error', {message: err});
    });
};

const getAbout = (req, res, next) => {
    res.render('partials/about');
}

exports.getIndex = getIndex;
exports.getAbout = getAbout;