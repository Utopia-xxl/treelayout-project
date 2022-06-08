import { layout } from './algorithm'
import BoundingBox from './BoundingBox'
import Tree from './TreeNode'
import AdjustDirection from './AdjustDirection';


class TreeLayout {
  constructor(layoutSessionData) {
    this.layoutSessionData = layoutSessionData;
    this.bb = new BoundingBox(layoutSessionData.n2n_x, layoutSessionData.n2n_y);
    this.adjustObj = new AdjustDirection();
  }

  /**
   * Layout treeData.
   * Return modified treeData and the bounding box encompassing all the nodes.
   * 
   * See getSize() for more explanation.
   */
  layout(treeData) {
    const tree = this.preLayoutProcess(treeData);
    layout(tree, this.layoutSessionData.rootNodePlacement)
    this. postLayoutProcess(tree,treeData);
  }

  preLayoutProcess(treeData) {
    // sort children nodes by height
    if(this.layoutSessionData.sortingStrategy !== "Default"){
      this.sortChildren(treeData);
    }

    // adjust layout direction
    this.adjustObj.adjust(treeData, this.layoutSessionData.layoutDirection);

    const tree = this.__convert(treeData)
    return tree;
  }

  postLayoutProcess(tree,treeData) {
    this.__assignCoordinates(tree, treeData);
    this.adjustObj.undo(treeData, this.layoutSessionData.layoutDirection);
    const box = this.getSize(treeData);
    // Move all nodes relatively, 
    // make sure that the coordinates of all nodes are greater than 0
    this.moveAllNodes(treeData, box.left, box.top);
  }

  /**
   * Returns Tree to layout, with bounding boxes added to each node.
   */
  __convert(treeData, y = 0) {
    if (treeData === null) return null

    const { width, height } = this.bb.addBoundingBox(
      treeData.data.width,
      treeData.data.height
    )
    let children = []
    if (treeData.children && treeData.children.length) {
      for (let i = 0; i < treeData.children.length; i++) {
        children[i] = this.__convert(treeData.children[i], y + height)
      }
    }

    return new Tree(width, height, y, children)
  }

  /**
   * Assign layout tree x, y coordinates back to treeData,
   * with bounding boxes removed.
   */
  __assignCoordinates(tree, treeData, box) {
    const { x, y } = this.bb.removeBoundingBox(tree.x, tree.y)
    treeData.x = x;
    treeData.y = y;
    for (let i = 0; i < tree.c.length; i++) {
      this.__assignCoordinates(tree.c[i], treeData.children[i],box)
    }
    return treeData;
  }

  /**
   * Return the bounding box that encompasses all the nodes.
   * The result has a structure of
   * { left: number, right: number, top: number, bottom: nubmer}.
   * This is not the same bounding box concept as the `BoundingBox` class
   * used to construct `Layout` class.
   */
  getSize(treeData, box = null) {
    const { x, y} = treeData;
    const { width, height } = treeData.data;
    if (box === null) {
      box = { left: x, right: x + width, top: y, bottom: y + height }
    }
    box.left = Math.min(box.left, x)
    box.right = Math.max(box.right, x + width)
    box.top = Math.min(box.top, y)
    box.bottom = Math.max(box.bottom, y + height)

    if (treeData.children) {
      for (const child of treeData.children) {
        this.getSize(child, box)
      }
    }

    return box
  }

  sortChildren(treeData) {
    const attr = this.layoutSessionData.sortingAttrName;
    const sortingStrategy = this.layoutSessionData.sortingStrategy;
    if (treeData.children) {
      if(sortingStrategy === "ascending"){
        treeData.children.sort((a, b) => a.data[attr] - b.data[attr]);
      }else{
        treeData.children.sort((a, b) => b.data[attr] - a.data[attr]);
      }
      for (const child of treeData.children) {
        this.sortChildren(child);
      }
    }
  }

  moveAllNodes(treeData, left, top) {
    treeData.x -= left;
    treeData.y -= top;
    if (treeData.children) {
      for (const child of treeData.children) {
        this.moveAllNodes(child, left, top);
      }
    }
  }
}

export default TreeLayout;

