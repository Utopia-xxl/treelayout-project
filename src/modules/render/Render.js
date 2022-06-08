import * as d3 from 'd3'
import drag from './utils/drag.js'
import zoom from './utils/zoom.js'


class Render{
    constructor(divId,width,height){
        this.svg = d3.select('#'+divId).append("svg")
        .attr("class", "svg_container")
        .attr("height", height)
        .attr("width", width);
        this.chart = this.svg.append("g").attr("transform", `translate(60,60)`);
        this.labelFontSize = 10;
        this.labelAttr = "id";
    }

    drawLinks(links) {
        this.chart.selectAll("line")
            .data(links)
            .join("line").attr("class", "link")
            .attr("x1", d=>d.source.x+d.source.data.width/2.0)
            .attr("y1", d=>d.source.y+d.source.data.height/2.0)
            .attr("x2", d=>d.target.x+d.target.data.width/2.0)
            .attr("y2", d=>d.target.y+d.target.data.height/2.0)
            .attr("sId", d=>d.source.data.id)
            .attr("tId", d=>d.target.data.id)
            .attr('stroke','black')
            .attr('stroke-width',1)
    }


    drawNodeAndLabel(nodes){
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(d3.extent(nodes, n => n.depth));
        const fontSize = this.labelFontSize;
        const label_attr_name = this.labelAttr;
        this.chart.selectAll("g.node")
            .data(nodes)
            .join(enter => enter.append("g").each(function(){
                d3.select(this).append("rect");
                d3.select(this).append("text");
            }))
            .attr("class", "node")
            .attr("transform", d => `translate(${[d.x, d.y]})`)
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .each(function(){
                const node = d3.select(this);
                node.select("rect")
                    .attr("width", d => d.data.width)
                    .attr("height", d => d.data.height)
                    .attr("id", d => d.data.id)
                    .style("fill", d => colorScale(d.depth));
                node.select("text").text(d => d.data[label_attr_name]) 
                .style("fill", 'black')
                .attr("transform", d=>`translate(${[d.data.width/2.0,d.data.height/2.0]})`)
                .style("text-anchor", "middle")
                .style("font-size", fontSize);
            })
    }

    allowZoom(){
        d3.select(".svg_container").call(zoom);
    }

    allowDrag(){
        d3.selectAll(".node").call(drag);
    }

    setLabelFontSize(fontSize){
        this.labelFontSize = fontSize;
    }

    setLabelAttr(attr){
        this.labelAttr = attr;
    }
}


export default Render;