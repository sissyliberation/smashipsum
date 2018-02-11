var gulp     = require('gulp');
var concat   = require('gulp-concat');
var uglify   = require('gulp-uglify');
var prefix   = require('gulp-autoprefixer');
var sass     = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename   = require('gulp-rename');

var sassdir = 'scss/**/*.scss';
var cssdest = 'css/';

process.env.NODE_ENV === 'production' ? 'production' : 'development';

gulp.task('styles', function(){
  gulp.src(sassdir)
  .pipe(sass().on('error', sass.logError))
  .pipe(prefix('last 2 versions'))
  .pipe(concat('style.css'))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(cssdest));
});

gulp.task('default', function() {
  gulp.start('styles')

  if (process.env.NODE_ENV !== "production") {
    gulp.watch(sassdir, ['styles']);
  }  
});