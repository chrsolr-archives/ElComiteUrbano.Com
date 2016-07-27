requirejs.config({
    baseUrl: '/',
    paths: {
        jquery: 'libs/jquery/dist/jquery.min',
        dotdotdot: 'libs/jQuery.dotdotdot/src/jquery.dotdotdot.min',
        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',
        material: 'libs/bootstrap-material-design/dist/js/material.min',
        materialKit: '/libs/material-kit/js/material-kit',
        magnific: 'libs/magnific-popup/dist/jquery.magnific-popup',
        TweenMax: 'libs/gsap/src/minified/TweenMax.min',
        ScrollToPlugin: 'libs/gsap/src/minified/plugins/ScrollToPlugin.min',
        Bootstrapper: 'js/modules/bootstrapper',
        NavigationBar: 'js/modules/navigation-bar',
        SmoothScrollTo: 'js/modules/smooth-scroll-to',
        Animation: 'js/modules/animation',
    },
    shim: {
        dotdotdot: {
            deps: ['jquery']
        },
        magnific: {
            deps: ['jquery']
        },
        TweenMax: {
            deps: ['ScrollToPlugin']
        },
        bootstrap: {
            deps: ['jquery']
        },
        material: {
            deps: ['bootstrap']
        },
        materialKit: {
            deps: ['material']
        }
    }
});

requirejs(['Bootstrapper'], function (Bootstrapper) {
    new Bootstrapper.Bootstrapper().initialize();
});