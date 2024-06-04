module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite-env.d.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-func', 'react-refresh'],
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase']
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow'
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require'
      },
      {
        selector: 'typeLike',
        format: ['PascalCase']
      },
      {
        selector: 'variableLike',
        format: ['camelCase', 'PascalCase']
      }
    ],
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/typedef': ['error'],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    // Identifier length should grater than or equal to 3
    'id-length': ['error', { min: 3, properties: 'never' }],
    //Maximum number of line in a file
    'max-lines': [
      'error',
      {
        max: 250,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    //Max number of line in a function except react functional component
    'react-func/max-lines-per-function': [
      'error',
      {
        max: 75,
        skipBlankLines: true,
        skipComments: true
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname
  }
};
