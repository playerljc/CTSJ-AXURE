/**
 * ActivePageManager - 对页面中激活Page进行管理
 * @class ActivePageManager
 * @classdesc ActivePageManager
 */
class ActivePageManager {
  constructor() {
    this.pageActiveMap = new Map();
  }

  /**
   * setPage
   * @param {String} - pageId
   * @param {CanvasTabPanel} - page
   */
  setPage(pageId, page) {
    this.pageActiveMap.set(pageId, page);
  }

  /**
   * getPage
   * @param {String} - pageId
   * @return {CanvasTabPanel}
   */
  getPage(pageId) {
    return this.pageActiveMap.get(pageId);
  }

  /**
   * removePage
   * @param {String} pageId
   */
  removePage(pageId) {
    this.pageActiveMap.delete(pageId);
  }
}

export default ActivePageManager;
