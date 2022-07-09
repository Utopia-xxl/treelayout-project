import {TreeLayout, Render} from "../out/treeLayout.js";
// import {TreeLayout,Render} from "../src/main.js";
import * as d3 from 'd3'
import {zoomIn, zoomOut, resetZoom, panLeft, panRight, center} from "../out/treeLayout"

const treeRowData = {
    id: 0,
    width: 40,
    height: 40,
    priority: 0,
    name: "n0",
    children: [
        {
            id: 1,
            width: 40,
            height: 40,
            priority: 5,
            name: "n1",
            children: [{ id: 6, width: 400, height: 40, name: "n6" }]
        },
        { id: 2, width: 40, height: 40, priority: 4, name: "n2" },
        { id: 3, width: 40, height: 40, priority: 3, name: "n3" },
        { id: 4, width: 40, height: 40, priority: 2, name: "n4" },
        { id: 5, width: 40, height: 80, priority: 1, name: "n5", }
    ]
}
function getHtmlParams(){
    let node_sort = document.getElementById('sort_node').value;
    let sort_attr = document.getElementById('sort_attr').value;
    let layout_direction = document.getElementById('layout_direction').value;
    let root_node_position = document.getElementById('root_node_position').value;
    let allow_drag = document.getElementById('allow_drag').checked;
    let allow_zoom = document.getElementById('allow_zoom').checked;
    let n2n_x = +document.getElementById('n2n_x').value;
    let n2n_y = +document.getElementById('n2n_y').value;
    let show_lines = document.getElementById('show_lines').checked;
    let label_attr_name = document.getElementById('label_attr_name').value;
    let label_size = +document.getElementById('label_size').value;
    return {
        node_sort,
        allow_drag,
        allow_zoom,
        n2n_x,
        n2n_y,
        show_lines,
        layout_direction,
        root_node_position,
        sort_attr,
        label_attr_name,
        label_size
    };
}

function applyLayout(){
    console.log(treeRowData);
    const root = d3.hierarchy(treeRowData);
    const layoutSetting = getHtmlParams();
    layouter.setNodeDistX(layoutSetting.n2n_x);
    layouter.setNodeDistY(layoutSetting.n2n_y);
    layouter.setLayoutDirection(layoutSetting.layout_direction);
    layouter.setRootNodeAlignment(layoutSetting.root_node_position);
    layouter.setSortingStrategy(layoutSetting.node_sort);
    layouter.setSortingAttrName(layoutSetting.sort_attr);
    layouter.doLayout(root);
    const nodes = root.descendants();
    console.log(nodes)
    const links = root.links();

    renderEle.drawLinks(links);
    renderEle.setLabelAttr(layoutSetting.label_attr_name);
    renderEle.setLabelFontSize(layoutSetting.label_size);
    renderEle.drawNodeAndLabel(nodes);
    renderEle.allowDrag();
    renderEle.allowZoom();
}

const renderEle = new Render("svg",800,600);
let layouter = new TreeLayout();
applyLayout();
d3.select('#applyLayout').on('click', applyLayout);
d3.select("#reset").on('click', () => {location.reload();});
d3.select("#zoomIn").on('click', zoomIn);
d3.select("#zoomOut").on('click', zoomOut);
d3.select("#resetZoom").on('click', resetZoom);
d3.select("#panLeft").on('click', panLeft);
d3.select("#panRight").on('click', panRight);
d3.select("#center").on('click', center);
