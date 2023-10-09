const utils = require('../utils');

describe('utils.js', () => {
  describe('hasDuplicates', () => {
    it('should return true if array has duplicates', () => {
      expect(utils.hasDuplicates([1, 2, 3, 3, 4])).toBe(true);
      expect(utils.hasDuplicates(['a', 'b', 'a'])).toBe(true);
    });

    it('should return false if array has no duplicates', () => {
      expect(utils.hasDuplicates([1, 2, 3, 4])).toBe(false);
      expect(utils.hasDuplicates(['a', 'b', 'c'])).toBe(false);
    });
  });

  describe('findLargestNumber', () => {
    it('should return the largest number in the array', () => {
      expect(utils.findLargestNumber([10, 5, 20, 8, 15])).toBe(20);
      expect(utils.findLargestNumber([-10, -5, -20, -8, -15])).toBe(-5);
    });

    it('should throw an error for invalid input', () => {
      expect(() => utils.findLargestNumber([])).toThrow('Invalid input');
      expect(() => utils.findLargestNumber('invalid')).toThrow('Invalid input');
    });
  });

  describe('hasEvenNumbers', () => {
    it('should return true if array has even numbers', () => {
      expect(utils.hasEvenNumbers([1, 2, 3, 4])).toBe(true);
      expect(utils.hasEvenNumbers([2, 4, 6, 8])).toBe(true);
    });

    it('should return false if array has no even numbers', () => {
      expect(utils.hasEvenNumbers([1, 3, 5, 7])).toBe(false);
      expect(utils.hasEvenNumbers([9, 11, 13, 15])).toBe(false);
    });
  });

  describe('arrayIntersection', () => {
    it('should return the intersection of two arrays', () => {
      expect(utils.arrayIntersection([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([3, 4]);
      expect(utils.arrayIntersection(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['b', 'c']);
    });
  });
});
