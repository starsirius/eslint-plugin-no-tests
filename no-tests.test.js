const {RuleTester} = require("eslint");
const noTestsRule = require("./no-tests");

const ruleTester = new RuleTester({
  // Must use at least ecmaVersion 2015 because
  // that's when `const` variables were introduced.
  languageOptions: { ecmaVersion: 2015 }
});

ruleTester.run(
  "no-tests",
  noTestsRule,
  {
    valid: [{
      code: "const foo = 'bar';",
    }],
    invalid: [{
      code: "it();",
      errors: [
        { messageId: "unexpectedTestCase" }
      ],
    }],
  }
);

console.log("All tests passed!");
