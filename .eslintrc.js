module.exports = {
  'env': {
    'browser': true,
    'jest': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'airbnb',
    'prettier',
  ],
  'plugins': [
    'prettier',
  ],
  'rules': {
    "react/prop-types": 0,
    "react/jsx-indent": 0,
    "no-underscore-dangle": 0,
    "react/jsx-one-expression-per-line": 0,
    "react-hooks/exhaustive-deps": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "no-nested-ternary": 0,
    "no-extra-boolean-cast": 0,
    "no-case-declarations": 0,
    "no-param-reassign": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'prettier/prettier': ['error', {
      'singleQuote': true,
      'trailingComma': 'es5'
    }],
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    }
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": [
          "node_modules",
          "src" // replace with your app-module-path directory
        ]
      }
    }
  },
}