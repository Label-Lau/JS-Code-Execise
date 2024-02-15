const canvas = document.createElement("canvas");
document.body.append(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// 将坐标系设置为数学坐标系
ctx.translate(0, canvas.height);
ctx.scale(1, -1);

class Fireworks {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 6;
    this.opacity = 1;
    this.count = 400;
    this.particles = [];
  }
  draw() {
    this.opacity = this.opacity < 0.5 ? 0.5 : this.opacity;
    // 绘制多个小球，形成主体形状
    for (let i = 0; i < 100; i++) {
      const ball = new Ball(
        this.x,
        this.y - i,
        this.r - i / 20,
        `rgba(200,200,50,${this.opacity - i / 100})`
      );
      ball.draw();
    }
  }
  bomb() {
    if (this.particles.length === 0) {
      // 首次爆炸
      const rad = (Math.PI * 2) / this.count;
      for (let i = 0; i < this.count; i++) {
        // 生成随机颜色
        const color = `rgba(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        },0.8)`;
        const dirx = Math.cos(rad * i) * Math.random() * 5;
        const diry = Math.sin(rad * i) * Math.random() * 5;
        const particle = new Particle(this.x, this.y, dirx, diry, color);
        this.particles.push(particle);
        particle.draw();
      }
    } else {
      this.particles.forEach((prat) => {
        prat.update();
      });
    }
  }
}

class Ball {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }
  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Particle {
  constructor(x, y, dirx, diry, color, type) {
    this.x = x;
    this.y = y;
    this.r = 2;
    this.dirx = dirx;
    this.diry = diry;
    this.color = color;
  }
  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  update() {
    this.x += this.dirx;
    this.y += this.diry;
    this.dirx *= 0.99;
    this.diry *= 0.98;
    this.draw();
  }
}

const fireworksArray = [];
const bombArray = [];
let sum = 0;

function drawFirework() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (sum % 100 === 0) {
    // 到达一定时间，释放一个新的烟花
    const x = Math.random() * canvas.width * 0.75 + canvas.width * 0.25;
    const y = Math.random() * 100;
    const fire = new Fireworks(x, y);
    fireworksArray.push(fire);
  }

  if (fireworksArray.length > 3) {
    const fire = fireworksArray.shift();
    bombArray.push(fire);
  }
  if (bombArray.length > 3) {
    bombArray.shift();
  }

  // 重绘所有烟花
  fireworksArray.forEach((fire, i) => {
    fire.draw();
    fire.y += 2;
    fire.opacity -= 0.01;
  });

  bombArray.forEach((fire, i) => {
    fire.bomb();
  });
  sum++;
  requestAnimationFrame(drawFirework);
}

drawFirework();
