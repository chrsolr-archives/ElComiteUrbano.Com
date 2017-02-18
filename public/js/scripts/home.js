define(["require", "exports", "jquery", "bootstrap"], function (require, exports, $) {
    "use strict";
    var HomeScript = (function () {
        function HomeScript() {
            var _this = this;
            $(function () {
                var SLIDE_SHOW_TIME = 5000;
                $('.carousel').carousel({ interval: SLIDE_SHOW_TIME, pause: null });
                $('.loading-bar').each(function (i, element) {
                    $('.carousel').on('slide.bs.carousel', function () {
                        _this.startProgressBar($(element), SLIDE_SHOW_TIME, 10);
                    });
                });
            });
        }
        HomeScript.prototype.startProgressBar = function ($element, time, delta) {
            var counter = 0;
            var width = 0;
            var incrementWidth = setInterval(progress, delta);
            function progress() {
                counter += delta;
                width = width + 100 / (time / delta);
                if (counter >= time) {
                    counter = 0;
                    width = 0;
                    clearInterval(incrementWidth);
                }
                $element.css({ width: width + "%" });
            }
            ;
        };
        return HomeScript;
    }());
    return HomeScript;
});
