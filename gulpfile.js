const gulp = require(`gulp`);
const babel = require(`gulp-babel`);
const terser = require(`gulp-terser`);
const eslint = require(`gulp-eslint`);
const rename = require(`gulp-rename`);
const del = require(`del`);

// Paths
const paths = {
    src: {
        js: `dev/js/app.js`,
        html: `dev/html/index.html`,
        css: `dev/css/style.css`
    },
    build: {
        js: `prod/js/`,
        html: `prod/`,
        css: `prod/css/`
    }
};

// Development Build
gulp.task(`dev:html`, () => {
    return gulp.src(paths.src.html)
        .pipe(gulp.dest(`prod`));
});

gulp.task(`dev:css`, () => {
    return gulp.src(paths.src.css)
        .pipe(gulp.dest(paths.build.css));
});

gulp.task(`dev:js`, () => {
    return gulp.src(paths.src.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(gulp.dest(paths.build.js));
});

gulp.task(`dev`, gulp.series(`dev:html`, `dev:css`, `dev:js`));

// Production Build
gulp.task(`clean`, () => {
    return del(`prod`);
});

gulp.task(`build:html`, () => {
    return gulp.src(paths.src.html)
        .pipe(gulp.dest(`prod`));
});

gulp.task(`build:css`, () => {
    return gulp.src(paths.src.css)
        .pipe(gulp.dest(paths.build.css));
});

gulp.task(`build:js`, () => {
    return gulp.src(paths.src.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(babel())
        .pipe(terser())
        .pipe(rename({ suffix: `.min` }))
        .pipe(gulp.dest(paths.build.js));
});

gulp.task(`build`, gulp.series(`clean`, `build:html`, `build:css`, `build:js`));

// Default task
gulp.task(`default`, gulp.series(`dev`));
