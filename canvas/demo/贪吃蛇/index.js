const canvas1 = document.createElement("canvas");
const canvas2 = document.createElement("canvas");
let ctx1 = canvas1.getContext("2d");
let ctx2 = canvas2.getContext("2d");
function initCanvas(canvas) {
  canvas.width = 400;
  canvas.height = 400;
  document.body.append(canvas);
}

initCanvas(canvas1);
initCanvas(canvas2);

const cell = 20;
const grid = {};
function initGrid() {
  for (let i = 0; i < canvas1.width / cell; i++) {
    for (let j = 0; j < canvas1.height / cell; j++) {
      grid[`${i * cell}-${j * cell}`] = 0;
    }
  }
}
initGrid();
console.log("grid", grid);
// 绘制棋盘
function drawBoard() {
  ctx1.save();
  ctx1.strokeStyle = "#ccc";
  for (let i = 0; i < canvas1.width / cell; i++) {
    ctx1.beginPath();
    ctx1.moveTo(cell * i, 0);
    ctx1.lineTo(cell * i, canvas1.height);
    ctx1.stroke();

    ctx1.beginPath();
    ctx1.moveTo(0, cell * i);
    ctx1.lineTo(canvas1.width, cell * i);
    ctx1.stroke();
  }
  ctx1.restore();
}

drawBoard();

class Rect {
  constructor(x, y, type, color = "#fac") {
    this.x = x;
    this.y = y;
    this.type = type;
    this.oldX = x;
    this.oldY = y;
    this.color = color;
    this.w = cell;
    this.h = cell;
  }
  draw() {
    // 修改格子的状态
    grid[`${this.oldX}-${this.oldY}`] = 0;
    grid[`${this.x}-${this.y}`] = this.type;

    ctx2.clearRect(this.oldX, this.oldY, this.w, this.h);
    this.oldX = this.x;
    this.oldY = this.y;
    ctx2.save();
    ctx2.beginPath();
    ctx2.fillStyle = this.color;
    ctx2.fillRect(this.x, this.y, this.w, this.h);
    ctx2.restore();
  }
}

class Snake {
  constructor(x, y, dir = "ArrowRight") {
    this.x = x * cell;
    this.y = y * cell;
    this.dir = dir;
    this.head = new Rect(this.x, this.y, 1, "red");
    this.body = [];
    this.score = 0;
  }
  draw() {
    this.head.draw();
    // this.body.forEach((rect, i) => {
    //   rect.draw();
    // });
    if (this.body.length > 0) {
      this.body[0].draw();
    }
  }
  move() {
    console.log(this);
    switch (this.dir) {
      case "ArrowLeft":
        this.head.x -= cell;
        break;
      case "ArrowRight":
        this.head.x += cell;
        break;
      case "ArrowUp":
        this.head.y -= cell;
        break;
      case "ArrowDown":
        this.head.y += cell;
        break;
      default:
        break;
    }

    // 是否结束游戏
    if (this.isOver) {
      alert("游戏结束");
      return;
    }

    if (this.isEat) {
      this.score += 10;
      const rect = new Rect(this.head.oldX, this.head.oldY, 1);
      this.body.unshift(rect);
      randomFood();
    } else {
      if (this.body.length > 0) {
        const last = this.body.pop();
        last.x = this.head.oldX;
        last.y = this.head.oldY;
        this.body.unshift(last);
      }
    }

    this.draw();
    // setTimeout(this.move.bind(this), 200 - Math.floor(this.score / 10));
    setTimeout(this.move.bind(this), 200 - this.score);
  }
  get isOver() {
    return (
      this.head.x < 0 ||
      this.head.y < 0 ||
      this.head.x >= canvas2.width ||
      this.head.y >= canvas2.height ||
      grid[`${this.head.x}-${this.head.y}`] === 1
    );
  }
  get isEat() {
    return this.head.x === food.x && this.head.y === food.y;
  }
}

// 随机生成食物
let food;
function randomFood() {
  const x = Math.floor((Math.random() * canvas1.width) / cell) * cell;
  const y = Math.floor((Math.random() * canvas1.height) / cell) * cell;
  for (;;) {
    if (grid[`${x}-${y}`] === 0) {
      food = new Rect(x, y, 2, "#00f");
      food.draw();
      break;
    }
  }
}

canvas2.onclick = function () {
  // 清空上一次的效果
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  randomFood();
  initGrid();

  const snake = new Snake(10, 10);
  snake.draw();
  snake.move();

  document.onkeydown = function (e) {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)) {
      // 方向改变失效
      if (
        (snake.dir === "ArrowLeft" && e.code === "ArrowRight") ||
        (snake.dir === "ArrowUp" && e.code === "ArrowDown") ||
        (snake.dir === "ArrowRight" && e.code === "ArrowLeft") ||
        (snake.dir === "ArrowDown" && e.code === "ArrowUp") ||
        snake.dir === e.code
      ) {
        return;
      }
      snake.dir = e.code;
    }
  };
};
