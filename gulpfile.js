var gulp        = require('gulp'),
    $           = require('gulp-load-plugins')(),
    argv        = require('yargs').argv,
    browserify  = require('browserify'),
    browserSync = require('browser-sync'),
    del         = require('del'),
    minifyCSS   = require('gulp-minify-css'),
    path        = require('path'),
    plumber     = require('gulp-plumber'),
    reload      = browserSync.reload,
    sourcemaps  = require('gulp-sourcemaps'),
    through2    = require('through2'),
    watch       = require('gulp-watch'),
    gulpif      = require('gulp-if'),
    sprity      = require('sprity');

gulp.task('sprites', function () {
  return sprity.src({
    src: ['./src/images/icons/**/*.png'],
    style: './_icon.less',
    cssPath: '../images/icons',
    split: true,
    margin: 0,
    name: 'icon',
    processor: 'less',
    prefix: ''
  })
  .pipe(gulpif('*.png', gulp.dest('./src/images/icons'), gulp.dest('./src/styles/')));
});

gulp.task('vendor:js', function() {
  return gulp.src('bower_components/jquery/dist/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('src/scripts/vendor'));
});
gulp.task('vendor:lesslib', function() {
  return gulp.src(['bower_components/lesshat/build/lesshat.less',])
    .pipe(plumber())
    .pipe(gulp.dest('src/styles/lib'));
});
gulp.task('vendor:lessgrid', function() {
  return gulp.src(['bower_components/Responsable-Grid-System/less/responsable.less',])
    .pipe(plumber())
    .pipe(gulp.dest('src/styles/lib'));
});
gulp.task('vendor:lessreset', function() {
  return gulp.src(['bower_components/css-reset-less/css-reset.less',])
    .pipe(plumber())
    .pipe(gulp.dest('src/styles/lib'));
});

gulp.task('vendor', ['vendor:js', 'vendor:lesslib', 'vendor:lessgrid']);

gulp.task('browser-sync', function() {
  browserSync({
    open: !!argv.open,
    notify: !!argv.notify,
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('styles', function() {
  var hidden_files = '**/_*.*';
  var ignored_files = '!'+hidden_files;
  return gulp.src(['src/styles/*.less', ignored_files])
    .pipe($.less({
      paths: [
      'bower_components/lesshat/build/',
      'bower_components/Responsable-Grid-System/less/',
      'bower_components/css-reset-less/',
      'src/styles/'
      ]
    })
    .on('error', $.util.log))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/stylesheets/'));
});

gulp.task('js', function() {
  var appFile = gulp.src('./src/scripts/navigation.js')
    .pipe( $.rename('app.js'))
    .pipe( gulp.dest('dist/scripts/'));

  var appFile = gulp.src('./src/scripts/contactus.js')
    .pipe( gulp.dest('dist/scripts/'));

  var appFile = gulp.src('./src/scripts/fixed.js')
    .pipe( gulp.dest('dist/scripts/'));

  var vendorFile = gulp.src('src/scripts/vendor/**/*')
    .pipe( gulp.dest('dist/scripts/vendor'));
});

gulp.task('clean', function(cb) {
  del('./dist', cb);
});

gulp.task('images', function() {
  return gulp.src('./src/images/**/*')
    .pipe($.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/images'))
})

gulp.task('templates', function() {
  return gulp.src('src/views/**/!(_)*.jade')
    .pipe($.plumber())
    .pipe($.jade({
      pretty: true
    }))
    .pipe( gulp.dest('dist/') )
});

gulp.task('build', ['styles', 'js', 'templates', 'images']);

gulp.task('serve', ['build', 'browser-sync'], function () {
  gulp.watch('src/styles/**/*.less', ['styles', reload]);
  gulp.watch('src/scripts/**/*.js',['js', reload]);
  gulp.watch('src/images/**/*',['images', reload]);
  gulp.watch('src/views/**/*.jade',['templates', reload]);
});

gulp.task('default', ['serve']);
