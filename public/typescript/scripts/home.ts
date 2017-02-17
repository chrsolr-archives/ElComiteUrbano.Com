/// <reference path="../../../typings/index.d.ts" />
/// <amd-dependency path="bootstrap" />

import * as $ from 'jquery';

class HomeScript {
    constructor() {
        $(() => {
            this.setSlideShow();
        });
    }

    setSlideShow(): void {
        $('.carousel').carousel({ interval: 3000, pause: null });
    }
}

export = HomeScript;