/**
 * ShapeModel
 * @type {Map<PageId, Map<ComponentId,Shape>>}
 */
const Model = new Map();

/**
 * 所有页面的Shape模型
 */
export default {
  /**
   * Shape
   * @param {Shape} - shape
   */
  add(shape) {
    const pageId = shape.getPageId();
    const componentId = shape.getComponentId();
    let ShapeMap = Model.get(pageId);
    if (!ShapeMap) {
      ShapeMap = new Map();
      Model.set(pageId, ShapeMap);
    }

    ShapeMap.set(componentId, shape);
  },
  /**
   * removeShapeByPage
   * @param {Shape} - shape
   */
  removeShapeByPage(shape) {
    const pageId = shape.getPageId();
    const componentId = shape.getComponentId();
    const ShapeMap = Model.get(pageId);
    if (ShapeMap) {
      ShapeMap.delete(componentId);
    }
  },
  /**
   * removePage
   * @param {String} - pageId
   */
  removePage(pageId) {
    Model.delete(pageId);
  },
  /**
   * getShapesByPage
   * @param {String} - pageId
   * @return {Array}
   */
  getShapesByPage(pageId) {
    const ShapeMap = Model.get(pageId);
    return ShapeMap ? Array.from(ShapeMap.values()) : [];
  },
  /**
   * getShape
   * @param {String} - pageId
   * @param {String} - componentId
   * @return {Shape}
   */
  getShape({ pageId, componentId }) {
    let Shape;
    const ShapeMap = Model.get(pageId);
    if (ShapeMap) {
      Shape = ShapeMap.get(componentId);
    }
    return Shape;
  },
};
