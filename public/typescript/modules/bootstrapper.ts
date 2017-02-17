/// <reference path="../../../typings/index.d.ts" />

import * as $ from 'jquery';
import * as Navbar from 'js/modules/navbar';

class Bootstrapper {
    constructor() { }

    static initialize() {
        new Navbar();
    }
}

export = Bootstrapper;