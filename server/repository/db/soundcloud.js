const config = require('../../config/config');
const request = require('request');

const soundcloud = (() => {

    function getSoundcloudTracks(limit) {

        return new Promise((resolve, reject) => {
            var limit = limit || 12;
            // var url = `http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/elcomiteurbanoradio&client_id=${config.apisKeys.SC_CLIENT_ID}`;
            var url = `http://api.soundcloud.com/users/226660344/tracks.json?client_id=${config.apisKeys.SC_CLIENT_ID}&limit=${limit}`;

            request(url, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var songs = [];
                    var json = JSON.parse(response.body);

                    json.forEach(function(item, index, array) {
                        var cover = item.artwork_url;

                        cover = (cover) ? cover.replace("large", "t500x500") : "https://i1.sndcdn.com/avatars-000138805507-sejp8z-t500x500.jpg";
                        
                        item.title = item.title.replace(/\u2010|\u2011\u2012|\u2013|\u2014|\u2015|\uFE58|\uFE63|\uFF0D/g, "-");
                                        
                        var meta = item.title.split(' - ');

                        var track = {
                            artists: meta[0],
                            title: meta[1],
                            trackId: item.id,
                            url: item.permalink_url,
                            imageUrl: cover,
                            dateCreated: item.created_at,
                            stream_url: item.stream_url + '?client_id=' + config.apisKeys.soundcloud_client_id,
                            download_url: item.download_url + '?client_id=' + config.apisKeys.soundcloud_client_id,
                            download_count: item.download_count || 0,
                            playback_count: item.playback_count || 0,
                            trackUrl: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${item.id}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true`
                        };

                        songs.push(track);
                    });

                    return resolve(songs);
                } else {
                    if (error) return reject(error);
                    if (response.statusCode >= 400) return reject(`SC request error: (${response.statusCode}) - ${response.statusMessage}`);
                }

            });

        });
    }

    return {
        getSoundcloudTracks
    };
})();

module.exports = soundcloud;