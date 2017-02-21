/// <reference path="../../../typings/index.d.ts" />
/// <amd-dependency path="bootstrap_validator" />

import * as $ from 'jquery';
import * as Navbar from 'js/modules/navbar';

class Bootstrapper {
    constructor() { }

    static initialize(): void {
        new Navbar();
    }

    static setContactUsForm(): void {
        $(document).ready(() => {
            $('form').validator().on('submit', (e: JQueryEventObject) => {
                const is_valid = !e.isDefaultPrevented();

                if (!is_valid) return;

                $(this).find(':submit').attr('disabled','disabled');

                $(this).submit();
            });
        });
    }
}

export = Bootstrapper;