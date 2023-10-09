// utils.js

const utils = {
  hasDuplicates: (arr) => {
    const seen = new Set();
    for (const item of arr) {
      if (seen.has(item)) {
        return true;
      }
      seen.add(item);
    }
    return false;
  },

  findLargestNumber: (numbers) => {
    if (!Array.isArray(numbers) || numbers.length === 0) {
      throw new Error('Invalid input');
    }

    let largest = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] > largest) {
        largest = numbers[i];
      }
    }

    return largest;
  },

    hasEvenNumbers: (arr) => {
      for (const num of arr) {
        if (num % 2 === 0) {
          return true;
        }
      }
      return false;
    },
  
    arrayIntersection: (arr1, arr2) => {
      const result = [];
      for (const item of arr1) {
        if (arr2.includes(item) && !result.includes(item)) {
          result.push(item);
        }
      }
      return result;
    },
  };
  
  module.exports = utils;
  