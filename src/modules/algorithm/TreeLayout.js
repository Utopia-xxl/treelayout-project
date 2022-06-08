import LayoutOperator from './LayoutOperator'

class TreeLayout {
    constructor() {
        this.layoutSessionData = {};
        this.init();
    }

    init() {
        this.layoutSessionData.n2n_x = 10;
        this.layoutSessionData.n2n_y = 20;
        this.layoutSessionData.rootNodePlacement = "Median";
        this.layoutSessionData.sortingStrategy = "Default";
        this.layoutSessionData.layoutDirection = "TopToBottom";
        this.layoutSessionData.sortingAttrName = "id";
    }


    doLayout(rootNode) {
        this.LayoutOperator = new LayoutOperator(this.layoutSessionData);
        this.LayoutOperator.layout(rootNode);
    }

    //-------------------------------------------------------
    setLayoutDirection(layoutDirection) {
        this.layoutSessionData.layoutDirection = layoutDirection;
    }

    //-------------------------------------------------------
    setSortingStrategy(strategy) {
        this.layoutSessionData.sortingStrategy = strategy;
    }

    setSortingAttrName(Attrname) {
        this.layoutSessionData.sortingAttrName = Attrname;
    }

    //-------------------------------------------------------
    setRootNodeAlignment(option) {
        this.layoutSessionData.rootNodePlacement = option;
    }

    //-------------------------------------------------------
    setNodeDistX(value) {
        this.layoutSessionData.n2n_x = value;
    }

    setNodeDistY(value) {
        this.layoutSessionData.n2n_y = value;
    }

}
export default TreeLayout