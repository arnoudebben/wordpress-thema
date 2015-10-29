var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var minifyCss = require('gulp-minify-css');
var plumber = require('gulp-plumber');
 
gulp.task('scss', function () {
    gulp.src('scss/*.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .on('error', onError)
        .pipe(gulp.dest('css'));
});
 
gulp.task('php', function () {
    return gulp.src('*.php')
        .pipe(browserSync.reload({stream: true}));
});
 
gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css"], {
        proxy: 'localhost/stageverslag'
    });
});
 
gulp.task('default', ['scss', 'browser-sync'], function () {
    gulp.watch("scss/*.scss", ['scss']);
    gulp.watch("*.php", ['php']);
});
 
function onError(err) {
    // console.log(err);
    gutil.log(err);
    this.emit('end');
}