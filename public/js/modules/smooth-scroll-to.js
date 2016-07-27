define(["require", "exports", 'jquery', 'TweenMax'], function (require, exports, $, TweenMax) {
    "use strict";
    var SmoothScrollTo = (function () {
        function SmoothScrollTo(options) {
            var _this = this;
            _this.window = options.windowElement || $(window);
            _this.time = options.time || 1.2;
            _this.distance = options.distance || 170;
            _this.window.on("mousewheel DOMMouseScroll", function (event) {
                event.preventDefault();
                var delta = event.originalEvent.wheelDelta / 80 || -event.originalEvent.detail / 3;
                var scrollTop = _this.window.scrollTop();
                var finalScroll = scrollTop - parseInt(delta * _this.distance);
                TweenMax.to(_this.window, _this.time, {
                    scrollTo: { y: finalScroll, autoKill: true },
                    ease: Power4.easeOut,
                    autoKill: true,
                    overwrite: 5
                });
            });
        }
        SmoothScrollTo.prototype.setScrollToElements = function (elements) {
            elements.click(function (e) {
                var elementId = $(this).attr("data-scroll-to");
                var scrollTo = $(elementId).offset().top - 120;
                TweenMax.to($(window), 1.2, {
                    scrollTo: { y: scrollTo, autoKill: true },
                    ease: Power4.easeOut,
                    autoKill: true,
                    overwrite: 5
                });
            });
        };
        return SmoothScrollTo;
    }());
    exports.SmoothScrollTo = SmoothScrollTo;
});
