<div align="center">
  <h1>eslint-plugin-no-tests</h1>

  <p>Simple ESLint rules for catching test code</p>
</div>

## Why?

This ESLint plugin was born with a specific use case: enforcing consistent file naming for Jest tests. By default, Jest
detects test files by looking for files [named in certain ways or located in certain folders][jest_test_match]. It also
supports customizing it via, such as, the [`testMatch`][jest_test_match] config. Being able to name the test files in a
flexible way was great but it could lead to human errors, like typos. It's possible that tests were named incorrectly
due to typos, not run by the test suite locally or on CI, and silently failing until someone notices it.

This plugin provides a linting rule that catches test cases used in code. By applying the rule to files except test
files, we'll be able to enforce consistent file naming for tests and make sure tests are correctly run.

## Installation

```bash
yarn add --dev eslint-plugin-no-tests
```

## Usage

Here is an example usage with Jest:

Given the `testMatch` config in jest.config.js

```javascript
module.exports = {
  //...

  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

  //...
}

```

We can add an override in .eslintrc.js (or your ESLint config file) to run the plugin on files except for the test files
that Jest recognizes.

```javascript
module.exports = {
  //...

  overrides: [
    {
      files: ["**/*.{js,ts,jsx,tsx}"],
      excludedFiles: require("./jest.config").testMatch,
      plugins: ["no-tests"],
      rules: {
        "no-tests/no-tests": 2,
      },
    },
  ],

  //...
}

```

Then next time when a test file is named incorrectly, the plugin will yell at you! By the way, can you spot the error by
eyes?

```
/Users/starsirius/project/myTest.tests.js
  1:1  error    Test cases not allowed               no-tests/no-tests
```


[jest_test_match]: https://github.com/jestjs/jest/blob/v29.7.0/packages/jest-config/src/Defaults.ts#L82
