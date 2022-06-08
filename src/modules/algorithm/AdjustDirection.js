function AdjustDirection() {
  /// <summary>
  /// AdjustDirection Object Constructor
  /// If the layout direction is lr or rl then need to swap the width and height before layout
  /// And swap x and y, restore the original width and height after layout
  /// if the layout direction is bt or rl need to reverse Y after layout
  /// </summary>

}

AdjustDirection.prototype.adjust = function (g, direction) {
  /// <summary>
  /// Call this method before layout
  /// If the layout direction is lr or rl then need to swap the width and height before layout
  /// </summary>
  /// <param name="g" type="graphlib">
  /// Contains graph all node data and opts
  /// </param>

  if (direction === "LeftToRight" || direction === "RightToLeft") {
    swapWidthHeight(g);
  }
}

AdjustDirection.prototype.undo = function (g, direction) {
  /// <summary>
  /// Call this method after layout
  /// swap x and y, restore the original width and height
  /// if the layout direction is bt or rl need to reverse Y
  /// </summary>
  /// <param name="g" type="graphlib">
  /// Contains graph all node data and opts
  /// </param>
  if (direction === "BottomToTop" || direction === "RightToLeft") {
    reverseY(g);
  }

  if (direction === "LeftToRight" || direction === "RightToLeft") {
    swapXY(g);
    swapWidthHeight(g);
  }

  if (direction === "LeftToRight") {
    reverseY(g);
  }
}

function swapWidthHeight(root) {
  // _.forEach(g.nodes(), function(v) { swapWidthHeightOne(g.node(v)); });
  const dfs = (node) => {
    swapWidthHeightOne(node.data);
    if (node.children) {
      for (let v of node.children) {
        dfs(v);
      }
    }
  }
  dfs(root);
  // _.forEach(g.edges(), function(e) { swapWidthHeightOne(g.edge(e)); });
}

function swapWidthHeightOne(attrs) {
  const w = attrs.width;
  attrs.width = attrs.height;
  attrs.height = w;
}

function reverseY(root) {
  // _.forEach(g.nodes(), function(v) { reverseYOne(g.node(v)); });
  const dfs = (node) => {
    reverseYOne(node);
    if (node.children) {
      for (let v of node.children) {
        dfs(v);
      }
    }
  }
  dfs(root);
  // _.forEach(g.edges(), function(e) {
  //   var edge = g.edge(e);
  //   _.forEach(edge.points, reverseYOne);
  //   if (_.has(edge, "y")) {
  //     reverseYOne(edge);
  //   }
  // });
}

function reverseYOne(attrs) {
  // The center of the node is the top left corner so the reverse needs to add height
  attrs.y = -(attrs.y + attrs.data.height);
}

function swapXY(root) {
  // _.forEach(g.nodes(), function(v) { swapXYOne(g.node(v)); });
  const dfs = (node) => {
    swapXYOne(node);
    if (node.children) {
      for (let v of node.children) {
        dfs(v);
      }
    }
  }
  dfs(root);
  // _.forEach(g.edges(), function(e) {
  //   var edge = g.edge(e);
  //   _.forEach(edge.points, swapXYOne);
  //   if (_.has(edge, "x")) {
  //     swapXYOne(edge);
  //   }
  // });
}

function swapXYOne(attrs) {
  const x = attrs.x;
  attrs.x = attrs.y;
  attrs.y = x;
}

export default AdjustDirection