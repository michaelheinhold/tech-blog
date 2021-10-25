const { firstInArray } = require('../utils/helpers');

test('test for firstInArray to grab the first object in an array and return it', ()=> {
  const testArr = ['first', 'second', 'third'];

  expect(firstInArray(testArr)).toBe('first');
});