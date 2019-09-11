/**
 * ActiveShapeKeyBoardBind
 * @class ActiveShapeKeyBoardBind
 * @classdesc ActiveShapeKeyBoardBind
 */
class ActiveShapeKeyBoardBind {
  constructor({ activeShapeManager, rangeSelectManager }) {
    this.activeShapeManager = activeShapeManager;
    this.rangeSelectManager = rangeSelectManager;
  }

  /**
   * bindKeyBoard
   * @param {String} - pageId
   */
  bindKeyBoard(pageId) {
    const activeShapes = this.activeShapeManager.getShape(pageId);
    if (activeShapes && activeShapes.length !== 0) {
      activeShapes.forEach((Shape) => {
        Shape.bindKeyBoard();
      });
    }

    const rangeSelect = this.rangeSelectManager.get(pageId);
    if (rangeSelect) {
      rangeSelect.bindKeyBoard();
    }
  }

  /**
   * unBindKeyBoard
   * @param {String} - pageId
   */
  unBindKeyBoard(pageId) {
    const activeShapes = this.activeShapeManager.getShape(pageId);
    if (activeShapes && activeShapes.length !== 0) {
      activeShapes.forEach((Shape) => {
        Shape.unBindKeyBoard();
      });
    }

    const rangeSelect = this.rangeSelectManager.get(pageId);
    if (rangeSelect) {
      rangeSelect.unBindKeyBoard();
    }
  }
}

export default ActiveShapeKeyBoardBind;
