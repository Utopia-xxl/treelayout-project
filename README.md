# https://juejin.cn/post/6956501799327137828#heading-51

# Overview

本项目主要内容包括treelayout布局算法和渲染两部分，treelayout算法不依赖任何第三方库，根据不同的参数计算节点的位置。render部分底层依赖d3，基于SVG渲染元素，支持节点的拖拽和缩放。

TreeLayout

- 并且支持不同的布局方向：从上到下，从左到右，从右到左，从下到上。
- 支持BoundingBox，能够为节点之间指定间距
- 设置所有父节点的位置是相对子节点还是相对所有子树
- 节点排序：能支持节点根据节点特定的属性升序或者降序

Render

- 可以指定节点的属性显示
- 设置label的字体大小
- 支持交互 zoom，drag，pan等。
