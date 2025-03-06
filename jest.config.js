module.exports = {
  testEnvironment: 'node',
  verbose: true,
  // Setup a test database for testing
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  // Ignore certain directories
  testPathIgnorePatterns: ['/node_modules/'],
  // Look for test files in the tests directory
  testMatch: ['**/tests/**/*.test.js']
}; 