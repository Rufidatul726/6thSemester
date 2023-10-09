const assert = require('chai').assert;
const utils = require('../utils');
const operations = require('../operations');

describe('Utils', () => {
  describe('hasEvenNumbers', () => {
    it('should return true for an array with even numbers', () => {
      const arr = [1, 2, 3, 4, 5];
      assert.isTrue(utils.hasEvenNumbers(arr));
    });

    it('should return false for an array with no even numbers', () => {
      const arr = [1, 3, 5];
      assert.isFalse(utils.hasEvenNumbers(arr));
    });
  });

  // Add more test cases for other methods in utils.js

});

describe('Operations', () => {
  describe('factorial', () => {
    it('should return the factorial of a number', () => {
      const result = operations.factorial(5);
      assert.equal(result, 120);
    });
  });

  // Add more test cases for other methods in operations.js

});

// Run the tests
mocha.run();
