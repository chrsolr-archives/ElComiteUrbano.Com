define(["require", "exports", "js/modules/navbar"], function (require, exports, Navbar) {
    "use strict";
    var Bootstrapper = (function () {
        function Bootstrapper() {
        }
        Bootstrapper.prototype.initialize = function () {
            new Navbar().toggle();
        };
        return Bootstrapper;
    }());
    return Bootstrapper;
});
