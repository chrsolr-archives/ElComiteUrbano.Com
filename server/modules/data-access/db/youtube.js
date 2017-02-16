const config = require('../../../config/config');
const request = require('request');
const dateFormat = require('dateformat');

const youtube = (() => {

    function getVideos(limit, pageNumber) {

        return new Promise((resolve, reject) => {
            var max = limit || 10;
            var page = pageNumber || '';
            var key = config.apisKeys.YOUTUBE_ID;
            var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UU3bdjHToDAsKUghgGq00c8Q&maxResults=' + max + '&pageToken=' + page + '&key=' + key;

            request(url, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    var json = JSON.parse(response.body);

                    var data = {
                        next: json.nextPageToken || '',
                        prev: json.prevPageToken || '',
                        totalItems: json.pageInfo.totalResults,
                        videos: []
                    };

                    json.items.forEach((item, index, array) => {
                        var imageUrl = "";

                        if (item.snippet.thumbnails.maxres != null)
                            imageUrl = item.snippet.thumbnails.maxres.url;
                        else if (item.snippet.thumbnails.standard != null)
                            imageUrl = item.snippet.thumbnails.standard.url;
                        else if (item.snippet.thumbnails.high != null)
                            imageUrl = item.snippet.thumbnails.high.url;
                        else if (item.snippet.thumbnails.medium != null)
                            imageUrl = item.snippet.thumbnails.medium.url;
                        else
                            imageUrl = item.snippet.thumbnails["default"].url;

                        var video = {
                            id: item.snippet.resourceId.videoId,
                            title: item.snippet.title,
                            videoEmbedUrl: `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`,
                            videoUrl: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
                            publishedAt: dateFormat(item.snippet.publishedAt, "fullDate"),
                            description: item.snippet.description,
                            imageUrl: imageUrl
                        };


                        data.videos.push(video);
                    });

                    return resolve(data);
                }
            });
        });
    }

    return {
        getVideos
    };
})();

module.exports = youtube;