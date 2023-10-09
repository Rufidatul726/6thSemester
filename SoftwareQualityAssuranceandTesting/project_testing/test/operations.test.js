const operations = require('../operations');

describe('operations.js', () => {
  describe('fibonacci', () => {
    it('should return the correct Fibonacci sequence', () => {
      expect(operations.fibonacci(0)).toEqual([]);
      expect(operations.fibonacci(1)).toEqual([0]);
      expect(operations.fibonacci(5)).toEqual([0, 1, 1, 2, 3]);
    });

    it('should throw an error for negative input', () => {
      expect(() => operations.fibonacci(-1)).toThrow('Input should be a non-negative integer');
    });
  });

  describe('isPalindrome', () => {
    it('should return true for palindromic strings', () => {
      expect(operations.isPalindrome('Madam')).toBe(true);
      expect(operations.isPalindrome('Able was I ere I saw Elba')).toBe(true);
    });

    it('should return false for non-palindromic strings', () => {
      expect(operations.isPalindrome('Hello')).toBe(false);
      expect(operations.isPalindrome('Palindrome')).toBe(false);
    });
  });

  describe('factorial', () => {
    it('should return the correct factorial', () => {
      expect(operations.factorial(0)).toBe(1);
      expect(operations.factorial(1)).toBe(1);
      expect(operations.factorial(5)).toBe(120);
    });

    it('should throw an error for negative input', () => {
      expect(() => operations.factorial(-1)).toThrow('Input should be a non-negative integer');
    });
  });

  describe('isPrime', () => {
    it('should return true for prime numbers', () => {
      expect(operations.isPrime(2)).toBe(true);
      expect(operations.isPrime(7)).toBe(true);
      expect(operations.isPrime(11)).toBe(true);
    });

    it('should return false for non-prime numbers', () => {
      expect(operations.isPrime(1)).toBe(false);
      expect(operations.isPrime(4)).toBe(false);
      expect(operations.isPrime(10)).toBe(false);
    });
  });

  describe('sumOfSquares', () => {
    it('should return the correct sum of squares', () => {
      expect(operations.sumOfSquares(0)).toBe(0);
      expect(operations.sumOfSquares(1)).toBe(1);
      expect(operations.sumOfSquares(3)).toBe(14);
    });

    it('should throw an error for negative input', () => {
      expect(() => operations.sumOfSquares(-1)).toThrow('Input should be a non-negative integer');
    });
  });

  describe('sumOfDigits', () => {
    it('should return the correct sum of digits', () => {
      expect(operations.sumOfDigits(123)).toBe(6);
      expect(operations.sumOfDigits(9876)).toBe(30);
      expect(operations.sumOfDigits(0)).toBe(0);
    });
  });
});
