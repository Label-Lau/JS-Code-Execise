function createLink(arr) {
  let link = null;
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    const node = {
      value: arr[i],
      next: link,
    };
    link = node;
  }
  return link;
}

export default createLink;
