import gulp from 'gulp';

import paths from './paths';

gulp.task('copy-tpls', () => gulp.src(paths.templates)
  .pipe(gulp.dest('dist/server/templates')));
