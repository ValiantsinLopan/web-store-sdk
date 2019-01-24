// Jest configuration
// https://facebook.github.io/jest/docs/en/configuration.html
module.exports = {
  // Modules can be explicitly auto-mocked using jest.mock(moduleName).
  // https://facebook.github.io/jest/docs/en/configuration.html#automock-boolean
  automock: false, // [boolean]

  // Respect Browserify's "browser" field in package.json when resolving modules.
  // https://facebook.github.io/jest/docs/en/configuration.html#browser-boolean
  browser: false, // [boolean]

  // This config option can be used here to have Jest stop running tests after the first failure.
  // https://facebook.github.io/jest/docs/en/configuration.html#bail-boolean
  bail: false, // [boolean]

  // The directory where Jest should store its cached dependency information.
  // https://facebook.github.io/jest/docs/en/configuration.html#cachedirectory-string
  // cacheDirectory: '/tmp/<path>', // [string]

  // Indicates whether the coverage information should be collected while executing the test.
  // Because this retrofits all executed files with coverage collection statements,
  // it may significantly slow down your tests.
  // https://facebook.github.io/jest/docs/en/configuration.html#collectcoverage-boolean
  // collectCoverage: false, // [boolean]

  // https://facebook.github.io/jest/docs/en/configuration.html#collectcoveragefrom-array
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!src/config/**',
    '!src/environments/**',
    '!src/lib/**',
    '!src/store/**',
    '!src/routes/**',
    '!src/*.js',
    '!src/reducers/index.js',
    '!src/components/*.js',
  ],

  // https://facebook.github.io/jest/docs/en/configuration.html#coveragedirectory-string
  coverageDirectory: '<rootDir>/coverage', // [string]

  // coveragePathIgnorePatterns: // [array<string>]
  // coverageReporters: [], // [array<string>]
  // coverageThreshold: {}, // [object]

  globals: {
    __DEV__: true,
  },

  // https://facebook.github.io/jest/docs/en/configuration.html#mapcoverage-boolean
  // mapCoverage: false, // [boolean]

  // The default extensions Jest will look for.
  // https://facebook.github.io/jest/docs/en/configuration.html#modulefileextensions-array-string
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],

  // moduleDirectories: // [array<string>]

  // A map from regular expressions to module names that allow to stub out resources,
  // like images or styles with a single module.
  moduleNameMapper: {
    '\\.(css|less|styl|scss|sass|sss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tools/mocks//fileMock.js',
    'isomorphic-style-loader/lib/withStyles':
      '<rootDir>/tools/mocks/withStyles.js',
    'src(.*)$': '<rootDir>/src/$1',
    '^test(.*)$': '<rootDir>/test/$1',
  },

  modulePathIgnorePatterns: ['<rootDir>/src/environments/'],
  // modulePaths: // [array<string>]
  // notify: false, // [boolean]
  // preset: // [string]
  // projects: // [array<string>]
  // clearMocks: // [boolean]
  // reporters: // [array<moduleName | [moduleName, options]>]
  // resetMocks: // [boolean]
  // resetModules: // [boolean]
  // resolver: // [string]
  // rootDir: // [string]
  // roots: // [array<string>]
  // setupFiles: // [array]
  setupTestFrameworkScriptFile: '<rootDir>src/setupTests.js',
  // snapshotSerializers: // [array<string>]
  // testEnvironment: // [string]
  // testMatch: // [array<string>]
  // testPathIgnorePatterns: // [array<string>]
  // testRegex: // [string]
  // testResultsProcessor: // [string]
  // testRunner: // [string]
  testURL: 'http://localhost/',
  // timers: // [string]

  transform: {
    '\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^(?!.*\\.(js|jsx|json|css|less|styl|scss|sass|sss)$)':
      '<rootDir>/tools/lib/fileTransformer.js',
  },

  // transformIgnorePatterns: // [array<string>]
  // unmockedModulePathPatterns: // [array<string>]

  verbose: true, // [boolean]
};
