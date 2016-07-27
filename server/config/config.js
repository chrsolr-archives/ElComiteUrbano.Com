const config = (() => {
    'use strict';

    const client = './public';

    const server = {
        PORT: process.env.PORT || 3000,
        ENV: process.env.NODE_ENV || 'development',
        DB_URI: process.env.DB_CONNECTION || 'mongodb://dev:testdummy@ds051665.mongolab.com:51665/ecu-db-dev'
    };

    const apisKeys = {
        SC_CLIENT_ID: process.env.SC_CLIENT_ID || '500f3c5cdcf76cb1bcc8c35e97864840',
        YOUTUBE_ID: process.env.YOUTUBE_ID || 'AIzaSyDMVu01ka49DBvOGabKYo1vhrykghKJNoI',
        recaptcha_verify_key: process.env.recaptcha_verify_key || 'recaptcha_verify_key'
    };

    const paths = {
        css: `${client}/css/`,
        js: `${client}/js/`,
        babel: `${client}/babel/`,
        typescript: `${client}/typescript/`
    };

    const gulp = {
        tsConfigJson: {
            tsOrder: [
                `**/typescript/**/*.ts`,
                // `**/typescript/**/*.ts`
            ],
            tsConfig: {
                "compilerOptions": {
                    module: 'amd',
                    target: 'es5',
                    removeComments: true,
                    noImplicitAny: true,
                    sourceMap: true,
                    noImplicitReturns: true,
                    suppressImplicitAnyIndexErrors: true,
                    noFallthroughCasesInSwitch: true,
                    allowUnreachableCode: false,
                    outDir: `${paths.js}`
                }
            }
        },
        cssnanoOpts: {
            convertValues: false,
            discardComments: { removeAll: true },
            autoprefixer: false
        },
        jsOrder: [
            `**/navigation-bar.*.js`
        ],
        browserify: {
            entry: `${paths.babel}app.js`
        },
        minifyOpts: {
            ext: {
                min: '.min.js'
            },
            ignoreFiles: ['-min.js', '.min.js']
        }
    };

    return {
        server,
        apisKeys,
        paths,
        gulp
    }
})()

module.exports = config;