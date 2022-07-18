# Overview

Design an algorithm prototype based on the main ideas of A.J. van der Ploeg's Drawing Non-layered Tidy Trees in Linear Time paper

The main content of this project includes treelayout layout algorithm and rendering. The treelayout algorithm does not rely on any third-party library, and calculates the position of nodes according to different parameters. The render part relies on d3 at the bottom and renders elements based on SVG, which supports dragging and scaling of nodes.

You can go (here)[https://juejin.cn/post/7119033896003436580] for a detailed introduction to the algorithm

TreeLayout

- Different layout directions are supported: top to bottom, left to right, right to left, bottom to top.
- Support for BoundingBox, the ability to specify spacing between nodes
- Set the position of all parent nodes relative to child nodes or relative to all subtrees
- Node sorting: can support nodes in ascending or descending order based on node-specific attributes

Render

- Specify the attribute display of the node
- Set the font size of the label
- Support interactive zoom, drag, pan, etc.
