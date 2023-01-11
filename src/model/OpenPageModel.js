/**
 * OpenPageModel
 * @type {Map<PageId, CanvasTabPanel>}
 */
const Model = new Map();

/**
 * 所有开打的页面模型
 */
export default {
  /**
   * add
   * @param page
   */
  add(page) {
    const pageId = page.getPageId();
    Model.set(pageId, page);
  },
  /**
   * remove
   * @param pageId
   */
  remove(pageId) {
    Model.delete(pageId);
  },
  /**
   * get
   * @return {CanvasTabPanel}
   * @param pageId
   */
  get(pageId) {
    return Model.get(pageId);
  },
};
