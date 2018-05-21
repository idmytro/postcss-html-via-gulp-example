const gulp = require('gulp');
const gulpChange = require('gulp-change');

const postcss = require('postcss');
const syntax = require('postcss-html')({
	css: require('postcss-safe-parser')
});
const plugins = [
    require('postcss-custom-properties')({ preserve: false }),
];

function performChange(content, done) {
    postcss(plugins).process(content, { syntax: syntax, from: null }).then(function (result) {
        done(null, result.content);
    });
}

gulp.task('default', function () {
    return gulp.src('src/*.html')
        .pipe(gulpChange(performChange))
        .pipe(gulp.dest('dist/'));
});
