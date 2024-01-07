import { test, expect } from 'vitest';
import { reverseLinkLoop, reverseLinkRecursion } from './reverseLink';

function testReverseLink(reverseFunction, description) {
  test(`测试${description}`, () => {
    const root = {
      value: 1,
      next: { value: 2, next: { value: 3, next: null } },
    };
    const reversed = reverseFunction(root);
    expect(reversed.value).toBe(3);
    expect(reversed.next.value).toBe(2);
    expect(reversed.next.next.value).toBe(1);
    expect(reversed.next.next.next).toBe(null);
  });

  test(`测试${description}空链表`, () => {
    const root = null;
    const reversed = reverseFunction(root);
    expect(reversed).toBe(null);
  });

  test(`测试${description}只有一个元素的链表`, () => {
    const root = { value: 1, next: null };
    const reversed = reverseFunction(root);
    expect(reversed.value).toBe(1);
    expect(reversed.next).toBe(null);
  });
}

testReverseLink(reverseLinkLoop, '循环反转链表');
testReverseLink(reverseLinkRecursion, '递归反转链表');
