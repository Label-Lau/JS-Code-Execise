draw({
  id: "#svg",
  color: "#abf",
  titleColor: "#f00",
  yAxis: false,
  title: "前端视频周访问量（天）",
});

const data = [
  { text: "周一", value: 200 },
  { text: "周二", value: 450 },
  { text: "周三", value: 60 },
  { text: "周四", value: 300 },
  { text: "周五", value: 250 },
  { text: "周六", value: 180 },
  { text: "周日", value: 360 },
];

/**
 * 计算上限值
 * @param {number} maxValue - 需要计算上限的数值
 * @returns {number} 计算后的上限值
 *
 * @description
 * 本函数用于计算给定数值的上限。例如，如果给定数值为250，则其位数（len）为3，
 * 单位（unit）为100。由于250不是100的倍数，所以需要计算出下一个100的倍数，
 * 即300，作为上限值返回。
 *
 * 如果maxValue是单位的倍数，如200，则上限值就是maxValue本身。
 *
 * @example
 * // 返回300
 * calcUpLimit(250);
 *
 * @example
 * // 返回200
 * calcUpLimit(200);
 */
function calcUpLimit(maxValue) {
  const len = (maxValue + "").length;
  const unit = Math.pow(10, len - 1);
  return maxValue % unit === 0
    ? maxValue
    : (parseInt(maxValue / unit) + 1) * unit;
}

const maxValue = data
  .map((d) => d.value)
  .reduce((prev, cur) => Math.max(prev, cur), 0);
const upLimit = calcUpLimit(maxValue);
const ratio = 200 / upLimit;

const NS = "http://www.w3.org/2000/svg";
const svg = document.querySelector("#svg");

// 绘制左侧数值
const count = 5;
const yDataSpace = parseInt(upLimit / count);
const ySpace = 200 / count;

let g = document.createElementNS(NS, "g");
g.classList.add("y-text");
svg.appendChild(g);

for (let i = 0; i <= count; i++) {
  const text = document.createElementNS(NS, "text");
  text.innerHTML = i * yDataSpace;
  text.setAttribute("x", 20);
  text.setAttribute("y", 225 + 3 - i * ySpace);
  g.appendChild(text);
}

// 绘制底部的线
const xSpace = 200 / data.length;
g = document.createElementNS(NS, "g");
g.classList.add("x-line");
svg.appendChild(g);

let d = "";
for (let i = 0; i <= data.length; i++) {
  d += `M${25 + i * xSpace} 225V230`;
}
const path = document.createElementNS(NS, "path");
path.setAttribute("d", d);
g.appendChild(path);

// 绘制底部文字
g = document.createElementNS(NS, "g");
g.classList.add("x-text");
svg.appendChild(g);

data.forEach((item, i) => {
  const text = document.createElementNS(NS, "text");
  text.innerHTML = item.text;
  text.setAttribute("x", 25 + i * xSpace + xSpace / 2);
  text.setAttribute("y", 235);
  g.appendChild(text);
});

// 绘制线
let points = "";
data.forEach((item, i) => {
  points += `${25 + i * xSpace + xSpace / 2} ${225 - item.value * ratio}`;
  if (i < data.length - 1) {
    points += ",";
  }
});
const polyline = document.createElementNS(NS, "polyline");
polyline.classList.add("data-line");
polyline.setAttribute("points", points);
svg.appendChild(polyline);

// 绘制坐标点
g = document.createElementNS(NS, "g");
g.classList.add("data-circle");
svg.appendChild(g);
data.forEach((item, i) => {
  const circle = document.createElementNS(NS, "circle");
  circle.setAttribute("cx", 25 + i * xSpace + xSpace / 2);
  circle.setAttribute("cy", 225 - item.value * ratio);
  circle.setAttribute("value", item.value);
  g.appendChild(circle);
});

svg.onmouseover = (e) => {
  if (e.target.tagName === "circle") {
    console.log(e.target.getAttribute("cx"), e.target.getAttribute("cy"));
    const left = e.clientX + 5 + "px";
    const top = e.clientY + 5 + "px";
    const panel = document.querySelector("#data-panel");
    panel.style.left = left;
    panel.style.top = top;
    panel.style.display = "block";
    panel.innerHTML = e.target.getAttribute("value");
    e.target.onmouseout = () => {
      panel.style.display = "none";
      e.target.onmouseout = null;
    };
  }
};
