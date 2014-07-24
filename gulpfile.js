var gulp = require('gulp');
var compiler = require('gulp-onejs-compiler');
var tsc = require('gulp-tsc');
var clean = require('gulp-clean');
var rjs = require('requirejs');
var flatten = require('gulp-flatten');
var uglify = require('gulp-uglifyjs');
var add = require('gulp-add-src');
var less = require('gulp-less');
var cssMinify = require('gulp-minify-css');
var csstojs = require('gulp-csstojs');
var filter = require('gulp-filter');


var paths = {
    tempPath: 'temp',
    appPath: 'app'
};

gulp.task('clean', function() {
    return gulp.src([paths.tempPath, paths.appPath])
        .pipe(clean());
});

gulp.task('tsc-preprocess', ['clean'], function() {
    var lessFilter = filter('**/*.less');

    return gulp.src(['node_modules/onejs/src/**/*', 'src/**/*' ])
        .pipe(flatten())
        .pipe(compiler())
        .pipe(lessFilter)
        .pipe(less())
        .pipe(cssMinify())
        .pipe(csstojs({
            typeScript: true
        }))
        .pipe(lessFilter.restore())
        .pipe(gulp.dest(paths.tempPath + '/ts'));
});


gulp.task('tsc', ['tsc-preprocess'], function() {
    return gulp.src(paths.tempPath + '/ts/**/*.ts')
        .pipe(tsc({
            module: 'amd'
        }))
        .pipe(gulp.dest(paths.appPath));
});

gulp.task('rjs', ['tsc'], function(cb) {
    rjs.optimize({
        baseUrl: paths.tempPath + '/preMerge',
        dir: paths.appPath,
        optimize: '',
        modules: [{
            name: 'main'
        }]
    }, function(buildResponse) {
        console.log(buildResponse);
        cb();
    }, cb);
});

gulp.task('minify', ['rjs'], function() {
    return gulp.src([paths.appPath + '/main.js'])
        .pipe(uglify())
        .pipe(gulp.dest(paths.appPath));
});

gulp.task('copy-static-files', ['clean', 'tsc'], function() {
    return gulp.src(['node_modules/requirejs/require.js'])
        .pipe(uglify())
        .pipe(gulp.dest(paths.appPath));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['default']);
});

gulp.task('default', ['tsc', 'copy-static-files']);