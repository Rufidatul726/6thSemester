const { performOperations } = require('../index');

test('performOperations should calculate the correct results', () => {
  const num = 5;
  const n = 3;
  const primeNum = 7;
  const fibCount = 5;
  const str = 'madam';

  const results = performOperations(num, n, primeNum, fibCount, str);

  expect(results.factorial).toBe(120);
  expect(results.sumOfSquares).toBe(14);
  // Add assertions for other operations
});
