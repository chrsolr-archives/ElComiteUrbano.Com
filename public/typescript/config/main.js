/* globals requirejs  */

requirejs.config({
    baseUrl: '/',
    paths: {
        jquery: 'libs/jquery/dist/jquery.min',
        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',
        Bootstrapper: 'js/modules/bootstrapper',
        MagnificPopup: 'libs/magnific-popup/dist/jquery.magnific-popup',
        bootstrap_validator: 'libs/bootstrap-validator/dist/validator.min',
        slick: 'libs/slick-carousel/slick/slick.min',
        dotdotdot: 'libs/jQuery.dotdotdot/src/jquery.dotdotdot.min',
    },
    shim: {
        Bootstrapper: {
            deps: ['jquery', 'bootstrap']
        },
        bootstrap: {
            deps: ['jquery']
        },
        MagnificPopup: {
            deps: ['jquery']
        },
        slick: {
            deps: ['jquery']
        },
        bootstrap_validator: {
            deps: ['bootstrap']
        },
        dotdotdot: {
            deps: ['jquery']
        }
    }
});

requirejs(['Bootstrapper'], function (Bootstrapper) {
    'use strict';

    new Bootstrapper().initialize();
});