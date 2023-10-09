const readline = require('readline');
const utils = require('./utils');
const operations = require('./operations');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// rl.question('Enter a number to find its factorial: ', (input) => {
//   const num = parseInt(input, 10);

//   console.log('Factorial of', num, 'is:', operations.factorial(num));
  
//   rl.question('Enter a number to calculate the sum of squares: ', (input) => {
//     const n = parseInt(input, 10);

//     console.log('Sum of squares up to', n, 'is:', operations.sumOfSquares(n));

//     rl.question('Enter a number to check if it\'s prime: ', (input) => {
//       const primeNum = parseInt(input, 10);

//       console.log(primeNum, 'is prime?', operations.isPrime(primeNum));

//       rl.question('Enter a number to generate Fibonacci sequence: ', (input) => {
//         const fibCount = parseInt(input, 10);

//         console.log('Fibonacci sequence (first', fibCount, 'numbers):', operations.fibonacci(fibCount));

//         rl.question('Enter a string to check if it\'s a palindrome: ', (input) => {
//           const str = input;

//           console.log(str, 'is a palindrome?', operations.isPalindrome(str));

//           const arr1 = [1, 2, 3, 4];
//           const arr2 = [3, 4, 5, 6];
//           console.log('Array intersection:', utils.arrayIntersection(arr1, arr2));

//           const arr = [1, 2, 3, 4, 5];
//           console.log('Has even numbers:', utils.hasEvenNumbers(arr));

//           const numbers = [10, 5, 20, 8, 15];
//           console.log('Largest number in the array:', utils.findLargestNumber(numbers));

//           const arrWithDuplicates = [1, 2, 3, 3, 4, 5];
//           console.log('Array has duplicates?', utils.hasDuplicates(arrWithDuplicates));

//           rl.close();
//         });
//       });
//     });
//   });
// });


function performOperations(num, n, primeNum, fibCount, str) {
  const results = {};

  results.factorial = operations.factorial(num);
  results.sumOfSquares = operations.sumOfSquares(n);
  results.isPrime = operations.isPrime(primeNum);
  results.fibonacci = operations.fibonacci(fibCount);
  results.isPalindrome = operations.isPalindrome(str);
  results.arrayIntersection = utils.arrayIntersection([1, 2, 3, 4], [3, 4, 5, 6]);
  results.hasEvenNumbers = utils.hasEvenNumbers([1, 2, 3, 4, 5]);
  results.findLargestNumber = utils.findLargestNumber([10, 5, 20, 8, 15]);
  results.hasDuplicates = utils.hasDuplicates([1, 2, 3, 3, 4, 5]);

  return results;
}

function startInteractiveInterface() {
  rl.question('Enter a number to find its factorial: ', (num) => {
    num = parseInt(num, 10);
    rl.question('Enter a number to calculate the sum of squares: ', (n) => {
      n = parseInt(n, 10);
      rl.question('Enter a number to check if it\'s prime: ', (primeNum) => {
        primeNum = parseInt(primeNum, 10);
        rl.question('Enter a number to generate Fibonacci sequence: ', (fibCount) => {
          fibCount = parseInt(fibCount, 10);
          rl.question('Enter a string to check if it\'s a palindrome: ', (str) => {
            const results = performOperations(num, n, primeNum, fibCount, str);

            console.log('Results:', results);
            rl.close();
          });
        });
      });
    });
  });
}

if (require.main === module) {
  startInteractiveInterface();
}

module.exports = {
  performOperations
};