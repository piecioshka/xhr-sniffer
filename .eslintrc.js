module.exports = {
    extends: 'piecioshka',

    // http://eslint.org/docs/user-guide/configuring#specifying-environments
    env: {
        es6: true,
        browser: true,
        node: true,
        commonjs: true,
        amd: true,
        // jquery: true,
        jasmine: true
    },

    // http://eslint.org/docs/rules/
    rules: {
        'no-console': ['off'],
        'object-shorthand': ['off'],
        'no-implicit-globals': ['off'],
        'padded-blocks': ['off'],
        'arrow-body-style': ['off'],
        'object-curly-newline': ['off'],
        'wrap-iife': ['off'],
        'no-magic-numbers': ['error', {
            ignore: [-1, 0, 1, 2]
        }]
    },

    // List of global variables.
    globals: {}
};
