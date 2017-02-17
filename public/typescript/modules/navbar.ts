/// <reference path="../../../typings/index.d.ts" />

import * as $ from 'jquery';

class NavBar {
    $sidebar: any;

    constructor() {
        const _this = this;
        const $toggle_button = $('.navbar-menu-icon');

        _this.$sidebar = $('.navbar-sidebar-wrapper');

        $toggle_button.on('click', (e) => {
            _this.toggle();
        });
    }

    toggle(): void {
        this.$sidebar.toggleClass('navbar-sidebar-toggle');
    }
}

export = NavBar;