module.exports = {
  plugins: ['filenames'],
  overrides: [
    {
      files: ['src/components/**/*.{js,jsx}'],
      rules: {
        // Enforce PascalCase for component filenames (basename only)
        'filenames/match-regex': ['error', '^[A-Z][a-zA-Z0-9]*$']
      }
    }
  ]
};
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['filenames'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.js'] }],
    // Enforce PascalCase for component filenames. Allows index.js files.
    'filenames/match-regex': [
      'error',
      '^[A-Z][a-zA-Z0-9]*(?:[A-Z][a-zA-Z0-9]*)?$|^index$|^index\.(js|jsx)$',
      true,
    ],
  },
};
