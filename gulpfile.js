import gulp from "gulp";
import fileInclude from "gulp-file-include";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import htmlmin from "gulp-htmlmin";
import gulpIf from "gulp-if";
import { deleteAsync } from "del";
import browserSync from "browser-sync";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";

const sass = gulpSass(dartSass);
const bs = browserSync.create();
const isProduction = process.env.NODE_ENV === "production";

export const html = () => {
  return gulp
    .src("html/**/*.html")
    .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
    .pipe(gulpIf(isProduction, htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest("dist/html"))
    .pipe(bs.stream());
};

export const scss = () => {
  return gulp
    .src("scss/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(bs.stream());
};

export const copyCss = () => {
  return gulp.src("css/**/*.css").pipe(gulp.dest("dist/css")).pipe(bs.stream());
};

export const js = () => {
  return gulp.src("js/**/*.js").pipe(gulp.dest("dist/js")).pipe(bs.stream());
};

export const images = () => {
  return gulp
    .src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(bs.stream());
};

export const fonts = () => {
  return gulp
    .src(
      ["css/fonts/**/*.woff", "css/fonts/**/*.woff2", "css/fonts/**/*.otf"],
      { allowEmpty: true }
    )
    .pipe(gulp.dest("dist/css/fonts"))
    .pipe(bs.stream());
};

export const css = () => {
  return gulp
    .src("dist/css/*.css")
    .pipe(autoprefixer())
    .pipe(gulpIf(isProduction, cleanCSS({ compatibility: "ie8" })))
    .pipe(gulp.dest("dist/css"));
};

export const clean = () => {
  return deleteAsync(["dist"]);
};

export const build = gulp.series(
  clean,
  gulp.parallel(html, scss, js, images, fonts, copyCss),
  css
);

export const serve = () => {
  bs.init({
    server: {
      baseDir: "dist",
    },
    port: 3000,
    open: true,
  });

  gulp.watch("html/**/*.html", html);
  gulp.watch("scss/**/*.scss", scss);
  gulp.watch("css/**/*.css", copyCss);
  gulp.watch("js/**/*.js", js);
  gulp.watch("images/**/*", images);
};

export default gulp.series(build, serve);
