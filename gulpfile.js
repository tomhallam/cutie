const gulp          = require('gulp');
const sass          = require('gulp-sass');
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const concat 		    = require('gulp-concat');
const ngAnnotate    = require('gulp-ng-annotate');
const uglify        = require('gulp-uglify');
const uglifyCss     = require('gulp-uglifycss');
const templateCache = require('gulp-angular-templatecache');
const gulpIf        = require('gulp-if');

gulp.task('default', [ 'build', 'watch' ]);
gulp.task('build', [ 'images', 'sass', 'js:vendor', 'js:app', 'views', 'index' ]);

gulp.task('images', function( done ) {

  gulp.src('./src/img/**/*.*')
      .pipe(gulp.dest('./dist/img'));

  return done();

});

gulp.task('index', function( done ) {

  gulp.src('./src/index.html')
      .pipe(gulp.dest('./dist'));

  return done();

});

gulp.task('sass', function( done ) {

  gulp.src('./src/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulpIf(process.env.NODE_ENV === 'production', uglifyCss()))
      .pipe(gulp.dest('./dist/css'));

  return done();

});

gulp.task('js:vendor', function( done ) {

  var vendorFiles = [
    './node_modules/angular/angular.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js'
  ];

  gulp.src( vendorFiles )
      .pipe(concat('vendor.js'))
      .pipe(ngAnnotate())
      .pipe(gulpIf(process.env.NODE_ENV === 'production', uglify()))
      .pipe(gulp.dest('./dist/js'));

  return done();

});

gulp.task('fonts', function( done ) {

  gulp.src( './src/fonts/**/*.*' )
      .pipe(gulp.dest('./dist/fonts'));

  return done();

});

gulp.task('js:app', function( done ) {

  var appFiles = [
    './src/**/*.js'
  ];

  gulp.src( appFiles )
      .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      .pipe(gulpIf(process.env.NODE_ENV === 'production', uglify({preserveComments: 'licence'})))
      .pipe(gulp.dest('./dist/js'));

  return done();

});

gulp.task('views', function( done ) {

  // TemplateCache Options
  var tcOpts = {
    fileName: 'templates.js',
    module: require('./package.json').name
  };

  gulp.src(['./src/views/**/*.html'])
      //.pipe(minifyHTML(opts))
      .pipe(templateCache(tcOpts))
      .pipe(ngAnnotate())
      .pipe(uglify({preserveComments: 'licence'}))
      .pipe(gulp.dest('./dist/js'));

  return done();

});

gulp.task('watch', function( done ) {
  gulp.watch('./src/scss/**/*.scss',  ['sass']);
  gulp.watch('./src/**/*.js',     ['js:app']);
  gulp.watch('./src/views/**/*.html', ['views']);
  gulp.watch('./src/index.html', ['index']);
});
