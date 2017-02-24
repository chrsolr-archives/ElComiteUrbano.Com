/// <reference path="../../../typings/index.d.ts" />
/// <amd-dependency path="bootstrap" />
/// <amd-dependency path="carousel_swipe" />
/// <amd-dependency path="MagnificPopup" />

import * as $ from 'jquery';

class HomeScript {

    constructor() {
        this.setCarousel();
        this.initMagnificPopup();
    }

    initMagnificPopup(): void {
        $('.mfp-video-popup').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }

    setCarousel(): void {
        $(document).ready(() => {
            const SLIDE_SHOW_TIME: int = 4000;

            $('.carousel').carousel({ interval: SLIDE_SHOW_TIME, pause: null });
        });
    }
}

export = HomeScript;