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
let devTask = function () {
    browserSync.init({
        server: {
            baseDir: `./dev/html`, // Corrected baseDir
        },
    });

    gulp.watch(`./dev/css/style.css`, gulp.series(`lint-css`));
    gulp.watch(`./dev/js/app.js`, gulp.series(`lint-js`));
    gulp.watch(`./dev/html/index.html`).on(`change`, browserSync.reload);
};
gulp.task(`dev`, devTask);

// CSS Lint Task
let lintCssTask = function () {
    return gulp.src(`./dev/css/style.css`)
        .pipe(stylelint({
            reporters: [
                { formatter: `string`, console: true }
            ]
        }));
};
gulp.task(`lint-css`, lintCssTask);

// JavaScript Lint Task
let lintJsTask = function () {
    return gulp.src(`./dev/js/app.js`)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};
gulp.task(`lint-js`, lintJsTask);

// Production Task
let buildTask = function () {
    return gulp.src(`./dev/js/app.js`)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [`@babel/preset-env`]
        }))
        .pipe(uglify())
        .pipe(rename({ suffix: `.min` }))
        .pipe(sourcemaps.write(`.`))
        .pipe(gulp.dest(`./prod/js`));
};
gulp.task(`build`, buildTask);

// CSS Production Task
let buildCssTask = function () {
    return gulp.src(`./dev/css/style.css`)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({ suffix: `.min` }))
        .pipe(gulp.dest(`./prod/css`));
};
gulp.task(`build-css`, buildCssTask);

// Copy HTML Task
let copyHtmlTask = function () {
    return gulp.src(`./dev/html/index.html`)
        .pipe(gulp.dest(`./prod`));
};
gulp.task(`copy-html`, copyHtmlTask);

// Default Task
gulp.task(`default`, gulp.series(`dev`));

// Production Build Task
gulp.task(`prod`, gulp.parallel(`build`, `build-css`, `copy-html`));
