// eslint-disable-next-line no-undef
module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
    parser: 'babel-eslint',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['react', 'react-hooks'],
    env: {
      jest: true,
    },
    globals: {
      Intl: 'readonly',
    },
    rules: {
      'no-console': 'off',
      'linebreak-style': ['error', 'unix',],
      'react/prop-types': [2, { skipUndeclared: true }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  };
  