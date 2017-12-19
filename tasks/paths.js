export default {
  js: ['./src/**/*.js'],
  cleanProject: ['dist/**', 'doc/**'],
  coverage: ['./src/**/*.js', '!./src/server/templates'],
  doc: ['README.md', './src/**/*.js'],
  templates: ['./src/server/templates/**/*'],
  tests: './tests/main.test.js'
};
