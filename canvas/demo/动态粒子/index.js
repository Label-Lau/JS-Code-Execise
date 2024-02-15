const canvas = document.createElement("canvas");
document.body.append(canvas);
canvas.width = window.innerWidth * devicePixelRatio;
canvas.height = window.innerHeight * devicePixelRatio;
const ctx = canvas.getContext("2d");

function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

class Point {
  constructor() {
    this.r = 3;
    this.x = getRandom(0, canvas.width - this.r / 2);
    this.y = getRandom(0, canvas.height - this.r / 2);
    this.xSpeed = getRandom(-50, 50);
    this.ySpeed = getRandom(-50, 50);
    this.lastDrawTime = null;
  }

  draw() {
    if (this.lastDrawTime) {
      const duration = (Date.now() - this.lastDrawTime) / 1000;
      const xDis = this.xSpeed * duration;
      const yDis = this.ySpeed * duration;
      let x = this.x + xDis;
      let y = this.y + yDis;

      if (x > canvas.width - this.r / 2) {
        x = canvas.width - this.r / 2;
        this.xSpeed = -this.xSpeed;
      } else if (x < 0) {
        x = 0;
        this.xSpeed = -this.xSpeed;
      }
      if (y > canvas.height - this.r / 2) {
        y = canvas.height - this.r / 2;
        this.ySpeed = -this.ySpeed;
      } else if (y < 0) {
        y = 0;
        this.ySpeed = -this.ySpeed;
      }
      this.x = x;
      this.y = y;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(200,200,200)";
    ctx.fill();
    this.lastDrawTime = Date.now();
  }
}

class Graph {
  constructor(pointCount = 30, maxDistance = 200) {
    this.points = new Array(pointCount).fill(0).map(() => new Point());
    this.maxDistance = maxDistance;
  }
  draw() {
    requestAnimationFrame(() => {
      this.draw();
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < this.points.length; i++) {
      const p1 = this.points[i];
      p1.draw();
      for (let j = i + 1; j < this.points.length; j++) {
        const p2 = this.points[j];
        const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        if (d > this.maxDistance) {
          continue;
        }
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();
        ctx.strokeStyle = `rgba(200,200,200,${1 - d / this.maxDistance})`;
        ctx.stroke();
      }
    }
  }
}

const g = new Graph();
g.draw();
