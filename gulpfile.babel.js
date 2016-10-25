// Dependencies
import gulp from 'gulp';
import requireDir from 'require-dir';
import runSequence from 'run-sequence';
import livereload from 'gulp-livereload';
import connect from 'gulp-connect';
import pkg from './package.json';
const dirs = pkg['config'].directories;

// Include tasks/ folder
requireDir('./tasks', { recurse: true });

// Tasks
gulp.task('build', () => {
	global.production = false;
	runSequence("html", "js");
});

gulp.task('production', () => {
    global.production = true;
    runSequence("html", "js");
});

// Watcher
gulp.task('watch', () => {
    gulp.watch(`${dirs.src}/js/**/*.js`, ["js"]);
});

// Server
gulp.task('connect', () => {
    connect.server({
        root: dirs.dist,
        livereload: true,
		port: 8888
    });
});

gulp.task('default', ['build', 'watch', 'connect']);
gulp.task('start', ['watch', 'connect']);