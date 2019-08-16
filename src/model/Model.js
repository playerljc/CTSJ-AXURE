const Model = new Map();

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
};
