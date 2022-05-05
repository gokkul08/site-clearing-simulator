module.exports = {
    collectCoverageFrom: [
        '**/*.{js,ts}',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!**/.next/**',
        '!**/public/**',
        '!**/src/jest/**',
        '!**/src/mocks/**',
        '!**/src/theme/**',
        '!**/src/pages/api/jest/**',
        '!**/config/**',
        '!coverage/lcov-report/**',
        '!**/src/pages/api/**',
        '!.eslintrc.js',
        '!.prettierrc.js',
        '!jest.config.js',
        '!next.config.js',
    ],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx|d.ts)$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
    coverageReporters: [
        'json',
        'lcov',
        'text',
        'clover',
        'cobertura',
        'json-summary',
    ],
    reporters: ['default', 'jest-junit'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json',
        },
    },
};