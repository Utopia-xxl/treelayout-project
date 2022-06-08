class BoundingBox {
    /**
     * @param {number} gap - the gap between sibling nodes
     * @param {number} bottomPadding - the height reserved for connection drawing
     */
    constructor(gap, bottomPadding) {
        this.gap = gap
        this.bottomPadding = bottomPadding
    }

    addBoundingBox(width, height) {
        return { width: width + this.gap, height: height + this.bottomPadding }
    }

    /**
     * Return the coordinate without the bounding box for a node
     */
    removeBoundingBox(x, y) {
        return { x: x + this.gap/2 , y }
    }
}

export default BoundingBox;