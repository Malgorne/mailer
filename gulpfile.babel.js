import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('./tasks');

gulp.task('default', ['babel', 'doc', 'copy-tpls']);

gulp.task('tests', ['lint', 'unit-tests']);
