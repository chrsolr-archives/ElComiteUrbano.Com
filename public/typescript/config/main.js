/* globals requirejs  */

requirejs.config({
    baseUrl: '/',
    paths: {
        jquery: 'libs/jquery/dist/jquery.min',
        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',
        Bootstrapper: 'js/modules/bootstrapper',
        MagnificPopup: 'libs/magnific-popup/dist/jquery.magnific-popup',
    },
    shim: {
        Bootstrapper: { deps: ['jquery', 'bootstrap'] },
        bootstrap: { deps: ['jquery'] },
        MagnificPopup: { deps: ['jquery'] }
    }
});

requirejs(['Bootstrapper'], function (Bootstrapper) {
    'use strict';

    Bootstrapper.initialize();
});