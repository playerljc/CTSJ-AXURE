import activePageManager from './ActivePageManager';

/**
 * ActivePageMouseWheelBind
 * @class ActivePageMouseWheelBind
 * @classdesc ActivePageMouseWheelBind
 */
const ActivePageMouseWheelBind = {
  /**
   * bindMouseWheel
   * @param {String} - pageId
   */
  bindMouseWheel(pageId) {
    const activePage = activePageManager.getPage(pageId);
    if (activePage) {
      activePage.bindMouseWheel();
    }
  },

  /**
   * unBindMouseWheel
   * @param {String} - pageId
   */
  unBindMouseWheel(pageId) {
    const activePage = activePageManager.getPage(pageId);
    if (activePage) {
      activePage.unBindMouseWheel();
    }
  },
};

export default ActivePageMouseWheelBind;

