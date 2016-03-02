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
    watch       = require('gulp-watch');


gulp.task('vendor:js', function() {
  return gulp.src('bower_components/jquery/dist/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('src/scripts/vendor'));
});
gulp.task('vendor:lesslib', function() {
  return gulp.src('bower_components/lesshat/build/lesshat.less')
    .pipe(plumber())
    .pipe(gulp.dest('src/styles/lib'));
});
gulp.task('vendor:lessframework', function() {
  return gulp.src('bower_components/kube/less/*')
    .pipe(plumber())
    .pipe(gulp.dest('src/styles/framework'));
});
gulp.task('vendor', ['vendor:js', 'vendor:lesslib']);

gulp.task('browser-sync', function() {
  browserSync({
    open: !!argv.open,
    notify: !!argv.notify,
    server: {
      baseDir: "./dist"
    }
  });
});

// gulp.task('sprite', function() {
//   var spriteData =
//       gulp.src('.src/images/icons/icon-24/*.*')
//         .pipe(spritesmith({
//             imgName     : 'sprite.png',
//             cssName     : 'sprite.less',
//             cssFormat   : 'less'
//         }));

//   spriteData.img.pipe(gulp.dest('./src/images/'));
//   spriteData.css.pipe(gulp.dest('./src/styles/'));
// });

gulp.task('styles', function() {
  return gulp.src('src/styles/main.less')
    .pipe($.less({
      paths: ['bower_components/lesshat/build/','bower_components/css-reset-less/','src/styles/']
    })
    .on('error', $.util.log))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/stylesheets/'));
});

gulp.task('js', function() {
  var appFile = gulp.src('src/scripts/*.js')
    .pipe($.plumber())
    .pipe(through2.obj(function (file, enc, next) {
      browserify(file.path, { debug: true })
        .transform(require('babelify'))
        .transform(require('debowerify'))
        .bundle(function (err, res) {
          if (err) { return next(err); }
          file.contents = res;
            next(null, file);
        });
      }))
      .on('error', function (error) {
        console.log(error.stack);
        this.emit('end')
    })
    .pipe( $.rename('app.js'))
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
  return gulp.src('src/views/*.jade')
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
