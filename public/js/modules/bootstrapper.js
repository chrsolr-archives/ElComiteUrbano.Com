define(["require", "exports", "js/modules/navbar"], function (require, exports, Navbar) {
    "use strict";
    var Bootstrapper = (function () {
        function Bootstrapper() {
        }
        Bootstrapper.initialize = function () {
            new Navbar();
        };
        return Bootstrapper;
    }());
    return Bootstrapper;
});
