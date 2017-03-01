define(["require", "exports", "jquery", "bootstrap", "slick", "MagnificPopup"], function (require, exports, $) {
    "use strict";
    var HomeScript = (function () {
        function HomeScript() {
            this.setCarousel();
            this.initMagnificPopup();
            this.initLiveStreamPopout();
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
        HomeScript.prototype.initLiveStreamPopout = function () {
            var $element = $('#live-stream');
            var $nav_height = $('.navbar-wrapper').outerHeight();
            var isScrolled = false;
            var delta = 5;
            var speed = 250;
            $(window).scroll(function () {
                isScrolled = true;
            });
            setInterval(function () {
                if (isScrolled) {
                    onHasScrolled();
                    isScrolled = false;
                }
            }, speed);
            function onHasScrolled() {
                var top = $(window).scrollTop();
                var position = $element.position();
                if (Math.abs(top) <= delta)
                    return;
                if (top >= (position.top + $nav_height + $element.outerHeight()))
                    $element.addClass('popout');
                console.log((position.top));
                console.log(($nav_height));
                console.log(($element.outerHeight()));
                console.log((position.top + $nav_height + $element.outerHeight()));
            }
        };
        return HomeScript;
    }());
    return HomeScript;
});
