/// <reference path="../../../typings/index.d.ts" />

import * as $ from 'jquery';
import * as Navbar from 'js/modules/navbar';

class Bootstrapper {
    constructor() { }

    initialize() {
        new Navbar().toggle();
    }
}

export = Bootstrapper;