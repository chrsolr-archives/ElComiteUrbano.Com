define(["require", "exports", "jquery", "js/modules/navbar", "bootstrap_validator", "dotdotdot"], function (require, exports, $, Navbar) {
    "use strict";
    var Bootstrapper = (function () {
        function Bootstrapper() {
        }
        Bootstrapper.prototype.initialize = function () {
            var navbar = new Navbar();
            navbar.onWindowResize();
            this.setContactUsForm();
            this.initTruncate();
            $(window).resize(function () {
                navbar.onWindowResize();
            });
        };
        Bootstrapper.prototype.setContactUsForm = function () {
            var _this = this;
            $('form').validator().on('submit', function (e) {
                var is_valid = !e.isDefaultPrevented();
                if (!is_valid)
                    return;
                $(_this).find(':submit').attr('disabled', 'disabled');
                $(_this).submit();
            });
        };
        Bootstrapper.prototype.initTruncate = function () {
            $('.truncate').dotdotdot({
                ellipsis: '…',
                watch: true,
                wrap: 'word',
                height: parseInt($('.truncate').css('line-height'), 10) * 1,
                lastCharacter: {
                    remove: [' ', ',', ';', '.', '!', '?'],
                    noEllipsis: []
                }, callback: function (isTruncated, orgContent) {
                    $(orgContent.context).css({ 'opacity': '1' });
                }
            });
        };
        return Bootstrapper;
    }());
    return Bootstrapper;
});
