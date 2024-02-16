const canvas = document.createElement("canvas");
document.body.append(canvas);
canvas.width = window.innerWidth * devicePixelRatio;
canvas.height = window.innerHeight * devicePixelRatio;
const ctx = canvas.getContext("2d");

const fontSize = 18 * devicePixelRatio;
ctx.font = `${fontSize}px "Monaco"`;
const columnCount = Math.floor(canvas.width / fontSize);
const charIndex = new Array(columnCount).fill(0);

function getRandomChar() {
  const str = "0123456789abcdefghijklmnopqrstuvwxyz";
  return str[Math.floor(Math.random() * str.length)];
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#6be445";
  ctx.textBaseline = "top";
  for (let i = 0; i < columnCount; i++) {
    const text = getRandomChar();
    const x = i * fontSize;
    const y = charIndex[i] * fontSize;
    ctx.fillText(text, x, y);
    if (y > canvas.height && Math.random() > 0.99) {
      charIndex[i] = 0;
    } else {
      charIndex[i]++;
    }
    charIndex[i]++;
  }
}
draw();
setInterval(draw, 30);
// 获取0-9a-z随机字符
