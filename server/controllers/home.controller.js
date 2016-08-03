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

        data.youtube.videos = split(data.youtube.videos, 3);
        data.soundcloud = split(data.soundcloud, 3);

        res.render('partials/index', data);
    }, (err) => {
        res.render('partials/error', { message: err });
    });
};

const getAbout = (req, res, next) => {
    res.render('partials/about');
}

function split(arr, n) {
    var obj = {};

    for (var i = 0; i < n; i++) {
        obj['set' + i] = [];
    }

    for (var i = 0; i < arr.length; i++) {
        var c = i;

        for (var j = 0; j < n; j++) {
            if (arr[c])
                obj['set' + j].push(arr[c]);
            c++;
        }

        i = (i + n - 1);
    }

    return obj;
};

exports.getIndex = getIndex;
exports.getAbout = getAbout;