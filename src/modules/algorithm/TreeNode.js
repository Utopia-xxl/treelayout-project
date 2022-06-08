class TreeNode {
    constructor(width, height, y, children) {
      this.w = width   // node width
      this.h = height  // node height
      this.y = y
      this.c = children
      this.cs = children.length
  
      this.x = 0
      this.prelim = 0
      this.mod = 0
      this.shift = 0
      this.change = 0
      this.tl = null // Left thread
      this.tr = null // Right thread
      this.el = null // extreme left nodes
      this.er = null // extreme right nodes
      //sum of modifiers at the extreme nodes
      this.msel = 0
      this.mser = 0
      this.dl=null // all children nodes extreme left nodes
      this.dr=null // all children nodes extreme right nodes
    }
}

export default TreeNode;