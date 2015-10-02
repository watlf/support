var gulp = require('gulp');
var sass = require('gulp-sass');
var copy = require('gulp-copy');
var concat = require('gulp-concat');

gulp.task('default', ['css', 'js']);

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
         //   config.components + '/angular/index.js',
         //   config.components + '/angular-route/index.js'
        ]).pipe(concat('all.js'))
        //.pipe(minify())
        .pipe(gulp.dest(config.publicDir + '/js'));
});