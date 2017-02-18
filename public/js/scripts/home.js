define(["require", "exports", "jquery", "bootstrap"], function (require, exports, $) {
    "use strict";
    var HomeScript = (function () {
        function HomeScript() {
            var _this = this;
            $(document).ready(function () {
                var SLIDE_SHOW_TIME = 5000;
                $('.carousel').carousel({ interval: SLIDE_SHOW_TIME, pause: null });
            });
        }
        return HomeScript;
    }());
    return HomeScript;
});
