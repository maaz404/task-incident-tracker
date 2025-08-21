module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // Transform files with babel-jest
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './.babelrc' }],
  },
  
  // Don't transform these ES modules in node_modules, let babel-jest handle them
  transformIgnorePatterns: [
    'node_modules/(?!(axios|@babel|@testing-library|react-toastify)/)',
  ],
  
  // Module name mapping for CSS and other assets
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/test-file-stub.js',
  },
  
  // File extensions to consider
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node'
  ],
  
  // Test match patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}'
  ],
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.js',
    '!src/setupTests.js'
  ],
  
  // Reset mocks between tests
  clearMocks: true,
  restoreMocks: true,
  
  // Verbose output for debugging
  verbose: false,
  
  // Handle ES modules properly
  extensionsToTreatAsEsm: ['.jsx'],
  globals: {
    'ts-jest': {
      useESM: true
    }
  }
};
