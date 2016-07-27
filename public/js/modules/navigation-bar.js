define(["require", "exports"], function (require, exports) {
    "use strict";
    var NavigationBar = (function () {
        function NavigationBar(options) {
            var _this = this;
            _this.isSideBarOpen = false;
            _this.menuIconElement = options.menuIconElement;
            _this.sideBarElement = options.sideBarElement;
            _this.menuIconElement.click(function () {
                _this.sideBarElement.toggleClass('navigation-sidebar-toggle');
            });
        }
        return NavigationBar;
    }());
    exports.NavigationBar = NavigationBar;
});
