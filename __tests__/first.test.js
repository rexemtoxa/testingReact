import func from '../src/index';

test('check env', () => {
  expect(func()).toBe(2);
});
