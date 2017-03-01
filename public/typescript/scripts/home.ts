/// <reference path="../../../typings/index.d.ts" />
/// <amd-dependency path="bootstrap" />
/// <amd-dependency path="slick" />
/// <amd-dependency path="MagnificPopup" />

import * as $ from 'jquery';

class HomeScript {

    constructor() {
        this.setCarousel();
        this.initMagnificPopup();
        this.initLiveStreamPopout();
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
            const SLIDE_SHOW_TIME: int = 3000;

            $('.slider-wrapper').slick({
                dots: true,
                infinite: true,
                speed: 700,
                autoplay: true,
                autoplaySpeed: SLIDE_SHOW_TIME,
                mobileFirst: false,
                arrows: true,
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
        });
    }

    initLiveStreamPopout(): void {
        const $element = $('#live-stream');
        const $nav_height = $('.navbar-wrapper').outerHeight();
        const isScrolled = false;
        const delta = 5;
        const speed = 250;

        $(window).scroll(() => {
            isScrolled = true;
        });

        setInterval(() => {
            if (isScrolled) {
                onHasScrolled();
                isScrolled = false;
            }
        }, speed);

        function onHasScrolled() {
            const top = $(window).scrollTop();
            const position = $element.position();

            if (Math.abs(top) <= delta)
                return;

            if (top >= (position.top + $nav_height + $element.outerHeight()))
                $element.addClass('popout');

            console.log((position.top));
            console.log(($nav_height));
            console.log(($element.outerHeight()));
            console.log((position.top + $nav_height + $element.outerHeight()));            
        }
    }
}

export = HomeScript;