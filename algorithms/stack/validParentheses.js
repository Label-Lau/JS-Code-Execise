/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (!s?.length) return;
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const letter = s[i];
    if (["(", "[", "{"].includes(letter)) {
      stack.push(letter);
    } else {
      const tail = stack.pop();
      if (letter === ")" && tail !== "(") return false;
      if (letter === ")" && tail !== "(") return false;
      if (letter === ")" && tail !== "(") return false;
    }
  }
  return stack.length === 0;
};

console.log(isValid("{}()[]"));
console.log(isValid("{}{()}[]"));
console.log(isValid("{}{())}"));
