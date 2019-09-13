import activeShapeManager from './ActiveShapeManager';
import rangeSelectManager from './RangeSelectManager';

/**
 * ActiveShapeKeyBoardBind
 * @class ActiveShapeKeyBoardBind
 * @classdesc ActiveShapeKeyBoardBind
 */
const ActiveShapeKeyBoardBind = {
  /**
   * bindKeyBoard
   * @param {String} - pageId
   */
  bindKeyBoard(pageId) {
    const activeShapes = activeShapeManager.getShape(pageId);
    if (activeShapes && activeShapes.length !== 0) {
      activeShapes.forEach((Shape) => {
        Shape.bindKeyBoard();
      });
    }

    const rangeSelect = rangeSelectManager.get(pageId);
    if (rangeSelect) {
      rangeSelect.bindKeyBoard();
    }
  },

  /**
   * unBindKeyBoard
   * @param {String} - pageId
   */
  unBindKeyBoard(pageId) {
    const activeShapes = activeShapeManager.getShape(pageId);
    if (activeShapes && activeShapes.length !== 0) {
      activeShapes.forEach((Shape) => {
        Shape.unBindKeyBoard();
      });
    }

    const rangeSelect = rangeSelectManager.get(pageId);
    if (rangeSelect) {
      rangeSelect.unBindKeyBoard();
    }
  },
};

export default ActiveShapeKeyBoardBind;

