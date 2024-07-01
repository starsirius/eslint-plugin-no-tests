var utils = require("./node_modules/eslint-plugin-jest/lib/rules/utils");

module.exports = {
  meta: {
    messages: {
      unexpectedTestCase: "Test cases not allowed",
    }
  },
  create(context) {
    let testCaseNodes = [];

    return {
      'Program:exit'() {
        if (testCaseNodes.length > 0) {
          for (const node of testCaseNodes) {
            context.report({ node, messageId: 'unexpectedTestCase' });
          }
        }
      },

      CallExpression(node) {
        if (utils.isTypeOfJestFnCall(node, context, ['test'])) {
          testCaseNodes.push(node)
        }
      }
    };
  }
};
