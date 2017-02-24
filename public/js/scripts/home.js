define(["require", "exports", "jquery", "bootstrap", "slick", "MagnificPopup"], function (require, exports, $) {
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
                var SLIDE_SHOW_TIME = 3000;
                $('.slider-wrapper').slick({
                    dots: true,
                    infinite: true,
                    speed: 700,
                    autoplay: true,
                    autoplaySpeed: SLIDE_SHOW_TIME,
                    mobileFirst: false,
                    arrows: true,
                    fade: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            });
        };
        return HomeScript;
    }());
    return HomeScript;
});
