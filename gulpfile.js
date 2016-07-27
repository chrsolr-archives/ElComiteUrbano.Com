const config = require('./server/config/config');
const gulp = require('gulp');
const glp = require('gulp-load-plugins')({ lazy: true });

gulp.task('less-compile', () => {
    return gulp
        .src(config.paths.css + '/less/style.less')
        .pipe(glp.less())
        .pipe(gulp.dest(config.paths.css));
});

gulp.task('minify-css', ['less-compile'], () => {
    return gulp.src(config.paths.css + 'style.css')
        .pipe(glp.cssnano(config.gulp.cssnanoOpts))
        .pipe(glp.rename('style.min.css'))
        .pipe(gulp.dest(config.paths.css));
});

gulp.task('copy-require-main-js', () => {
    return gulp.src(`${config.paths.typescript}config/main.js`)
    .pipe(gulp.dest(config.paths.js));
});

gulp.task('tsconfig', function () {
    var tsConfig = glp.tsconfig(config.gulp.tsConfigJson);

    return gulp.src([config.paths.typescript + "**/*.ts"])
        .pipe(tsConfig())
        .pipe(gulp.dest('./'));
});

gulp.task('ts-compile', ['tsconfig'], function () {
    var ts = glp.typescript;
    var tsProject = ts.createProject('./tsconfig.json');

    return tsProject.src()
        .pipe(ts(tsProject)).js
        .pipe(gulp.dest(`${config.paths.js}`));
});

gulp.task('minify-js', ['js-compile'], () => {
    return gulp.src(`${config.paths.js}app.js`)
        .pipe(glp.minify(config.gulp.minifyOpts))
        .pipe(gulp.dest(config.paths.js));
});

gulp.task('default', ['minify-css', 'copy-require-main-js', 'ts-compile']);