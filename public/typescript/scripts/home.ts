/// <reference path="../../../typings/index.d.ts" />
/// <amd-dependency path="bootstrap" />
/// <amd-dependency path="slick" />
/// <amd-dependency path="MagnificPopup" />

import * as $ from 'jquery';
import * as Ustream from 'ustream';

class HomeScript {

    constructor() {
        this.setCarousel();
        this.initMagnificPopup();
        //this.initLiveStreamPopout();
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
        const SLIDE_SHOW_TIME: int = 3500;

        $('.slider-wrapper-music').slick({
            dots: true,
            infinite: true,
            speed: 700,
            autoplay: true,
            autoplaySpeed: SLIDE_SHOW_TIME,
            mobileFirst: false,
            arrows: false,
            fade: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        $('.slider-wrapper-header').slick({
            dots: false,
            infinite: true,
            speed: 700,
            autoplay: true,
            autoplaySpeed: SLIDE_SHOW_TIME,
            mobileFirst: false,
            arrows: false,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true
        });
    }

    // initLiveStreamPopout(): void {
    //     if (!(new Date().getUTCDay() === 1 && new Date().getUTCHours() >= 23) || !(new Date().getUTCDay() === 2 && new Date().getUTCHours() <= 2)) {
    //         live();
    //     }

    //     function live() {
    //         const ustream_full = Ustream('ustream-full');
    //         const ustream_mini = Ustream('ustream-mini');
    //         const $element = $('#live-stream');
    //         const $element_container = $('#live-stream-container');
    //         const $nav_height = $('.navbar-wrapper').outerHeight();
    //         const isScrolled = false;
    //         const isDisabled = false;
    //         const isPopped = false;

    //         $(window).scroll(() => {
    //             isScrolled = true;
    //         });

    //         setInterval(() => {
    //             if (isScrolled) {
    //                 onHasScrolled();
    //                 isScrolled = false;
    //             }
    //         }, 250);

    //         function onHasScrolled() {
    //             const top = $(window).scrollTop() + $nav_height;
    //             const position_to_popout = $element_container.position().top + $element_container.outerHeight();

    //             if (!isPopped && !isDisabled && (top > position_to_popout)) {
    //                 $element.addClass('popout');
    //                 ustream_full.callMethod('volume', 0);
    //                 ustream_mini.callMethod('volume', 50);
    //             } else if (isPopped && (top < position_to_popout)) {
    //                 $element.removeClass('popout');
    //                 ustream_full.callMethod('volume', 50);
    //                 ustream_mini.callMethod('volume', 0);
    //             }

    //             isPopped = $element.hasClass('popout');
    //         }

    //         $element.find('i').click(() => {
    //             $element.removeClass('popout');
    //             isDisabled = true;
    //             ustream_mini.callMethod('stop');
    //         });
    //     }
    // }
}

export = HomeScript;