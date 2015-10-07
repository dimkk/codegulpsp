var gulp = require('gulp'), //подключаем необходимые зависимости
	sourcemaps = require('gulp-sourcemaps'),
  spsave = require('gulp-spsave'),
	concat = require('gulp-concat'),
  config = require('./gulpfile.conf'),
  uglify = require('gulp-uglify'),
  del = require('del');
	
gulp.task('src', function () { //Задача сборки исходников
  return gulp.src(['./src/**/*.js']) //возьмём все файлы js в папке src и подпапках
    .pipe(sourcemaps.init()) //старт записи sourcemaps
    .pipe(concat('myapp.js')) //собираем файлы в 1
    .pipe(uglify()) //минифицируем
    .pipe(sourcemaps.write()) //пишем sourcemaps
    .pipe(gulp.dest('./dist')) //возвращаем результат в dist
});

gulp.task('other', function () { //задача копирования остальных файлов из папки src
  return gulp.src(['!./src/**/*.js', './src/**/*'])
    .pipe(gulp.dest('./dist'))
});

gulp.task('clean', function(){ //стирает содержимое папки dist
  return del(['./dist/**/*']);
});

gulp.task("copyToSharePoint", ["clean", "src", "other"], function () { //Задача сборки и копирования файлов в SharePoint
  return gulp.src("./dist/**/*")
    .pipe(spsave({ //плагин позволяющий авторизовываться и записывать файлы в SharePoint - тут представлена версия для SharePoint online
      username: config.username, //если нужно on premise - посмотрите пример из документации к spsave - https://github.com/s-KaiNet/spsave#samples
      password: config.password, //сюда соответственно подставляем свои логин и пароль
      siteUrl: config.siteUrl,
      folder: config.folder
    }));
});

gulp.task('watch', function() { 
  gulp.watch('./src/**/*', ['copyToSharePoint']); //при изменении файлов в src будет запускать copyToSharePoint
});