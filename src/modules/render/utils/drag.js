import * as d3 from 'd3'

const drag = d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);


      function dragstarted() {
        d3.select(this).raise().attr("stroke", "black").attr("cursor", "grabbing");
    }

    function dragged(event, d) {
        d3.select(this).attr("x", d.x = event.x).attr("y", d.y = event.y)
        .attr("transform",`translate(${event.x},${event.y})`);
        updateLine(d);
    }

    function dragended() {
        d3.select(this).attr("stroke", null).attr("cursor", "grab");
    }
    function updateLine(node){
        d3.selectAll("line").filter(d=>d.source.data.id===node.data.id).attr("x1", node.x+node.data.width/2.0).attr("y1", node.y+node.data.height/2.0)
        d3.selectAll("line").filter(d=>d.target.data.id===node.data.id).attr("x2", node.x+node.data.width/2.0).attr("y2", node.y+node.data.height/2.0)
    }

export default drag;