
////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2018, Perry L Miller IV
//  All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      impliedStrict: true
    }
  },
  rules: {
    indent: [ "error", 2, { SwitchCase: 1 } ],
    "linebreak-style": [ "error", "unix" ],
    quotes: [ "error", "double" ],
    semi: [ "error", "always" ],
    "no-console": "off",
    "no-empty": "off",
    "no-unused-vars": "off"
  },
  globals: {
  }
};
