var gulp         = require('gulp'),
    notify       = require('gulp-notify'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    replace      = require('gulp-replace');

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('assets/sass/main.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('assets/css')) // Выгружаем результата в папку assets/css
        .pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});



gulp.task('cssnano', ['sass'], function() {
    return gulp.src('assets/css/main.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('assets/css')) // Выгружаем в папку assets/css
        .pipe(notify('Done!'));
});


gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: './' // Директория для сервера - assets
        },
        notify: false // Отключаем уведомления
    });
});




gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('assets/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('./*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('assets/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('default', ['sass' , 'watch', 'cssnano']);

