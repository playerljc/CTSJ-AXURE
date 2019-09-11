/**
 * ActiveShapeManager - 对页面中激活Shape进行管理
 * @class ActiveShapeManager
 * @classdesc ActiveShapeManager
 */
class ActiveShapeManager {
  constructor() {
    this.pageActiveShapeMap = new Map();
  }

  /**
   * setShape
   * @param {String} - pageId
   * @param {Shape} - shape
   */
  setShape({ pageId, shape }) {
    let shapes = this.getShape(pageId);
    if (!shapes) {
      shapes = [];
      this.pageActiveShapeMap.set(pageId, shapes);
    }

    shapes.push(shape);
  }

  /**
   * getShape
   * @param {String} - pageId
   * @return {Array}
   */
  getShape(pageId) {
    return this.pageActiveShapeMap.get(pageId);
  }

  /**
   * removeShape
   * @param {String} pageId
   */
  removeShape(pageId) {
    this.pageActiveShapeMap.delete(pageId);
  }
}

export default ActiveShapeManager;