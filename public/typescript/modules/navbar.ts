/// <reference path="../../../typings/index.d.ts" />

import * as $ from 'jquery';

class NavBar {
    $sidebar: any;
    $body: any;

    constructor() {
        const _this = this;
        const $toggle_button = $('.navbar-menu-icon');

        _this.$sidebar = $('.navbar-sidebar-wrapper');
        _this.$body = $('body');

        $toggle_button.on('click', (e) => {
            _this.toggle();
        });
    }

    toggle(): void {
        this.$sidebar.toggleClass('navbar-sidebar-toggle');
        this.$body.toggleClass('no-scroll');
    }
}

export = NavBar;