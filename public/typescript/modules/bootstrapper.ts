/// <reference path="../../../typings/tsd.d.ts" />
/// <amd-dependency path="dotdotdot" />
/// <amd-dependency path="magnific" />
/// <amd-dependency path="material" />

import * as $ from 'jquery';
// import {NavigationBar} from 'NavigationBar';
// import {SmoothScrollTo} from 'SmoothScrollTo';
// import {Animation} from 'Animation';

export class Bootstrapper {

    constructor() { }

    initialize() {

        var transparent = true;

        var transparentDemo = true;
        var fixedTop = false;

        var navbar_initialized = false;

        $.material.init();

        var window_width = $(window).width();

        if (window_width >= 992) {
            var big_image = $('.wrapper > .header');

            $(window).on('scroll', debounce(function () {
                if ($(document).scrollTop() > 260) {
                    if (transparent) {
                        transparent = false;
                        $('.navbar-color-on-scroll').removeClass('navbar-transparent');
                    }
                } else {
                    if (!transparent) {
                        transparent = true;
                        $('.navbar-color-on-scroll').addClass('navbar-transparent');
                    }
                }
            }, 17));
        }

        // this.initNavigationBar();
        this.initTruncate();
        // this.initSmoothMouseScroll();
        this.initMagnificPopup();
        // this.initFadeIntoView('fade-into-view');

        function debounce(func: Function, wait: number, immediate?: any) {
            var timeout: number;
            return function () {
                var context = this, args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                }, wait);
                if (immediate && !timeout) func.apply(context, args);
            };
        };
    }

    // initFadeIntoView(classname: string) {
    //     new Animation().fadeIntoView(classname);
    // }

    // initNavigationBar() {
    //     new NavigationBar({
    //         menuIconElement: $('.menu-icon-wrapper'),
    //         sideBarElement: $('.navigation-sidebar-wrapper')
    //     });
    // }

    // initSmoothMouseScroll() {
    //     new SmoothScrollTo({
    //         window: $(window),
    //         time: 1.2,
    //         distance: 170
    //     });
    // }

    initTruncate() {
        $('.truncate').dotdotdot({
            ellipsis: '…',
            watch: true,
            wrap: 'word',
            height: parseInt($('.truncate').css('line-height'), 10) * 1,
            lastCharacter: {
                remove: [' ', ',', ';', '.', '!', '?'],
                noEllipsis: []
            }, callback: (isTruncated, orgContent) => {
                $(orgContent.context).css({ 'opacity': '1' });
            }
        });
    }

    initMagnificPopup() {
        $('.mfp-video-popup').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }
}