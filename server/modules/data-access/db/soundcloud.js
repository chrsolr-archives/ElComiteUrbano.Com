'use strict';

const config = require('../../config').config;
const request = require('request');

const soundcloud = (() => {

    function getSoundcloudTracks(limit) {

        return new Promise((resolve, reject) => {
            limit = limit || 12;
            const URL = `http://api.soundcloud.com/users/226660344/tracks.json?client_id=${config.api_keys.SC_CLIENT_ID}&limit=${limit}`;

            request(URL, (err, res) => {
                if (err) {
                    return reject(new Error(err));
                }

                if (res.statusCode >= 400) {
                    return reject(new Error(`SC request error: (${res.statusCode}) - ${res.statusMessage}`));
                }

                let songs = [];
                let json = JSON.parse(res.body);

                json.forEach((item) => {
                    let cover = item.artwork_url;

                    cover = (cover) ? cover.replace('large', 't500x500') : 'https://i1.sndcdn.com/avatars-000138805507-sejp8z-t500x500.jpg';

                    const meta = item.title.replace(/\u2010|\u2011\u2012|\u2013|\u2014|\u2015|\uFE58|\uFE63|\uFF0D/g, '-').split(' - ');

                    const track = {
                        artists: meta[0],
                        title: meta[1],
                        trackId: item.id,
                        url: item.permalink_url,
                        imageUrl: cover,
                        dateCreated: item.created_at,
                        stream_url: item.stream_url + '?client_id=' + config.api_keys.SC_CLIENT_ID,
                        download_url: (item.downloadable) ? item.download_url + '?client_id=' + config.api_keys.SC_CLIENT_ID : undefined,
                        download_count: item.download_count || 0,
                        playback_count: item.playback_count || 0,
                        trackUrl: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${item.id}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true`
                    };

                    songs.push(track);
                });

                return resolve(songs);
            });
        });
    }

    return {
        getSoundcloudTracks
    };
})();

module.exports = soundcloud;