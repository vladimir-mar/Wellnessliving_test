const { src, dest, watch, parallel } = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create();

function styles(){
    return src('./css/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({level: 2}))
        .pipe(dest('./css'))
        .pipe(browserSync.stream());
};

function watchs(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch('./css/scss/*.scss', styles);
    watch('./js/*.js').on('change', browserSync.reload);
    watch('./*.html').on('change', browserSync.reload);
};

exports.default = parallel(watchs, styles);