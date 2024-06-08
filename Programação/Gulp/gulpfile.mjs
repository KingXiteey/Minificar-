import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import obfuscate from 'gulp-obfuscate';
import imagemin from 'gulp-imagemin';
import dartSass from 'sass';

const sassCompiler = sass(dartSass);

function comprimirImagens() {
  return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

function comprimiJavaScript() {
  return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));
}

function compilaSass() {
  return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sassCompiler({
      outputStyle: 'compressed'
    }).on('error', sassCompiler.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}

function funcaoPadrao(callback) {
  console.log('Executando via Gulp');
  callback();
}

function dizOi(callback) {
  console.log('Olá Gulp');
  callback();
}

function dizTchau() {
  console.log('Tchau Gulp');
}

export default gulp.series(funcaoPadrao, dizOi);
export { dizOi, compilaSass as sass, comprimiJavaScript as compress, comprimirImagens as images };

export function watch() {
  gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
}
