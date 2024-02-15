const dial = document.createElement("canvas");
document.body.append(dial);
dial.width = 400;
dial.height = 400;

let ctx = dial.getContext("2d");

ctx.translate(200, 200);

// 绘制表盘
ctx.save();
ctx.beginPath();
ctx.arc(0, 0, 200, 0, Math.PI * 2);
ctx.stroke();
ctx.restore();

// 绘制最大刻度
ctx.save();
ctx.strokeStyle = "#ccc";
ctx.lineWidth = 8;
for (let i = 0; i < 12; i++) {
  ctx.beginPath();
  ctx.moveTo(0, -200);
  ctx.lineTo(0, -180);
  ctx.stroke();
  ctx.rotate((Math.PI * 2) / 12);
}
ctx.restore();

// 绘制最小刻度
ctx.save();
ctx.strokeStyle = "#ddd";
ctx.lineWidth = 4;
for (let i = 0; i < 60; i++) {
  if (i % 5 !== 0) {
    ctx.beginPath();
    ctx.moveTo(0, -200);
    ctx.lineTo(0, -190);
    ctx.stroke();
  }
  ctx.rotate((Math.PI * 2) / 60);
}
ctx.restore();

// 绘制文字
ctx.save();
ctx.font = "20px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
const r = 170;
const rad = (Math.PI * 2) / 12;
for (let i = 0; i < 12; i++) {
  const text = i === 0 ? "12" : i;
  const x = Math.sin(rad * i) * r;
  const y = -Math.cos(rad * i) * r;
  ctx.fillText(text, x, y);
}
ctx.restore();

const watchHand = document.createElement("canvas");
document.body.append(watchHand);
ctx = watchHand.getContext("2d");
watchHand.width = 400;
watchHand.height = 400;
ctx.translate(200, 200);

function draw() {
  ctx.clearRect(-200, -200, watchHand.width, watchHand.height);

  // 获取当前时间
  const date = new Date();
  const hour = date.getHours() % 12;
  const minute = date.getMinutes();
  const second = date.getSeconds();

  // 绘制时针
  ctx.save();
  ctx.rotate(
    ((Math.PI * 2) / (60 * 60 * 12)) * (hour * (60 * 60) + minute * 60 + second)
  );
  ctx.beginPath();
  ctx.moveTo(-5, 10);
  ctx.lineTo(-5, -100);
  ctx.quadraticCurveTo(-15, -100, 0, -120);
  ctx.quadraticCurveTo(15, -100, 5, -100);
  ctx.lineTo(5, 10);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 绘制分针
  ctx.save();
  ctx.rotate(((Math.PI * 2) / (60 * 60)) * (minute * 60 + second));
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#ccc";
  ctx.beginPath();
  ctx.moveTo(0, 20);
  ctx.lineTo(0, -160);
  ctx.stroke();
  ctx.restore();

  // 绘制秒针
  ctx.save();
  ctx.rotate(((Math.PI * 2) / 60) * second);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#f00";
  ctx.beginPath();
  ctx.moveTo(0, 30);
  ctx.lineTo(0, -190);
  ctx.stroke();
  ctx.restore();

  // 绘制圆心点
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
draw();
setInterval(draw, 1000);
