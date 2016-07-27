/// <reference path="../../../typings/tsd.d.ts" />

export class NavigationBar {
    isSideBarOpen: boolean;
    menuIconElement: any;
    sideBarElement: any;

    constructor(options: any) {
        const _this = this;
        _this.isSideBarOpen = false;
        _this.menuIconElement = options.menuIconElement
        _this.sideBarElement = options.sideBarElement

        _this.menuIconElement.click(() => {
            _this.sideBarElement.toggleClass('navigation-sidebar-toggle');
        });
    }
}