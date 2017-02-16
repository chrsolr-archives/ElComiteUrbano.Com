'use strict';

module.exports = (() => {

    const client = './public/';

    const db = {
        URI: process.env.DB_CONNECTION || 'mongodb://dev:testdummy@ds051665.mongolab.com:51665/ecu-db-dev'
    };

    const environment = {
        PORT: process.env.PORT || 3000,
        ENV: process.env.NODE_ENV || 'DEV',
        BRAND_TITLE: process.env.BRAND_TITLE || 'ECU-Dev'
    };

    const api_keys = {
        SC_CLIENT_ID: process.env.SC_CLIENT_ID,
        YOUTUBE_ID: process.env.YOUTUBE_ID,
        RECAPTCHA_KEY: process.env.RECAPTCHA_KEY
    };

    const paths = {
        ROOT: '.',
        CLIENT: client,
        CSS: `${client}css/`,
        JS: `${client}js/`,
        VIEWS: `${client}partials/`,
        TYPESCRIPT: `${client}typescript/`,
        SASS: `${client}sass/`,
        LIBS: `${client}libs/`
    };

    const gulp = {
        ts_config_json: {
            tsOrder: [
                `**/typescript/**/*.ts`
            ],
            tsConfig: {
                'compilerOptions': {
                    module: 'amd',
                    target: 'es5',
                    allowJs: false,
                    removeComments: true,
                    noImplicitAny: false,
                    sourceMap: false,
                    noImplicitReturns: false,
                    suppressImplicitAnyIndexErrors: true,
                    suppressExcessPropertyErrors: true,
                    noFallthroughCasesInSwitch: true,
                    allowUnreachableCode: false,
                    allowSyntheticDefaultImports: true,
                    rootDir: `${paths.TYPESCRIPT}`,
                    declaration: true,
                    alwaysStrict: true,
                    noEmitOnError: false,
                    noEmit: false,
                    noResolve: true,
                }
            }
        },
        minify_opts: {
            ext: {
                min: '.min.js'
            },
            ignoreFiles: ['-min.js', '.min.js'],
            mangle: false
        },
        nodemon_opts: {
            script: 'server.js',
            ext: 'js html less ts',
            delayTime: 3
        },
        css_nano_opts: {
            convertValues: false,
            discardComments: { removeAll: true },
            autoprefixer: false
        }
    };

    return {
        environment,
        api_keys,
        paths,
        gulp,
        db
    };
})();