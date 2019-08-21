/**
 * PageModel
 * @type {Map<PageId, CanvasTabPanel>}
 */
const Model = new Map();

/**
 * 所有页面的Shape模型
 */
export default {
  /**
   * add
   * @param {CanvasTabPanel} - page
   */
  add(page) {
    const pageId = page.getPageId();
    Model.set(pageId, page);
  },
  /**
   * remove
   * @param {String} - pageId
   */
  remove(pageId) {
    Model.delete(pageId);
  },
  /**
   * get
   * @param {String} - pageId
   * @return {CanvasTabPanel}
   */
  get(pageId) {
    return Model.get(pageId);
  },
};
