'use strict';

// GULP
var gulp = require('gulp');

// PLUGINS
//js
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
//css
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
//img
var imagemin = require('gulp-imagemin');
//html
var cdnizer = require("gulp-cdnizer");
var minifyHTML = require('gulp-minify-html');
//server
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
//utils
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');


//Clean folders before tasks
gulp.task('clean', function() {
    return gulp.src(['dist/*'], {
            read: false
        })
        .pipe(clean());
});

//Lint Javascript
gulp.task('lintjs', function() {
    return gulp.src('src/js/app/**/*.js')
        .pipe(jshint({
            "browserify": true
        }))
        .pipe(jshint.reporter('default'));
});

//Browserify and Minify Javascript
gulp.task('bundlejs', function() {
    return gulp.src('src/js/app/app.js')
        .pipe(browserify())
        .pipe(rename(function(path) {
            path.basename = "bundle";
        }))
        .pipe(gulp.dest('src/js')) //bundles at source
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

//Compile Sass to CSS and Minify
gulp.task('css', function() {
    return gulp.src('src/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css')) //saves at source
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'ie >= 9', ],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());

});

//Minify images
gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(livereload());
});

//Replaces local links with CDNs and minify html
gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(cdnizer([{
            file: 'angular/angular.js',
            package: 'angular',
            cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular.min.js'
        }, {
            file: 'angular-route/angular-route.js',
            package: 'angular-route',
            cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-route.min.js'
        }, {
            file: 'angular-animate/angular-animate.js',
            package: 'angular-animate',
            cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular-animate.min.js'
        }, {
            file: 'ng-file-upload/ng-file-upload.js',
            package: 'ng-file-upload',
            cdn: 'https://cdnjs.cloudflare.com/ajax/libs/danialfarid-angular-file-upload/${ version }/ng-file-upload.min.js'
        }, {
            file: 'bootstrap/dist/css/bootstrap.css',
            package: 'bootstrap',
            cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/${ version }/css/bootstrap.min.css'
        }, {
            file: 'angular-bootstrap/ui-bootstrap-tpls.js',
            package: 'angular-bootstrap',
            cdn: 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/${ version }/ui-bootstrap-tpls.min.js'
        }, {
            file: 'css/style.css',
            cdn: 'css/style.min.css'
        }, {
            file: 'js/bundle.js',
            cdn: 'js/bundle.min.js'
        }]))
        .pipe(minifyHTML())
        .pipe(gulp.dest("dist"))
        .pipe(livereload());

});

//Watches Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/js/app/**/*.js', ['lintjs', 'bundlejs']);
    gulp.watch('src/scss/**/*.scss', ['css']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/img/**/*', ['img']);
});

//Node server start
gulp.task('server', function() {
    nodemon({
        script: 'server.js'
    });
});

// Default Task
gulp.task('default', function() {
    runSequence('clean', 'lintjs', 'bundlejs', 'css', 'html', 'img', 'watch', 'server');
});