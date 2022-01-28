const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest');

const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/src',
})

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!.*rc.js',
    '!*.config.js',
    '!**/.cache/**',
    '!**/.coverage/**',
    '!**/.jest/**',
    '!jest-preprocess.js',
    '!jest.config.js',
    '!loadershim.js',
    '!**/node_modules/**',
    '!**/public/**',
    '!**/scripts/**',
  ],
  globals: {
    __PATH_PREFIX__: ``,
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file-mock.js',
    ...paths,
  },
  setupFiles: ['<rootDir>/loadershim.js'],
  setupFilesAfterEnv: ['<rootDir>/setup-test-env.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public'],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.[jt]sx?$': 'ts-jest', //'<rootDir>/jest-preprocess.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
}