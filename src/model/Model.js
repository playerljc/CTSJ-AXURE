const Model = new Map();

/**
 * 所有页面的Shape模型
 */
export default {
  add(pageId, Shape) {
    let Shapes = Model.get(pageId);
    if (!Shapes) {
      Shapes = [];
      Model.set(pageId, Shapes);
    }

    Shapes.push(Shape);
  },
  removeShape(pageId, Shape) {
    const Shapes = Model.get(pageId);
    if (Shapes) {
      Shapes.splice(Shapes.indexOf(Shape), 1);
    }
  },
  removePage(pageId) {
    Model.delete(pageId);
  },
  get(pageId) {
    return Model.get(pageId) || [];
  },
};
