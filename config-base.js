module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    env: {
        browser: true,
        jest: true,
        node: true,
    },
    plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:@next/next/recommended',
    ],
    overrides: [
        {
            files: ['*js', '*jsx'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
    rules: {
        'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'es5' }],
        'no-nested-ternary': 'error',
        '@typescript-eslint/naming-convention': [
            'warn',
            {
                selector: 'default',
                format: ['camelCase'],
            },
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            },
            {
                selector: 'variable',
                types: ['function'],
                format: ['camelCase', 'PascalCase'],
            },
            {
                selector: 'variable',
                types: ['boolean'],
                format: ['PascalCase'],
                prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'show'],
            },
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: ['classProperty'],
                modifiers: ['private', 'readonly'],
                format: ['camelCase'],
            },
            {
                selector: ['classMethod', 'accessor'],
                modifiers: ['private'],
                format: ['camelCase'],
            },
            {
                selector: 'memberLike',
                modifiers: ['private'],
                format: ['camelCase'],
                leadingUnderscore: 'require',
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
            {
                selector: 'typeProperty',
                format: ['camelCase', 'snake_case'],
                leadingUnderscore: 'allowDouble',
            },
            {
                selector: 'objectLiteralProperty',
                format: ['camelCase', 'snake_case'],
                leadingUnderscore: 'allowDouble',
            },
            {
                selector: 'enumMember',
                format: ['UPPER_CASE'],
            },
        ],
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    // Default Groups
                    // Side effect imports.
                    ['^\\u0000'],
                    // Packages.
                    // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                    ['^@?\\w'],
                    // Absolute imports and other imports such as Vue-style `@/foo`.
                    //  Anything that does not start with a dot.
                    ['^[^.]'],
                    // Relative imports.
                    // Anything that starts with a dot.
                    ['^\\.'],
                    // Custom Groups
                    ['^src/'],
                ],
            },
        ],
        'simple-import-sort/exports': 'error',
    },
};