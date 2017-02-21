define(["require", "exports", "jquery", "js/modules/navbar", "bootstrap_validator"], function (require, exports, $, Navbar) {
    "use strict";
    var Bootstrapper = (function () {
        function Bootstrapper() {
        }
        Bootstrapper.initialize = function () {
            new Navbar();
        };
        Bootstrapper.setContactUsForm = function () {
            var _this = this;
            $(document).ready(function () {
                $('form').validator().on('submit', function (e) {
                    var is_valid = !e.isDefaultPrevented();
                    if (!is_valid)
                        return;
                    $(_this).find(':submit').attr('disabled', 'disabled');
                    $(_this).submit();
                });
            });
        };
        return Bootstrapper;
    }());
    return Bootstrapper;
});
