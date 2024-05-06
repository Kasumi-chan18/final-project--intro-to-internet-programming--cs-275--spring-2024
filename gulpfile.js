const gulp = require(`gulp`);
const babel = require(`gulp-babel`);
const eslint = require(`gulp-eslint`);
const rename = require(`gulp-rename`);
const sourcemaps = require(`gulp-sourcemaps`);
const stylelint = require(`gulp-stylelint`);
const uglify = require(`gulp-uglify`);
const browserSync = require(`browser-sync`).create();
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const cssnano = require(`cssnano`);

// Development Task
gulp.task(`dev`, function () {
    browserSync.init({
        server: {
            baseDir: `./dev`,
        },
    });

    gulp.watch(`./dev/css/*.css`, gulp.series(`lint-css`));
    gulp.watch(`./dev/js/*.js`, gulp.series(`lint-js`));
    gulp.watch(`./dev/html/*.html`).on(`change`, browserSync.reload);
});

// CSS Lint Task
gulp.task(`lint-css`, function () {
    return gulp.src(`./dev/css/*.css`)
        .pipe(stylelint({
            reporters: [
                { formatter: `string`, console: true }
            ]
        }));
});

// JavaScript Lint Task
gulp.task(`lint-js`, function () {
    return gulp.src(`./dev/js/*.js`)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Production Task
gulp.task(`build`, function () {
    return gulp.src(`./dev/js/*.js`)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [`@babel/preset-env`]
        }))
        .pipe(uglify())
        .pipe(rename({ suffix: `.min` }))
        .pipe(sourcemaps.write(`.`))
        .pipe(gulp.dest(`./prod/js`));
});

// CSS Production Task
gulp.task(`build-css`, function () {
    return gulp.src(`./dev/css/*.css`)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({ suffix: `.min` }))
        .pipe(gulp.dest(`./prod/css`));
});

// Copy HTML Task
gulp.task(`copy-html`, function () {
    return gulp.src(`./dev/html/*.html`)
        .pipe(gulp.dest(`./prod`));
});

// Default Task
gulp.task(`default`, gulp.series(`dev`));

// Production Build Task
gulp.task(`prod`, gulp.parallel(`build`, `build-css`, `copy-html`));
