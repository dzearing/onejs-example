var gulp = require('gulp');
var compiler = require('gulp-onejs-compiler');
var tsc = require('gulp-tsc');
var clean = require('gulp-clean');
var rjs = require('requirejs');
var flatten = require('gulp-flatten');
var uglify = require('gulp-uglifyjs');
var add = require('gulp-add-src');

gulp.task('clean', function() {
    return gulp.src(['temp', 'dist'])
        .pipe(clean());
});

gulp.task('prep-tsc', ['clean'], function() {
    return gulp.src('src/**/*')
        .pipe(compiler())
        .pipe(flatten())
        .pipe(gulp.dest('temp/ts'));
});

gulp.task('tsc-deps', ['clean'], function() {
    return gulp.src([
        'node_modules/onejs/src/*.ts'
        ])
        .pipe(gulp.dest('temp/ts'));
});

gulp.task('page-deps', ['clean', 'tsc'], function() {
    return gulp.src(['node_modules/requirejs/require.js'])
        .pipe(uglify())
        .pipe(add('pages/*.html'))
        .pipe(gulp.dest('dist'));
});

gulp.task('tsc', ['prep-tsc', 'tsc-deps', 'clean'], function() {
    return gulp.src('temp/ts/**/*.ts')
        .pipe(tsc({
            module: 'amd'
        }))
        .pipe(gulp.dest('temp/preMerge'));
});

gulp.task('rjs', ['tsc'], function(cb) {
    rjs.optimize({
        baseUrl: 'temp/preMerge',
        dir: 'dist',
        optimize: '',
        modules: [{
            name: 'main'
        }]
    }, function(buildResponse) {
        console.log(buildResponse);
        cb();
    }, cb);
});

gulp.task('minify', ['rjs', 'page-deps'], function() {
    return gulp.src(['dist/main.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
})

gulp.task('default', ['minify', 'page-deps']);