import { test } from 'vitest';
import assert from 'assert';
import { traverseLinkLoop, traverseLinkRecursion } from './traverseLink';

const createLink = () => ({
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: null,
    },
  },
});

const captureConsoleLog = (fn, root) => {
  const output = [];
  const { log } = console;
  console.log = (v) => output.push(v);
  fn(root);
  console.log = log;
  return output;
};

test('正常链表 - 遍历循环', () => {
  const root = createLink();
  const output = captureConsoleLog(traverseLinkLoop, root);
  assert.deepStrictEqual(output, [1, 2, 3]);
});

test('正常链表 - 遍历递归', () => {
  const root = createLink();
  const output = captureConsoleLog(traverseLinkRecursion, root);
  assert.deepStrictEqual(output, [1, 2, 3]);
});

test('只有一个元素的链表 - 遍历循环', () => {
  const root = { value: 1, next: null };
  const output = captureConsoleLog(traverseLinkLoop, root);
  assert.deepStrictEqual(output, [1]);
});

test('只有一个元素的链表 - 遍历递归', () => {
  const root = { value: 1, next: null };
  const output = captureConsoleLog(traverseLinkRecursion, root);
  assert.deepStrictEqual(output, [1]);
});

test('空链表 - 遍历循环', () => {
  const root = null;
  const output = captureConsoleLog(traverseLinkLoop, root);
  assert.deepStrictEqual(output.length, 0);
});

test('空链表 - 遍历递归', () => {
  const root = null;
  const output = captureConsoleLog(traverseLinkRecursion, root);
  assert.deepStrictEqual(output.length, 0);
});

test('包含空元素的链表 - 遍历循环', () => {
  const root = {
    value: 1,
    next: { value: null, next: { value: 2, next: null } },
  };
  const output = captureConsoleLog(traverseLinkLoop, root);
  assert.deepStrictEqual(output, [1, null, 2]);
});

test('包含空元素的链表 - 遍历递归', () => {
  const root = {
    value: 1,
    next: { value: null, next: { value: 2, next: null } },
  };
  const output = captureConsoleLog(traverseLinkRecursion, root);
  assert.deepStrictEqual(output, [1, null, 2]);
});
