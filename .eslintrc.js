module.exports = {
    // `prettier` must be last so it turns off ESLint rules that conflict with
    // Prettier formatting (e.g. operator-linebreak).
    extends: ['piecioshka', 'prettier'],

    // https://eslint.org/docs/user-guide/configuring#specifying-environments
    env: {
        es6: true,
        browser: true,
        node: true,
        commonjs: true,
        amd: true
        // jquery: true,
    },

    // https://eslint.org/docs/rules/
    rules: {
        'require-jsdoc': ['off'],
        'no-console': ['off'],
        'object-shorthand': ['off'],
        'no-implicit-globals': ['off'],
        'padded-blocks': ['off'],
        'arrow-body-style': ['off'],
        'object-curly-newline': ['off'],
        'wrap-iife': ['off'],
        'no-magic-numbers': [
            'error',
            {
                ignore: [-1, 0, 1, 2]
            }
        ]
    },

    // List of global variables.
    globals: {}
};
