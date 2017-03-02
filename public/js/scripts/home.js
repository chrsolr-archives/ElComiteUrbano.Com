define(["require", "exports", "jquery", "bootstrap", "slick", "MagnificPopup", "$transit"], function (require, exports, $) {
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
            var $element_container = $('#live-stream-container');
            var $nav_height = $('.navbar-wrapper').outerHeight();
            var isDisabled = false;
            var isScrolled = false;
            var isPopped = false;
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
                var top = $(window).scrollTop() + $nav_height;
                var position_to_popout = $element_container.position().top + $element_container.outerHeight();
                if (!isPopped && !isDisabled && (top > position_to_popout)) {
                    $element.addClass('popout');
                }
                else if (isPopped && (top < position_to_popout)) {
                    $element.removeClass('popout');
                }
                isPopped = $element.hasClass('popout');
            }
            $element.find('i').click(function () {
                $element.removeClass('popout');
                isDisabled = true;
            });
        };
        return HomeScript;
    }());
    return HomeScript;
});
