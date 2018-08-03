// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    terser = require('gulp-terser');
    concat = require('gulp-concat'),
    shell = require('gulp-shell'),
    pump = require('pump'),
    gulpif = require('gulp-if'),
    rename = require("gulp-rename"),
    runSequence = require("run-sequence");
    del = require('del'),
    browserSync = require('browser-sync').create(),
    //svgSymbols = require('gulp-svg-symbols'),

    browserSync = require('browser-sync').create(),
    //configurate
    appDefaults = {
      myProxy: "http://cssfiltergenerator.lvh.me",
      javascriptDir : [
        //'../node_modules/jquery/dist/jquery.min.js',
        '../node_modules/handlebars/dist/handlebars.min.js',
        '../node_modules/jsurl/lib/jsurl.js',
        '../js/source/modernizr-custom.js',
        '../node_modules/sortablejs/Sortable.min.js',
        '../node_modules/spectrum-colorpicker/spectrum.js',
        '../js/es6/control-sort.js',
        '../js/es6/model-defaults.js',
        '../js/es6/model-data.js',
        '../js/es6/mustache-template.js',
        '../js/es6/ui-colorpicker.js',
        '../js/es6/ui-sortable.js',
        '../js/es6/ui-gradient.js',
        '../js/es6/events-click.js',
        '../js/es6/events-resets.js',
        '../js/es6/events-changes.js',
        '../js/es6/control-datastorage.js',
        '../js/es6/model-urlshare.js'],
      javascriptDirDestination : "../js/",
      javascriptUglify : "../js/app.js",
      stylesDir : "../scss/", // path to styles
      stylesDirDest : "../css/",
      watchHTML : "../../**/*.html",
      watchJavascript : "../js/**/*.js"
    }

// Styles
gulp.task('sass', function() {
  return gulp.src(appDefaults.stylesDir+'**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(appDefaults.stylesDirDest))
    .pipe(autoprefixer('last 2 version', 'safari 9', 'ie 9', 'opera 12.1', 'ios 9', 'android 4'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(cleanCSS({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      }))
    .pipe(sourcemaps.write(appDefaults.stylesDirDest))
    .pipe(gulp.dest(appDefaults.stylesDirDest))
    .pipe(browserSync.stream());
    //.pipe(notify({ message: 'Styles task complete' }))
});

//Concat scripts
gulp.task('scripts', function() {
  return gulp.src(appDefaults.javascriptDir)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(appDefaults.javascriptDirDestination));
});



gulp.task("terser", function () {
  return gulp.src(appDefaults.javascriptUglify)
    .pipe(terser({
      compress: true,
      warnings: true,
      ecma: 6
    }))
    .pipe(gulp.dest(appDefaults.javascriptDirDestination))
});

/*
gulp.task('create-svg', function () {
  return gulp.src('../images-2017/icons/*.svg')
    .pipe(svgSymbols())
    .pipe(gulpif(['*.css'], gulp.dest('../images-2017/symbols/') ))
    .pipe(gulpif(['*.svg'],  gulp.dest('../../system/expressionengine/templates/default_site/includes.group/') ))
    gulp.run('rename-svg');
});
*/
gulp.task('rename-svg', function () {
  return gulp.src("../../system/expressionengine/templates/default_site/includes.group/svg-symbols.svg")
  .pipe(rename("_svg-symbols.html"))
  .pipe(gulp.dest("../../system/expressionengine/templates/default_site/includes.group/")); // ./dist/main/text/ciao/goodbye.md
});

gulp.task('delete-svg', function () {
  return del(['../../system/expressionengine/templates/default_site/includes.group/svg-symbols.svg'], { force: true });
});

/*
gulp.task("svgold", function () {
  gulp.run('create-svg');
  gulp.run('rename-svg');
  gulp.run('delete-svg');
})

gulp.task('svg', function(callback) {
  runSequence('create-svg', 'rename-svg', 'delete-svg',callback);
});
*/

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        proxy: appDefaults.myProxy
    });
});
gulp.task('kss', shell.task(['./node_modules/.bin/kss --config kss-config.json']));

// Watch
gulp.task('default',['serve'], function() {
  // Watch .scss files
  gulp.watch(appDefaults.stylesDir+'**/*.scss', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('sass');
    //gulp.run('kss');
  });
  gulp.watch(appDefaults.javascriptDir , function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('scripts');
    gulp.run('terser');
  });
  gulp.watch(appDefaults.watchJavascript).on('change', browserSync.reload);
  gulp.watch(appDefaults.watchHTML).on('change', browserSync.reload);
});


gulp.task('styleguide',['serve'], function() {
  // Watch .scss files
  gulp.watch(appDefaults.stylesDir+'**/*.scss', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('sass');
    gulp.run('kss');
  });
  gulp.watch(appDefaults.javascriptDir , function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('scripts');
    gulp.run('terser');
  });
  gulp.watch(appDefaults.watchJavascript).on('change', browserSync.reload);
  gulp.watch(appDefaults.watchHTML).on('change', browserSync.reload);
});
