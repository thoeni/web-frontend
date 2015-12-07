var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var del = require('del');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');

//  The following address can be used to quickly run the application
//  with the 'gulp run' command, and link it to an already running
//  backend instance
var BACKEND_ENDPOINT = 'http://192.168.99.100:8080';

gulp.task('connect', ['clean', 'default'], function() {
    connect.server({
        root: ['./release/'],
        livereload: true,
        middleware: function(connect, opt) {
            return [
                proxy('/api', {
                    target: BACKEND_ENDPOINT,
                    changeOrigin:true
                })
            ]
        }

    });
});

gulp.task('reloadAll', ['buildOnly'], function () {
    gulp.src('./release/')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    return gulp.watch([
        'source/**/*'
    ], ['reloadAll']);
});

gulp.task('run', ['connect', 'watch']);

gulp.task('default', ['buildOnly']);

gulp.task('buildOnly', ['clean'], function () {
    gulp.start([
        'gen-html',
        'gen-js',
        'gen-lib-js',
        'gen-lib-css',
        'gen-css',
        'copy-static',
        'copy-fonts'
    ]);
});

gulp.task('start', function () {
    gulp.start([
        'gen-html',
        'gen-js',
        'gen-lib-js',
        'gen-lib-css',
        'gen-css',
        'copy-static',
        'copy-fonts'
    ]);
});

gulp.task('dev', ['clean', 'default'], function () {
    return gulp.watch([
        'source/**/*'
    ], ['default']);
});

gulp.task('gen-html', function () {
    return gulp.src([
        'source/head/head.html',
        'source/**/!(footer)*.html',
        'source/footer/footer.html'
    ])
        .pipe(concat('index.html'))
        .pipe(gulp.dest('release'))
});

gulp.task('gen-js', function () {
    return gulp.src([
        'source/app.js',
        'source/**/*.js'
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('release'))
});

gulp.task('gen-lib-js', function () {
    return gulp.src([
        'bower-components/jquery/dist/jquery.min.js',
        'bower-components/angular/angular.min.js',
        'bower-components/angular-ui-router/release/angular-ui-router.min.js',
        'bower-components/angular-bootstrap/ui-bootstrap.min.js',
        'bower-components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'bower-components/bootstrap/dist/js/bootstrap.min.js',
        'bower-components/angular-sanitize/angular-sanitize.min.js'
    ])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('release'))
});

gulp.task('gen-lib-css', function () {
   return gulp.src([
       'bower-components/bootstrap/dist/css/bootstrap.min.css'
   ])
       .pipe(concat('lib.css'))
       .pipe(gulp.dest('release'));
});

gulp.task('gen-css', function () {
    return gulp.src([
        'source/global/global.scss',
        'source/**/*.scss'
    ])
        .pipe(concat('app.scss'))
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('release'));
});

gulp.task('copy-static', function () {
    return gulp.src([
        'source/static/**/*'
    ])
        .pipe(gulp.dest('release/static'))
});

gulp.task('copy-fonts', function () {
    return gulp.src([
        'bower-components/bootstrap/dist/fonts/*'
        ])
        .pipe(gulp.dest('release/fonts/'))
});

gulp.task('clean', function (cb) {
    return del([
        'release'
    ], cb);
});