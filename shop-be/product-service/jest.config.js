module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', { diagnostics: false, }],
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    "^@functions/(.*)$": "<rootDir>/src/functions/$1",
    "^@libs/(.*)$": "<rootDir>/src/libs/$1",
  },
};
