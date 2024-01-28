draw({
  id: "#svg",
  yAxis: true,
  xAxis: true,
  title: "前端各课程时长(h)",
});

const data = [
  { text: "HTML5", value: 20 },
  { text: "CSS3", value: 50 },
  { text: "JavaScript", value: 300 },
  { text: "Vue", value: 100 },
  { text: "React", value: 90 },
];

const NS = "http://www.w3.org/2000/svg";
const svg = document.querySelector("#svg");

const sum = data.reduce((prev, item) => prev + item.value, 0);
const originPoint = { x: 100, y: 100 };
const r1 = 80; // 正常绘制弧的半径
const r2 = 82; // 高亮时
const r3 = 85; // 提示线

function randomColorNumber() {
  return parseInt(Math.random() * 255);
}
function randomColor() {
  return `rgb(${randomColorNumber()},${randomColorNumber()},${randomColorNumber()})`;
}

// 计算圆弧的点
function calcPoint(origin, r, deg) {
  return {
    x: origin.x + Math.sin(deg * (Math.PI / 180)) * r,
    y: origin.y - Math.cos(deg * (Math.PI / 180)) * r,
  };
}

function calcDeg(value, sum) {
  return (value / sum) * 360;
}

// 绘制弧形
let startPoint = { x: 100, y: 20 };
let lastDeg = 0;
data.forEach((item, i) => {
  // if (i > 1) return;
  const g = document.createElementNS(NS, "g");
  g.classList.add("part");
  g.setAttribute("text", item.text);
  g.setAttribute("value", item.value);
  svg.appendChild(g);

  const color = randomColor();
  const path = document.createElementNS(NS, "path");
  const curDeg = calcDeg(item.value, sum);
  const endPoint = calcPoint(originPoint, r1, curDeg + lastDeg);
  const flag = curDeg >= 180 ? 1 : 0;

  g.setAttribute("curDeg", curDeg);
  g.setAttribute("lastDeg", lastDeg);

  let d = "";
  d += `M${originPoint.x + 25} ${originPoint.y + 25} `;
  d += `L${startPoint.x + 25} ${startPoint.y + 25} `;
  d += `A${r1} ${r1} 0 ${flag} 1 ${endPoint.x + 25} ${endPoint.y + 25} Z`;
  path.setAttribute("fill", color);
  path.setAttribute("d", d);
  g.appendChild(path);

  // 绘制折线
  const polyPoint = calcPoint(originPoint, r3, curDeg / 2 + lastDeg);
  const polyline = document.createElementNS(NS, "polyline");
  let points = "";
  const unit = polyPoint.x >= originPoint.x ? 5 : -5;
  points += `${25 + originPoint.x} ${25 + originPoint.y} ,`;
  points += `${25 + polyPoint.x} ${25 + polyPoint.y} ,`;
  points += `${25 + polyPoint.x + unit} ${25 + polyPoint.y}`;
  polyline.setAttribute("points", points);
  polyline.setAttribute("stroke", color);
  g.appendChild(polyline);

  // 绘制文字
  const text = document.createElementNS(NS, "text");
  text.innerHTML = item.text;
  text.setAttribute("x", 25 + polyPoint.x + unit * 2);
  text.setAttribute("y", 25 + polyPoint.y + 3);
  if (unit < 0) {
    text.classList.add("left");
  }
  g.appendChild(text);

  startPoint = endPoint;
  lastDeg += curDeg;
});

const panel = document.querySelector("#data-panel");
svg.onmouseover = function (e) {
  if (
    e.target.parentNode.tagName === "g" &&
    e.target.parentNode.classList.contains("part")
  ) {
    // 展示文字
    const text = e.target.parentNode.getAttribute("text");
    const value = e.target.parentNode.getAttribute("value");
    const curDeg = e.target.parentNode.getAttribute("curDeg");
    const lastDeg = e.target.parentNode.getAttribute("lastDeg");
    const path = e.target.parentNode.querySelector("path");
    function show(e) {
      panel.innerHTML = `${text}: ${value}`;
      panel.style.left = e.clientX + 10 + "px";
      panel.style.top = e.clientY + 5 + "px";
      panel.style.display = "block";
    }
    show(e);

    function drawArc(origin, r, curDeg, lastDeg) {
      const startPoint = calcPoint(origin, r, lastDeg);
      const endPoint = calcPoint(
        origin,
        r,
        parseFloat(curDeg) + parseFloat(lastDeg)
        // curDeg + lastDeg
      );
      const flag = curDeg >= 180 ? 1 : 0;
      let d = "";
      d += `M${origin.x + 25} ${origin.y + 25} `;
      d += `L${startPoint.x + 25} ${startPoint.y + 25} `;
      d += `A${r} ${r} 0 ${flag} 1 ${endPoint.x + 25} ${endPoint.y + 25} Z`;
      path.setAttribute("d", d);
    }
    drawArc(originPoint, r3, curDeg, lastDeg);

    e.target.onmousemove = function (e) {
      show(e);
    };

    e.target.onmouseout = function () {
      panel.style.display = "none";
      drawArc(originPoint, r1, curDeg, lastDeg);
      this.onmousemove = null;
      this.onmouseout = null;
    };
  }
};
