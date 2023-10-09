// operations.js

const operations = {
    fibonacci: (n) => {
      if (n < 0) {
        throw new Error('Input should be a non-negative integer');
      }
      if (n === 0) {
        return [];
      }
      if (n === 1) {
        return [0];
      }
  
      const sequence = [0, 1];
      for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
      }
  
      return sequence;
    },
  
    isPalindrome: (str) => {
      const cleanedStr = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
      for (let i = 0; i < Math.floor(cleanedStr.length / 2); i++) {
        if (cleanedStr[i] !== cleanedStr[cleanedStr.length - 1 - i]) {
          return false;
        }
      }
      return true;
    },


    factorial: (n) => {
      if (n < 0) {
        throw new Error('Input should be a non-negative integer');
      }
      if (n === 0 || n === 1) {
        return 1;
      }
      let result = 1;
      for (let i = 2; i <= n; i++) {
        result *= i;
      }
      return result;
    },
  
    isPrime: (num) => {
      if (num < 2) {
        return false;
      }
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          return false;
        }
      }
      return true;
    },

    sumOfSquares: (n) => {
        if (n < 0) {
          throw new Error('Input should be a non-negative integer');
        }
        let sum = 0;
        for (let i = 1; i <= n; i++) {
          sum += i * i;
        }
        return sum;
    },

    sumOfDigits: (num) => {
        let sum = 0;
        let tempNum = num;
    
        while (tempNum !== 0) {
          sum += tempNum % 10;
          tempNum = Math.floor(tempNum / 10);
        }
    
        return sum;
    },
  };
  
  
  module.exports = operations;
  