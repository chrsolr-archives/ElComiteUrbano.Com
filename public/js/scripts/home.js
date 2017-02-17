define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    var HomeScript = (function () {
        function HomeScript() {
            var _this = this;
            $(function () {
                _this.setSlideShow();
            });
        }
        HomeScript.prototype.setSlideShow = function () {
            $('.carousel').carousel({ interval: 2000, pause: null });
        };
        return HomeScript;
    }());
    return HomeScript;
});
