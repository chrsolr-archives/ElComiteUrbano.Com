/// <reference path="../../../typings/tsd.d.ts" />

import * as $ from 'jquery';

export class Animation {
    constructor() { }

    fadeIntoView(classname: string, speed?: number) {
        speed = speed || 500;
        
        fadeIntoView(classname, speed);

        $(window).scroll(() => {
            fadeIntoView(classname, speed);
        });

        function fadeIntoView(classname: string, speed: number) {
            $(`.${classname}`).each(function (i) {
                const scrollTop = $(window).scrollTop();
                const top_of_object = $(this).position().top;
                const bottom_of_window = scrollTop + ($(window).height() - 100);

                if (top_of_object < bottom_of_window) {
                    $(this).animate({
                        'opacity': '1'
                    }, speed);
                }
            });
        }
    }
}