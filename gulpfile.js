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

gulp.task('default', ['minify-css']);