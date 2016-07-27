/// <reference path="../../../typings/tsd.d.ts" />

import * as $ from 'jquery';
import * as TweenMax from 'TweenMax';

export class SmoothScrollTo {
    window: any;
    distance: number;
    time: number;

    constructor(options: any) {
        const _this = this;
        _this.window = options.windowElement || $(window);
        _this.time = options.time || 1.2;
        _this.distance = options.distance || 170;

        _this.window.on("mousewheel DOMMouseScroll", (event: any) => {
            event.preventDefault();

            const delta = event.originalEvent.wheelDelta / 80 || -event.originalEvent.detail / 3;
            const scrollTop = _this.window.scrollTop();
            const finalScroll = scrollTop - parseInt(delta * _this.distance);

            TweenMax.to(_this.window, _this.time, {
                scrollTo: { y: finalScroll, autoKill: true },
                ease: Power4.easeOut,
                autoKill: true,
                overwrite: 5
            });
        });
    }

    setScrollToElements(elements: any) {
        elements.click(function(e: any) {
            const elementId = $(this).attr("data-scroll-to");
            const scrollTo = $(elementId).offset().top - 120;

            TweenMax.to($(window), 1.2, {
                scrollTo: { y: scrollTo, autoKill: true },
                ease: Power4.easeOut,
                autoKill: true,
                overwrite: 5
            });
        });
    }
}