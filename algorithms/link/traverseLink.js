export function traverseLinkLoop(root) {
  let temp = root;
  for (;;) {
    if (temp) {
      console.log(temp.value);
    } else {
      break;
    }
    temp = temp.next;
  }
}

export function traverseLinkRecursion(root) {
  if (!root) return;
  console.log(root.value);
  traverseLinkRecursion(root.next);
}
