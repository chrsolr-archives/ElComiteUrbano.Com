const repo = require('../repository/repository');

const getIndex = (req, res, next) => {

    const featuredVideo = repo.featuredVideo.getFeaturedVideo();
    const youtube = repo.youtube.getVideos(12);
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

        data.youtube.videos = data.youtube.videos.split(3);
        data.soundcloud = data.soundcloud.split(3);

        res.render('partials/index', data);
    }, (err) => {
        res.render('partials/error', { message: err });
    });
};

const getAbout = (req, res, next) => {
    res.render('partials/about');
}

//https://jsfiddle.net/qt651L6f/1/
Array.prototype.split = function(n) {
  var obj = [];
  var counter = 0;

  this.map(function(value, index) {

    obj[counter] = (Array.isArray(obj[counter])) ? obj[counter] : [];

    obj[counter].push(value);

    counter++;

    if (counter === 3)
      counter = 0;

    return;
  });

  return obj;
};

exports.getIndex = getIndex;
exports.getAbout = getAbout;