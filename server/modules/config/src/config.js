'use strict';

module.exports = (() => {

    const client = './public/';

    const db = {
        URI: process.env.DB_CONNECTION || 'mongodb://dev:testdummy@ds051665.mongolab.com:51665/ecu-db-dev'
    };

    const environment = {
        PORT: process.env.PORT || 3000,
        ENV: process.env.NODE_ENV || 'DEV',
        BRAND_TITLE: process.env.BRAND_TITLE || 'ECU-Dev',
        SESSION_SECRET: process.env.SESSION_SECRET || 'SECRET'
    };

    const api_keys = {
        SC_CLIENT_ID: process.env.SC_CLIENT_ID || '500f3c5cdcf76cb1bcc8c35e97864840',
        YOUTUBE_ID: process.env.YOUTUBE_ID || 'AIzaSyDMVu01ka49DBvOGabKYo1vhrykghKJNoI',
        RECAPTCHA_KEY: process.env.RECAPTCHA_KEY || '6LccJhYUAAAAAO4v71GJSDG2rzTmIh2thovrz3IO',
        RECAPTCHA_SECRET: process.env.REPCATCHA_SECRET || '6LccJhYUAAAAAPfEoXL5PkK2gLdqXsdCwS5HamyG',
        GOOGLE_OAUTH: {
            CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '1002857289292-405s1icgiqa3q8u5elrafqlvph5achu1.apps.googleusercontent.com',
            CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '1BlANA8IeDGUNbf1yccrZsiD',
            CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback'
        }
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