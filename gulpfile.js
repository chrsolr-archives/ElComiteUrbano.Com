'use strict';

const config = require('./server/modules/config').config;
const gulp = require('gulp');
const glp = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('sass-compile', () => {
    return gulp.src(config.paths.SASS + 'style.scss')
        .pipe(glp.sass().on('error', glp.sass.logError))
        .pipe(gulp.dest(config.paths.CSS));
});

gulp.task('autoprefixer', ['sass-compile'], () =>
    gulp.src(config.paths.CSS + 'style.css')
    .pipe(glp.autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(config.paths.CSS))
);

gulp.task('minify-css', ['autoprefixer'], () => {
    return gulp.src(config.paths.CSS + 'style.css')
        .pipe(glp.cssnano(config.gulp.cssnanoOpts))
        .pipe(glp.rename('style.min.css'))
        .pipe(gulp.dest(config.paths.CSS));
});

gulp.task('tsconfig', () => {
    var tsConfig = glp.tsconfig(config.gulp.ts_config_json);

    return gulp.src([config.paths.TYPESCRIPT + "**/*.ts"])
        .pipe(tsConfig())
        .pipe(gulp.dest('./'));
});

gulp.task('ts-compile', ['tsconfig'], () => {
    var ts = glp.typescript;
    var tsProject = ts.createProject('./tsconfig.json');

    return tsProject.src()
        .pipe(tsProject(ts.reporter.nullReporter())).js
        //.pipe(glp.minify(config.gulp.minify_opts))
        .pipe(gulp.dest(`${config.paths.JS}`));
});

gulp.task('copy-require-main-js', () => {
    return gulp.src(`${config.paths.TYPESCRIPT}config/main.js`)
        .pipe(gulp.dest(config.paths.JS));
});

gulp.task('default', ['minify-css', 'ts-compile', 'copy-require-main-js']);