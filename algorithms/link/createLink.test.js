import { test, expect } from 'vitest';
import createLink from './createLink';

test('测试空数组', () => {
  const result = createLink([]);
  expect(result).toBeNull();
});

test('测试只含有一个元素的数组', () => {
  const result = createLink([1]);
  expect(result).toEqual({ value: 1, next: null });
});

test('测试含有多个元素的数组', () => {
  const result = createLink([1, 2, 3]);
  expect(result).toEqual({
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: null,
      },
    },
  });
});

test('测试包含非数字元素的数组', () => {
  const result = createLink(['a', 'b', 'c']);
  expect(result).toEqual({
    value: 'a',
    next: {
      value: 'b',
      next: {
        value: 'c',
        next: null,
      },
    },
  });
});

test('测试包含 null 和 undefined 的数组', () => {
  const result = createLink([null, undefined]);
  expect(result).toEqual({
    value: null,
    next: {
      value: undefined,
      next: null,
    },
  });
});
