var gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
  spsave = require('gulp-spsave'),
	concat = require('gulp-concat'),
  config = require('./gulpfile.conf'),
  uglify = require('gulp-uglify'),
  del = require('del');
	
gulp.task('src', function () {
  return gulp.src(['./src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('myapp.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
});

gulp.task('other', function () {
  return gulp.src(['!./src/**/*.js', './src/**/*'])
    .pipe(gulp.dest('./dist'))
});

gulp.task('clean', function(){
  return del(['./dist/**/*']);
});

gulp.task("copyToSharePoint", ["clean", "src", "other"], function () {
  return gulp.src("./dist/**/*")
    .pipe(spsave({
      username: config.username,
      password: config.password,
      siteUrl: config.siteUrl,
      folder: config.folder
    }));
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*', ['copyToSharePoint']);
});