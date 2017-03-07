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
            var window_width = $(document).width() + scrollbarSize();
            var class_name = 'navbar-sidebar-toggle';
            if (window_width < 1200) {
                this.$sidebar.toggleClass(class_name);
                this.$body.toggleClass('no-scroll');
            }
        };
        NavBar.prototype.onWindowResize = function () {
            var window_width = $(document).width() + scrollbarSize();
            var class_name = 'navbar-sidebar-toggle';
            this.$body.removeClass('no-scroll');
            if (window_width >= 1200 && !this.$sidebar.hasClass(class_name)) {
                this.$sidebar.addClass(class_name);
            }
            else if (window_width < 1200 && this.$sidebar.hasClass(class_name)) {
                this.$sidebar.removeClass(class_name);
            }
        };
        return NavBar;
    }());
    function scrollbarSize() {
        var div = $('<div class="antiscroll-inner" style="width:50px;height:50px;overflow-y:scroll;'
            + 'position:absolute;top:-200px;left:-200px;"><div style="height:100px;width:100%"/>'
            + '</div>');
        $('body').append(div);
        var width = $(div).innerWidth() - $('div', div).innerWidth();
        $(div).remove();
        return width;
    }
    ;
    return NavBar;
});
