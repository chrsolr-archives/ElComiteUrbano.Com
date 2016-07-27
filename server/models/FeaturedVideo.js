var mongoose = require('mongoose');

var FeaturedVideo = new mongoose.Schema({
    videoUrl: String
});

FeaturedVideo.statics.getFeaturedVideo = function(callback) {
    const _this = this;
    
    return new Promise((resolve, reject) => {
        _this.findOne({}, (err, data) => {
            
            if (err) return reject(err);
            
            return resolve(data);
        });
    })
};

module.exports = mongoose.model('FeaturedVideo', FeaturedVideo, 'FeaturedVideos');