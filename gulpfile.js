'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');

const reload = browserSync.reload;

// Compile sass files to css
gulp.task('sass', function () {
  return gulp.src('./assets/css/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 15 versions'],
        cascade: true
    }))
    .pipe(gulp.dest('./site/css'))
    .pipe(browserSync.reload({stream:true}))
});

// Compile pug files to html
gulp.task('pug', function () {
  return gulp.src('./assets/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./assets'));
});

// Rename js files
gulp.task('js', function () {
   gulp.src("./assets/js/function.js")
     .pipe(rename("js/function.js"))
     .pipe(gulp.dest("./site"));
});

// Static server
gulp.task('browser-sync', ['sass', 'pug', 'js'], function() {
    browserSync.init({
        server: {
            baseDir: "./site"
        }
    });
});

// Watchfiles compiling
gulp.task('watch', function () {
  gulp.watch('./assets/css/**/*.scss', ['sass']);
  gulp.watch('./assets/pug/*.pug', ['pug']);
  gulp.watch('./site/*.html').on('change', reload);
  gulp.watch('./assets/js/*.js', ['js']);
  gulp.watch('./site/js/*.js').on('change', reload);
});

gulp.task('default', ['watch', 'browser-sync']);
