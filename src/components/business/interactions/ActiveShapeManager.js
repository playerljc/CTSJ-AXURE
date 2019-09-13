const pageActiveShapeMap = new Map();

/**
 * ActiveShapeManager - 对页面中激活Shape进行管理
 * @class ActiveShapeManager
 * @classdesc ActiveShapeManager
 */
const ActiveShapeManager = {

  /**
   * setShape
   * @param {String} - pageId
   * @param {Shape} - shape
   */
  setShape({ pageId, shape }) {
    let shapes = this.getShape(pageId);
    if (!shapes) {
      shapes = [];
      pageActiveShapeMap.set(pageId, shapes);
    }

    shapes.push(shape);
  },

  /**
   * getShape
   * @param {String} - pageId
   * @return {Array}
   */
  getShape(pageId) {
    return pageActiveShapeMap.get(pageId);
  },

  /**
   * removeShape
   * @param {String} pageId
   */
  removeShape(pageId) {
    pageActiveShapeMap.delete(pageId);
  },
};

export default ActiveShapeManager;
