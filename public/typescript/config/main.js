/* globals requirejs  */

requirejs.config({
    baseUrl: '/',
    paths: {
        jquery: 'libs/jquery/dist/jquery.min',
        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',
        Bootstrapper: 'js/modules/bootstrapper'
    },
    shim: {
        Bootstrapper: { deps: ['jquery', 'bootstrap'] },
        bootstrap: { deps: ['jquery'] }
    }
});

requirejs(['Bootstrapper'], function (Bootstrapper) {
    'use strict';

    Bootstrapper.initialize();
});