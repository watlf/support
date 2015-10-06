var gulp = require('gulp');
var sass = require('gulp-sass');
var copy = require('gulp-copy');
var concat = require('gulp-concat');

gulp.task('default', ['css', 'js', 'angular', 'adminHtml', 'adminJs']);

var config = {
    components: './node_modules',
    resources: './resources/assets',
    publicDir: './public'
};

gulp.task('css', function() {
    return gulp.src('./resources/assets/css/app.css')
        .pipe(sass({includePaths:[config.components + '/bootstrap-sass/assets/stylesheets']}))
        .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('js', function() {
    return gulp.src([
            config.components + '/jquery/dist/jquery.js',
            config.components + '/bootstrap-sass/assets/javascripts/bootstrap.js',
            config.resources + '/js/scroll.js',
            config.resources + '/js/index.js'
        ]).pipe(concat('all.js'))
        //.pipe(minify())
        .pipe(gulp.dest(config.publicDir + '/js'));
});

/**
 * For admin panel
 */
gulp.task('angular', function() {
    return gulp.src([
           config.components + '/angular/angular.js',
           config.components + '/angular-route/angular-route.js',
           config.components + '/angular-ui-router/release/angular-ui-router.js'
        ]).pipe(concat('angular.js'))
        //.pipe(minify())
        .pipe(gulp.dest(config.publicDir + '/assets/admin/js'));
});

gulp.task('adminHtml', function() {
    return gulp.src('./resources/admin/angular/app/**/*.html')
        .pipe(gulp.dest(config.publicDir + '/assets/admin/views'));
});

gulp.task('adminJs', function() {
    return gulp.src([
        './resources/admin/angular/app/**/*.js',
        './resources/admin/angular/*.js'
        ]).pipe(concat('all.js'))
        .pipe(gulp.dest(config.publicDir + '/assets/admin/js'));
});