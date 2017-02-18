/// <reference path="../../../typings/index.d.ts" />
/// <amd-dependency path="bootstrap" />

import * as $ from 'jquery';

class HomeScript {


    constructor() {
        const _this = this;

        $(document).ready(() => {
            const SLIDE_SHOW_TIME: int = 5000;

            $('.carousel').carousel({ interval: SLIDE_SHOW_TIME, pause: null });

            // $('.loading-bar').each(function (i, element) {
            //     _this.startProgressBar($(element), SLIDE_SHOW_TIME, 10);

            //     $('.carousel').on('slide.bs.carousel', function () {
            //         _this.startProgressBar($(element), SLIDE_SHOW_TIME, 10);
            //     });
            // });
        });
    }

    // startProgressBar($element: any, time: int, delta: int): Function {
    //     let counter = 0;
    //     let width = 0;

    //     const incrementWidth = setInterval(progress, delta);

    //     function progress() {
    //         counter += delta;
    //         width = width + 100 / (time / delta);
            
    //         if (counter >= time) {
    //             counter = 0;
    //             width = 0;
    //             clearInterval(incrementWidth);
    //         }

    //         $element.css({ width: `${width}%`);
    //     };
    // }
}

export = HomeScript;