module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/*.config.js',
    '!**/vendor/**',
    '!**/tests/e2e/**',
    '!**/main.js',
    '!**/coverage/**',
    '!**/plugins/bootstrap-vue.js**',
    // '!**/service/apiServices.js**',
    // '!**/store/store.js**',

  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
