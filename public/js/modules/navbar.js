define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    var NavBar = (function () {
        function NavBar() {
            var _this = this;
            var $toggle_button = $('.navbar-menu-icon');
            _this.$sidebar = $('.navbar-sidebar-wrapper');
            _this.$body = $('body');
            $toggle_button.on('click', function (e) {
                _this.toggle();
            });
        }
        NavBar.prototype.toggle = function () {
            this.$sidebar.toggleClass('navbar-sidebar-toggle');
            this.$body.toggleClass('no-scroll');
        };
        return NavBar;
    }());
    return NavBar;
});
