const gulp          = require("gulp"),
sass          = require("gulp-sass"),
sourcemaps    = require("gulp-sourcemaps"),
browserSync   = require("browser-sync").create(),
source        = "./process/",
dest          = "./dist/";
pluginDir     = "./"
sass.compiler       = require("node-sass");


function php() {
  return gulp.src( [pluginDir + "wp-accessibility-plugin.php", pluginDir + "src/**/*.php"]);
}

function js() {
  return gulp.src(dest + "scripts/**/*.js");
}

function styles() {
  return gulp
	.src(source + "/sass/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(gulp.dest(dest + "css"));
}

function watch() {
  gulp.watch(source + "sass/**/*.scss", styles).on("change", browserSync.reload);
  gulp.watch(dest + "scripts/**/*.js", js).on("change", browserSync.reload);
  gulp.watch(source + "sass/**/*", styles).on("change", browserSync.reload);
}

function server() {
  browserSync.init({
	notify: false,
	browser: "firefox developer edition",
	proxy: "http://localhost/dissability.vinnies.org.au/",
	port:80,
  });
  watch();
}

var build = gulp.series(gulp.parallel(js, styles, php), server );

gulp.task("default", build);
