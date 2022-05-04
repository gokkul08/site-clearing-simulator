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
        '@modules/(.*)$': '<rootDir>/src/modules/$1',
    },
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transform: {
        '^.+\\.(jsx|ts|tsx|d.ts)$': 'ts-jest',
    },
    testEnvironment: 'jest-environment-jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?|ts?|d.ts?)$',
    transformIgnorePatterns: ['/node_modules/'],
    coverageReporters: [
        'json',
        'lcov',
        'text',
        'clover',
        'cobertura',
        'json-summary',
    ],
    reporters: ['default', 'js-junit'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json',
        },
    },
};