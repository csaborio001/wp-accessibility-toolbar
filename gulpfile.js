const gulp    = require("gulp"),
sass          = require("gulp-sass"),
uglify        = require('gulp-uglify'),
rename        = require('gulp-rename'),
imagemin        = require('gulp-imagemin'),
sourcemaps    = require("gulp-sourcemaps"),
browserSync   = require("browser-sync").create(),
source        = "./process/",
dest          = "./dist/"
sass.compiler = require("node-sass");


function php() {
  return gulp.src( ["./scorpiotek-accessibility.php", "./src/**/*.php"]);
}

function js() {
  return gulp
  .src(source + "/scripts/*.js")
  // .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(dest + "scripts"));
}

function styles() {
  return gulp
	.src(source + "/sass/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(gulp.dest(dest + "css"));
}

function images() {
  return gulp
  .src(source + "/img/**/*.*")
  .pipe(imagemin())
  .pipe(gulp.dest(dest + "img"));
}

function watch() {

  // Processes the JS files inside process/scripts and sends minimized output to dist/scripts.
  gulp.watch(source + "scripts/**/*.js", js).on("change", browserSync.reload);
  // Processes the SASS files inside process/sass and sends minimized output to dist/css.
  gulp.watch(source + "sass/**/*", styles).on("change", browserSync.reload);
  // Processes any image that is modified.
  gulp.watch(source + "img/**/*", images).on("change", browserSync.reload);
  // Keeps a lookout for files that could have changed inside the src folder.
  gulp.watch(["./scorpiotek-accessibility.php", "./src/**/*.php"], php).on("change", browserSync.reload);

}

function server() {
  browserSync.init({
	notify: false,
	browser: "firefox developer edition",
	proxy: "http://localhost:49191",
	port:80,
  });
  watch();
}

var build = gulp.series(gulp.parallel(js, styles, php), server );

gulp.task("default", build);
