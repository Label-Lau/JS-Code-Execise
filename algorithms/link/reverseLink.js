export function reverseLinkLoop(root) {
  let temp = root;
  let prev = null;
  while (temp) {
    const { next } = temp;
    temp.next = prev;
    prev = temp;
    temp = next;
  }
  return prev;
}

// 这是一个使用递归方法反转链表的函数，参数root是链表的头节点
export function reverseLinkRecursion(root) {
  // 如果链表为空或者链表只有一个节点，那么不需要反转，直接返回头节点即可
  if (root == null || root.next == null) return root;
  const node = root;
  // 如果当前节点的下一个节点是链表的最后一个节点，则将最后一个节点的next指向当前节点，形成反转
  if (node.next.next == null) {
    node.next.next = node;
    return node.next;
  }
  // 调用自身，也就是递归，将当前节点的下一个节点传入，进行反转操作
  const next = reverseLinkRecursion(node.next);
  // 当从递归中返回后，将当前节点的下一个节点的next指向当前节点，形成反转
  node.next.next = node;
  // 将当前节点的next设置为null，断开与原来下一个节点的连接，完成反转
  node.next = null;
  // 返回反转后的头节点
  return next;
}
