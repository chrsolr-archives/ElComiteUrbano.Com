define(["require", "exports", 'jquery'], function (require, exports, $) {
    "use strict";
    var Animation = (function () {
        function Animation() {
        }
        Animation.prototype.fadeIntoView = function (classname, speed) {
            speed = speed || 500;
            fadeIntoView(classname, speed);
            $(window).scroll(function () {
                fadeIntoView(classname, speed);
            });
            function fadeIntoView(classname, speed) {
                $("." + classname).each(function (i) {
                    var scrollTop = $(window).scrollTop();
                    var top_of_object = $(this).position().top;
                    var bottom_of_window = scrollTop + ($(window).height() - 100);
                    if (top_of_object < bottom_of_window) {
                        $(this).animate({
                            'opacity': '1'
                        }, speed);
                    }
                });
            }
        };
        return Animation;
    }());
    exports.Animation = Animation;
});
