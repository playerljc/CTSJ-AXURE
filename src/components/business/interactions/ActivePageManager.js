const pageActiveMap = new Map();

/**
 * ActivePageManager - 对页面中激活Page进行管理
 * @type {{getPage(*=): CanvasTabPanel, removePage(String): void, setPage(*=, *=): void}}
 */
const ActivePageManager = {
  /**
   * setPage
   * @param {String} - pageId
   * @param {CanvasTabPanel} - page
   */
  setPage(pageId, page) {
    pageActiveMap.set(pageId, page);
  },

  /**
   * getPage
   * @param {String} - pageId
   * @return {CanvasTabPanel}
   */
  getPage(pageId) {
    return pageActiveMap.get(pageId);
  },

  /**
   * removePage
   * @param {String} pageId
   */
  removePage(pageId) {
    pageActiveMap.delete(pageId);
  },
};

export default ActivePageManager;
