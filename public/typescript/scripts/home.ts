/// <reference path="../../../typings/index.d.ts" />
/// <amd-dependency path="bootstrap" />
/// <amd-dependency path="slick" />
/// <amd-dependency path="MagnificPopup" />
/// <amd-dependency path="$transit" />

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
        const $element_container = $('#live-stream-container');
        const $nav_height = $('.navbar-wrapper').outerHeight();
        const isDisabled = false;
        const isScrolled = false;
        const isPopped = false;
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
            const top = $(window).scrollTop() + $nav_height;
            const position_to_popout = $element_container.position().top + $element_container.outerHeight();

            if (!isPopped && !isDisabled && (top > position_to_popout)) {
                $element.addClass('popout');
            } else if (isPopped && (top < position_to_popout)) {
                $element.removeClass('popout');
            }

            isPopped = $element.hasClass('popout');
        }

        $element.find('i').click(() => {
            $element.removeClass('popout');
            isDisabled = true;
        });
    }
}

export = HomeScript;