const featuredVideo = (() => {

    function getFeaturedVideo() {
        const FeatVideoModel = require('../../models/FeaturedVideo');

        return FeatVideoModel.getFeaturedVideo();
    }

    return {
        getFeaturedVideo
    };
})();

module.exports = featuredVideo;