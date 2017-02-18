define(["require", "exports", "jquery", "bootstrap", "MagnificPopup"], function (require, exports, $) {
    "use strict";
    var HomeScript = (function () {
        function HomeScript() {
            this.setCarousel();
            this.initMagnificPopup();
        }
        HomeScript.prototype.initMagnificPopup = function () {
            $('.mfp-video-popup').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        };
        HomeScript.prototype.setCarousel = function () {
            $(document).ready(function () {
                var SLIDE_SHOW_TIME = 4000;
                $('.carousel').carousel({ interval: SLIDE_SHOW_TIME, pause: null });
            });
        };
        return HomeScript;
    }());
    return HomeScript;
});
