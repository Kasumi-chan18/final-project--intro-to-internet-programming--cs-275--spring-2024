const gulp = require
('gulp');
const clean = require('gulp-clean');

//Clean task to remove 'prod' folder
gulp.task('clean', function () {
    return gulp.src('prod', { read: false, allowEmpty: true })
        .pipe(clean());
});

// Copy HTML task
gulp.task('html', function () {
    return gulp.src('dev/html/index.html')
        .pipe(gulp.dest('prod'))
});

// Copy CSS task
gulp.task('css', function () {
    return gulp.src('dev/css/*.css')
        .pipe(gulp.dest('prod/css'))
});

// Copy JS task
gulp.task('js', function () {
    return gulp.src('dev/js/*.js')
        .pipe(gulp.dest('prod/js'))
});

// Default task for development
gulp.task('default', gulp.series('html', 'css', 'js'));

// Production build tasks
gulp.task
('build', gulp.series('clean', 'default'));
