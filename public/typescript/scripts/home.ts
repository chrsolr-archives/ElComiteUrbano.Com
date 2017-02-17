/// <reference path="../../../typings/index.d.ts" />

import * as $ from 'jquery';

class HomeScript {
    constructor() {
        $(() => {
            this.setSlideShow();
        });
    }

    setSlideShow(): void {
        $('.carousel').carousel({ interval: 2000, pause: null });
    }
}

export = HomeScript;