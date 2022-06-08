import * as d3 from 'd3'
let width = 800, height = 600
const zoom = d3.zoom()
  .extent([[0, 0], [width, height]])
  .scaleExtent([0.1, 8])
  .filter(function (event) {
    // isWheelEvent为是否滚轮事件
    let isWheelEvent = event instanceof WheelEvent;
    // 返回是否ctrl与滚轮同时触发
    return !isWheelEvent || (isWheelEvent && event.ctrlKey);
  })
  .on("zoom", zoomed)



function zoomed({ transform }) {
  d3.select("g").attr("transform", transform);
}

export function zoomIn() {
  d3.select(".svg_container")
    .transition()
    .call(zoom.scaleBy, 2);
}

export function zoomOut() {
  d3.select('svg')
    .transition()
    .call(zoom.scaleBy, 0.5);
}

export function resetZoom() {
  d3.select('svg')
    .transition()
    .call(zoom.scaleTo, 1);
}

export function center() {
  // const [x, y] = [60,60];
  let box=null;
  d3.selectAll(".node").each(function (d) {
    const x = d.x,y=d.y,width = d.data.width,height = d.data.height;
    if (box === null) {
      box = { left: x, right: x + width, top: y, bottom: y + height }
    }
    box.left = Math.min(box.left, x)
    box.right = Math.max(box.right, x + width)
    box.top = Math.min(box.top, y)
    box.bottom = Math.max(box.bottom, y + height)
  })
  const w = box.right-box.left, h = box.bottom-box.top;
  const s = Math.min(width / w, height / h)
  d3.select('svg').transition().duration(1000).call(
    zoom.transform,
    d3.zoomIdentity.translate((s*w-width)/2.0, - (s*h-height)/2.0)
    .scale(s)
  );
}

export function panLeft() {
  d3.select('svg')
    .transition()
    .call(zoom.translateBy, -50, 0);
}

export function panRight() {
  d3.select('svg')
    .transition()
    .call(zoom.translateBy, 50, 0);
}

export default zoom
