/// <reference path="../../../typings/index.d.ts" />
/// <amd-dependency path="bootstrap_validator" />
/// <amd-dependency path="dotdotdot" />

import * as $ from 'jquery';
import * as Navbar from 'js/modules/navbar';

class Bootstrapper {
    constructor() { }

    initialize(): void {
        new Navbar();
        this.setContactUsForm();
        this.initTruncate();
    }

    setContactUsForm(): void {
        $('form').validator().on('submit', (e: JQueryEventObject) => {
            const is_valid = !e.isDefaultPrevented();

            if (!is_valid) return;

            $(this).find(':submit').attr('disabled', 'disabled');

            $(this).submit();
        });
    }

    initTruncate() {
        $('.truncate').dotdotdot({
            ellipsis: '…',
            watch: true,
            wrap: 'word',
            height: parseInt($('.truncate').css('line-height'), 10) * 1,
            lastCharacter: {
                remove: [' ', ',', ';', '.', '!', '?'],
                noEllipsis: []
            }, callback: (isTruncated, orgContent) => {
                $(orgContent.context).css({ 'opacity': '1' });
            }
        });
    }
}

export = Bootstrapper;