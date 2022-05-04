module.exports = {
    plugins: ['react', 'react-hooks'],
    extends: [
        './config-base',
        'plugin:react/recommended',
    ],
    rules: {
        'react/prop-types': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
};