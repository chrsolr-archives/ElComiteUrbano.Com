'use strict';

const config = require('../../config').config;
const request = require('request');
const moment = require('moment');

const youtube = (() => {

    function getVideos(limit, pageNumber) {

        return new Promise((resolve, reject) => {
            const max = limit || 10;
            const page = pageNumber || '';
            const key = config.api_keys.YOUTUBE_ID;
            const URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UU3bdjHToDAsKUghgGq00c8Q&maxResults=${max}&pageToken=${page}&key=${key}`;

            request(URL, (err, res) => {
                if (err) {
                    return reject(new Error(err));
                }

                if (res.statusCode >= 400) {
                    return reject(new Error(res.statusCode));
                }

                const json = JSON.parse(res.body);

                var data = {
                    next: json.nextPageToken || '',
                    prev: json.prevPageToken || '',
                    totalItems: json.pageInfo.totalResults,
                    videos: []
                };

                json.items.forEach((item) => {
                    let imageUrl = '';

                    if (item.snippet.thumbnails.maxres != null) {
                        imageUrl = item.snippet.thumbnails.maxres.url;
                    } else if (item.snippet.thumbnails.standard != null) {
                        imageUrl = item.snippet.thumbnails.standard.url;
                    } else if (item.snippet.thumbnails.high != null){
                        imageUrl = item.snippet.thumbnails.high.url;
                    } else if (item.snippet.thumbnails.medium != null) {
                        imageUrl = item.snippet.thumbnails.medium.url;
                    } else {
                        imageUrl = item.snippet.thumbnails['default'].url;
                    }

                    const video = {
                        id: item.snippet.resourceId.videoId,
                        title: item.snippet.title,
                        videoEmbedUrl: `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`,
                        videoUrl: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
                        publishedAt: moment(item.snippet.publishedAt).format('L'),
                        description: item.snippet.description,
                        imageUrl: imageUrl
                    };

                    data.videos.push(video);
                });

                return resolve(data);
            });
        });
    }

    return {
        getVideos
    };
})();

module.exports = youtube;