module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'rules': {
    'no-undef': [
      'off'
    ],
    'no-console': 'off',
    'prefer-arrow-callback': 'off',
    'func-names': 'off',
    'no-param-reassign': 'off',
    'prefer-const': 'off',
    'no-restricted-syntax': [
      'off',
      'FunctionExpression',
      'WithStatement',
      'BinaryExpression[operator=\'in\']'
    ],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'comma-spacing': ['error', { before: false, after: true }],
  }
};
