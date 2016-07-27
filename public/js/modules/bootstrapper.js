define(["require", "exports", 'jquery', "dotdotdot", "magnific", "material"], function (require, exports, $) {
    "use strict";
    var Bootstrapper = (function () {
        function Bootstrapper() {
        }
        Bootstrapper.prototype.initialize = function () {
            var transparent = true;
            var transparentDemo = true;
            var fixedTop = false;
            var navbar_initialized = false;
            $.material.init();
            var window_width = $(window).width();
            if (window_width >= 992) {
                var big_image = $('.wrapper > .header');
                $(window).on('scroll', debounce(function () {
                    if ($(document).scrollTop() > 260) {
                        if (transparent) {
                            transparent = false;
                            $('.navbar-color-on-scroll').removeClass('navbar-transparent');
                        }
                    }
                    else {
                        if (!transparent) {
                            transparent = true;
                            $('.navbar-color-on-scroll').addClass('navbar-transparent');
                        }
                    }
                }, 17));
            }
            this.initMagnificPopup();
            function debounce(func, wait, immediate) {
                var timeout;
                return function () {
                    var context = this, args = arguments;
                    clearTimeout(timeout);
                    timeout = setTimeout(function () {
                        timeout = null;
                        if (!immediate)
                            func.apply(context, args);
                    }, wait);
                    if (immediate && !timeout)
                        func.apply(context, args);
                };
            }
            ;
        };
        Bootstrapper.prototype.initMagnificPopup = function () {
            $('.mfp-video-popup').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        };
        return Bootstrapper;
    }());
    exports.Bootstrapper = Bootstrapper;
});
