const data = [
  { text: "一季度", value: 320 },
  { text: "二季度", value: 620 },
  { text: "三季度", value: 500 },
  { text: "四季度", value: 720 },
];

const texts = data.map((item) => item.text);
const values = data.map((item) => item.value);
const maxValue = values.reduce((prev, cur) => Math.max(prev, cur), 0);

const result = draw({
  id: "#svg",
  yAxis: false,
  color: "#abf",
  title: "2020年个季度就业人数",
  xText: ["一季度", "二季度", "三季度", "四季度"],
  yMax: maxValue,
  part: 5,
});

const NS = "http://www.w3.org/2000/svg";
const svg = document.querySelector("#svg");

const g = document.createElementNS(NS, "g");
g.classList.add("pillar");
svg.appendChild(g);
values.forEach((value, i) => {
  const rect1 = document.createElementNS(NS, "rect");
  rect1.setAttribute("x", 25 + i * result.xSpace + result.xSpace / 4);
  rect1.setAttribute("y", 25);
  rect1.setAttribute("width", result.xSpace / 2);
  rect1.setAttribute("height", 200);
  rect1.classList.add("bg");
  g.appendChild(rect1);
  const rect2 = document.createElementNS(NS, "rect");
  rect2.setAttribute("x", 25 + i * result.xSpace + result.xSpace / 4);
  rect2.setAttribute("y", 225 - value * result.ratio);
  rect2.setAttribute("width", result.xSpace / 2);
  rect2.setAttribute("height", value * result.ratio);
  g.appendChild(rect2);
});
