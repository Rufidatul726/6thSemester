const readline = require('readline');
const utils = require('./utils');
const operations = require('./operations');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a number to find its factorial: ', (input) => {
  const num = parseInt(input, 10);

  console.log('Factorial of', num, 'is:', operations.factorial(num));
  
  rl.question('Enter a number to calculate the sum of squares: ', (input) => {
    const n = parseInt(input, 10);

    console.log('Sum of squares up to', n, 'is:', operations.sumOfSquares(n));

    rl.question('Enter a number to check if it\'s prime: ', (input) => {
      const primeNum = parseInt(input, 10);

      console.log(primeNum, 'is prime?', operations.isPrime(primeNum));

      rl.question('Enter a number to generate Fibonacci sequence: ', (input) => {
        const fibCount = parseInt(input, 10);

        console.log('Fibonacci sequence (first', fibCount, 'numbers):', operations.fibonacci(fibCount));

        rl.question('Enter a string to check if it\'s a palindrome: ', (input) => {
          const str = input;

          console.log(str, 'is a palindrome?', operations.isPalindrome(str));

          const arr1 = [1, 2, 3, 4];
          const arr2 = [3, 4, 5, 6];
          console.log('Array intersection:', utils.arrayIntersection(arr1, arr2));

          const arr = [1, 2, 3, 4, 5];
          console.log('Has even numbers:', utils.hasEvenNumbers(arr));

          const numbers = [10, 5, 20, 8, 15];
          console.log('Largest number in the array:', utils.findLargestNumber(numbers));

          const arrWithDuplicates = [1, 2, 3, 3, 4, 5];
          console.log('Array has duplicates?', utils.hasDuplicates(arrWithDuplicates));

          rl.close();
        });
      });
    });
  });
});
