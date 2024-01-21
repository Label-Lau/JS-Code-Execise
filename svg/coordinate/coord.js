function draw(option) {
  if (typeof option === "string") {
    option = { id: option };
  }

  const config = {
    color: "#ccc",
    xAxis: true,
    yAxis: true,
    ...option,
  };
  const svg = document.querySelector(config.id);
  const NS = "http://www.w3.org/2000/svg";
  svg.setAttribute("viewBox", "0 0 250 250");

  const g = document.createElementNS(NS, "g");
  const title = document.createElementNS(NS, "text");
  title.innerHTML = config.title;
  title.setAttribute("x", 10);
  title.setAttribute("y", 15);
  title.setAttribute("font-size", 8);
  title.setAttribute("fill", config.titleColor);
  g.appendChild(title);

  const path = document.createElementNS(NS, "path");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "#ccc");
  path.setAttribute("stroke-width", "0.8");
  let d = "";
  // 绘制坐标系纵横线
  for (let i = 0; i < 11; i++) {
    if (config.xAxis) d += `M25 ${25 + i * 20}H225`;
    if (config.yAxis) d += `M${25 + i * 20} 25V225`;
  }
  path.setAttribute("d", d);
  g.appendChild(path);
  if (svg?.children?.length > 0) {
    svg.insertBefore(g, children[0]);
  } else {
    svg.appendChild(g);
  }
}
